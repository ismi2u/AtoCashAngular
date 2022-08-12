import { RequestService } from 'src/app/services/request.service';
import { CommonService } from './../../services/common.service';
import { AuthService } from '../../services/auth.service';
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-task',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
	access: any = {};
	userRole = '';
	userName = '';
	userEmail = '';
	loading: any = false;
	openMap: { [name: string]: boolean } = {
		approvals: false,
		projects: false,
		employees: false,
		preferences: false,
	};
	isCollapsed = false;

	constructor(
		public requestService: RequestService,
		private _cdr: ChangeDetectorRef,
		private authService: AuthService,
		private commonService: CommonService,
		private translateService: TranslateService,
	) {}
	ngOnInit(): void {
		this.commonService.roles.subscribe((data) => {
			this.access = data;
			this.userName = this.commonService.getUserName();
			this.userEmail = this.commonService.getEmail();
		});

		this.commonService.loading.subscribe((data) => {
			this.loading = data;
			this._cdr.detectChanges();
		});

		if (this.canMange()) {
			this.requestService.populateInbox();
		}
	}

	canOrganize = () => {
		return this.access.isRoot;
	};
	canPay = () => {
		return this.access.isClerk;
	};

	canOrganizeAndManage = () => {
		return this.access.isAdmin;
	};

	canMange = () => {
		return this.access.isManage || this.access.isFinance || this.access.isAdmin;
	};

	canView = () => {
		return this.access.isUser;
	};

	toggle = () => {
		this.isCollapsed = !this.isCollapsed;
	};

	logout = () => this.authService.logout();

	openHandler(value: string): void {
		for (const key in this.openMap) {
			if (key !== value) {
				this.openMap[key] = false;
			}
		}
	}
}
