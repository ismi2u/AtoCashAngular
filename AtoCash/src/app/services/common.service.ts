import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as _ from 'lodash';
import { UserRolesService } from './user-roles.service';
import { environment } from 'src/environments/environment';
import cookies from 'js-cookie';
@Injectable({
	providedIn: 'root',
})
export class CommonService {
	currentLanguage = new BehaviorSubject('en');
	inboxType = new BehaviorSubject('cashAdvance');
	loading = new Subject();
	unauthorizedLoading = new Subject();
	onStatusChange = new Subject();
	roles = new BehaviorSubject({
		isClerk: false,
		isAdmin: false,
		isManage: false,
		isFinance: false,
		isUser: false,
		isRoot: false,
	});

	constructor(
		private http: HttpClient,
		private notification: NzNotificationService,
		private translate: TranslateService,
	) {}

	getApi = () => cookies.get('api');
	createNotification = (type: string, message: string): void => {
		this.notification.create(type, 'Notification', message, {
			nzDuration: 3000,
		});
	};

	getPermission = () => {
		if (this.getUser()) {
			let access = {
				isAdmin: false,
				isManage: false,
				isUser: false,
				isRoot: false,
				isFinance: false,
				isClerk: false,
			};
			const userRole = this.getUserRole();

			userRole.map((role) => {
				access = { ...access, ...this.checkAccessRole(role) };
			});
			this.roles.next(access);
		}
	};

	checkAccessRole = (role) => {
		switch (role) {
			case 'Admin':
				return { isAdmin: true };
			case 'Finmgr':
				return { isFinance: true };
			case 'Manager':
				return { isManage: true };
			case 'User':
				return { isUser: true };
			case 'AccPayable':
				return { isClerk: true };
			default:
				return { isRoot: true };
		}
	};

	resetAccess = () => {
		this.roles.next({
			isAdmin: false,
			isManage: false,
			isFinance: false,
			isUser: false,
			isRoot: false,
			isClerk: false,
		});
	};

	getUser: any = () => {
		return cookies.get('user') ? JSON.parse(cookies.get('user')) : null;
	};

	getUserRole: any = () => {
		return cookies.get('user') ? this.getUser().role : null;
	};

	getUserName: any = () => {
		return cookies.get('user') ? this.getUser().firstName : null;
	};

	getEmail = () => {
		return cookies.get('user') ? this.getUser().email : null;
	};
	getEmpId = () => {
		return cookies.get('user') ? this.getUser().empId : null;
	};

	getEmployeeBalance = () => {
		return this.http.get(
			`${this.getApi()}/api/EmpCurrentPettyCashBalances/GetEmpMaxlimitcurBalAndCashInHandStatus/${this.getEmpId()}`,
		);
	};

	getEmployeeAdvanceBalance = () => {
		return this.http.get(
			`${this.getApi()}/api/EmpCurrentPettyCashBalances/GetEmpCashBalanceVsAdvanced/${this.getEmpId()}`,
		);
	};

	canManage: any = () => !this.roles.getValue().isUser;

	canFinance: any = () => this.roles.getValue().isFinance;

	canOrganize: any = () => this.roles.getValue().isAdmin;

	canOnlyManage: any = () =>
		!this.roles.getValue().isAdmin && this.roles.getValue().isManage;

	canPay: any = () => this.roles.getValue().isClerk;

	checkRole = (role) => (role ? this[role]() : false);

	canAccessSubClaimsReports = () =>
		this.canOrganize() || this.canOnlyManage() || this.canFinance();

	getSettlementType = (type) =>
		type
			? this.translate.instant('components.filters.reports.settled')
			: this.translate.instant('components.filters.reports.notSettled');
}
