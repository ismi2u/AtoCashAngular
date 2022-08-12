import { EmployeeService } from './../../../services/employee.service';
import { RequestService } from 'src/app/services/request.service';
import { CommonService } from '../../../services/common.service';
import { CashRequestService } from '../../../services/cash-request.service';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApprovalLevelsService } from 'src/app/services/approval-levels.service';
import { TranslateService } from '@ngx-translate/core';
import { DisburseService } from 'src/app/services/disburse.service';
import * as moment from 'moment';
import { RpaService } from 'src/app/services/rpa.service';

@Component({
	selector: 'app-approval-level-list',
	templateUrl: './disburse-list.component.html',
	styleUrls: ['./disburse-list.component.scss'],
})
export class DisburseListComponent implements OnInit {
	disburses: any = [];
	employee = null;
	cashRequestHeaders: any = [
		'tableHeader.disburse.id',
		'tableHeader.disburse.employee',
		'tableHeader.disburse.department',
		'tableHeader.disburse.project',
		'tableHeader.disburse.claimAmount',
		'tableHeader.disburse.status',
	];
	requestApprovalFlow = null;
	requestDetails = null;
	empId = this.commonService.getUser().empId;
	filter = {
		isAccountSettled: null,
		settledAccountsFrom: null,
		settledAccountsTo: null,
	};
	constructor(
		private commonService: CommonService,
		private _cdr: ChangeDetectorRef,
		private disburseService: DisburseService,
		private employeeService: EmployeeService,
		private rpaService: RpaService,
		private translate: TranslateService
	) {}

	ngOnInit(): void {
		this.getDisburses();
	}

	getRowData = (event) => {
		this.commonService.loading.next(true);
		this.disburseService.getDisburseById(event.id).subscribe((data: any) => {
			this.requestDetails = data.data;
			this.commonService.loading.next(false);
			this.employeeService
				.getEmployeeById(this.requestDetails.employeeId)
				.subscribe((response: any) => {
					this.requestDetails = {
						bankAccount: response.data.bankAccount,
						bankCardNo: response.data.bankCardNo,
						...this.requestDetails,
					};
				});
		});
	};

	onDisburseTypeChange = (event) => {
		this.commonService.loading.next(true);
		this.filter = event;
		this.disburseService.getDisburses(event).subscribe((data: any) => {
			this.disburses = data.data;
			this._cdr.detectChanges();
			this.commonService.loading.next(false);
		});
	};

	getDisburses = () => {
		this.commonService.loading.next(true);
		this.disburseService.getDisburses(this.filter).subscribe((data: any) => {
			this.disburses = data.data;
			this._cdr.detectChanges();
			this.commonService.loading.next(false);
		});
	};

	downloadReport = () => {
		if (this.disburses.length === 0) {
			this.commonService.createNotification(
				'warning',
				this.translate.instant('notification.noRecordsToDownload'),
			);
		} else {
			this.disburseService.downloadDisburseReport(this.filter);
		}
	};
	updateDisburseDetails(details) {
		this.commonService.loading.next(true);
		this.disburseService.updateDisburseById(details).subscribe(() => {
			this.getDisburses();
			this.requestDetails = null;
		});
	}

	automate() {
		this.rpaService.triggerBot();
	}
}
