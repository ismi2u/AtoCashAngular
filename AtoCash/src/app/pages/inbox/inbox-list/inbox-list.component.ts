import { TravelRequestService } from './../../../services/travel-request.service';
import { ApprovalStatusService } from './../../../services/approval-status.service';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApprovalLevelsService } from 'src/app/services/approval-levels.service';
import { CashRequestService } from 'src/app/services/cash-request.service';
import { CommonService } from 'src/app/services/common.service';
import { RequestService } from 'src/app/services/request.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ExpenseReimburseRequestService } from 'src/app/services/expense-reimburse-request.service';
import { InboxAlertComponent } from '../inbox-alert/inbox-alert.component';

@Component({
	selector: 'app-approval-level-list',
	templateUrl: './inbox-list.component.html',
	styleUrls: ['./inbox-list.component.scss'],
})
export class InboxListComponent implements OnInit {
	requests: any = [];
	requestHeaders: any = [
		'tableHeader.inbox.id',
		'tableHeader.inbox.employee',
		'tableHeader.inbox.department',
		'tableHeader.inbox.project',
		'tableHeader.inbox.requestDate',
		'tableHeader.inbox.status',
	];
	requestApprovalFlow = null;
	requestDetails = null;
	empId = this.commonService.getUser().empId;
	availableStatus = [];
	checkedRequests = [];
	requestType = 'cashAdvance';
	formName = 'inbox';
	comments = '';

	constructor(
		private commonService: CommonService,
		private approvalStatusService: ApprovalStatusService,
		private translate: TranslateService,
		private _cdr: ChangeDetectorRef,
		private cashRequestService: CashRequestService,
		private travelRequestService: TravelRequestService,
		private expenseRequestService: ExpenseReimburseRequestService,
		private requestService: RequestService,
		private router: Router,
		private snapshot: ActivatedRoute,
		private modalService: NzModalService,
	) {}

	ngOnInit(): void {
		this.commonService.loading.next(true);
		this.approvalStatusService.approvalStatus.subscribe((data) => {
			this.availableStatus = data;
		});

		this.commonService.inboxType.subscribe((type) => {

			if(type !== 'travelRequest') {
				this.requestHeaders = [
					'tableHeader.inbox.id',
					'tableHeader.inbox.employee',
					'tableHeader.inbox.department',
					'tableHeader.inbox.project',
					'tableHeader.inbox.requestDate',
					'tableHeader.inbox.claimAmount',
					'tableHeader.inbox.status',
				];
			}else {
				this.requestHeaders = [
					'tableHeader.inbox.id',
					'tableHeader.inbox.employee',
					'tableHeader.inbox.department',
					'tableHeader.inbox.project',
					'tableHeader.inbox.requestDate',
					'tableHeader.inbox.status',
				];
			}
			this.requestType = type;
			switch (this.requestType) {
				case 'travelRequest':
					this.updateTableForTravel();
					break;
				case 'cashAdvance':
					this.updateTableForCashAdvance();
					break;
				case 'expenseReimburse':
					this.updateTableForExpense();
			}
		});
	}

	getCashAdvanceRowData = (event) => {
		this.commonService.loading.next(true);
		this.requestService
			.getRequestStatus(event.pettyCashRequestId)
			.subscribe((statusResponse: any) => {
				this.requestApprovalFlow = statusResponse.data;
				this.cashRequestService
					.geCashRequestById(event.pettyCashRequestId)
					.subscribe((detailsResponse: any) => {
						this.requestDetails = detailsResponse.data;
						this.commonService.loading.next(false);
					});
			});
	};

	getTravelRequestRowData = (event) => {
		this.commonService.loading.next(true);
		this.requestService
			.getTravelRequestStatus(event.travelApprovalRequestId)
			.subscribe((statusResponse: any) => {
				this.requestApprovalFlow = statusResponse.data;
				this.travelRequestService
					.getTravelRequestById(event.travelApprovalRequestId)
					.subscribe((detailsResponse: any) => {
						this.requestDetails = detailsResponse.data;
						this.commonService.loading.next(false);
					});
			});
	};

	getExpenseRequestRowData = (event) => {
		this.commonService.loading.next(true);
		this.requestService
			.getExpenseRequestStatus(event.expenseReimburseRequestId)
			.subscribe((statusResponse: any) => {
				this.requestApprovalFlow = statusResponse.data;
				this.expenseRequestService
					.getExpenseRequestById(event.expenseReimburseRequestId)
					.subscribe((detailsResponse: any) => {
						this.requestDetails = detailsResponse.data;
						this.commonService.loading.next(false);
					});
			});
	};

	rowChecked = (data) => {
		this.checkedRequests = data;
	};

	onAction = (data) => {
		switch (this.requestType) {
			case 'travelRequest':
				this.updateTravelRequest(data);
				break;
			case 'cashAdvance':
				this.updateCashAdvanceRequest(data);
				break;
			case 'expenseReimburse':
				this.updateExpenseRequest(data);
				break;
		}
	};

	updateTravelRequest(data) {
		this.commonService.loading.next(true);
		const updatedData = this.checkedRequests.map((request) => {
			return {
				...request,
				approvalStatusType: data.status,
				approvalStatusTypeId: data.id,
				comments: this.comments
			};
		});

		this.requestService
			.updateTravelRequest(updatedData)
			.subscribe((response: any) => {
				this.requestService
					.getRequestToApprove(this.empId)
					.subscribe((data: any) => {
						this.requestTypeChange(this.requestType);
						this.commonService.onStatusChange.next('travelRequestUpdate');
						this.commonService.loading.next(false);
					});
			});
	}

	updateCashAdvanceRequest(data) {
		this.commonService.loading.next(true);
		const updatedData = this.checkedRequests.map((request) => {
			return {
				...request,
				approvalStatusType: data.status,
				approvalStatusTypeId: data.id,
				comments: this.comments

			};
		});

		this.requestService
			.updateCashAdvanceRequest(updatedData)
			.subscribe((response: any) => {
				this.requestTypeChange(this.requestType);
				this.commonService.onStatusChange.next('cashRequestUpdate');
				this.commonService.loading.next(false);
			});
	}

	updateExpenseRequest(data) {
		this.commonService.loading.next(true);
		const updatedData: any = this.checkedRequests.map((request) => {
			return {
				...request,
				approvalStatusType: data.status,
				approvalStatusTypeId: data.id,
				comments: this.comments
			};
		});

		this.requestService
			.updateExpenseRequest(updatedData)
			.subscribe((response: any) => {
				this.requestTypeChange(this.requestType);
				this.commonService.onStatusChange.next('expenseRequestUpdate');
				this.commonService.loading.next(false);
			});
	}

	showConfirm(status, statusName): void {
		if (this.checkedRequests.length === 0) {
			this.commonService.createNotification(
				'warning',
				this.translate.instant('notification.noRequestSelected'),
			);
		} else {
			const title =
				statusName == 'Approve'
					? this.translate.instant('alert.approve')
					: this.translate.instant('alert.reject');
			const modal = this.modalService.create({
				nzTitle: `<i>${title}</i>`,
				nzContent: InboxAlertComponent,
				nzComponentParams: {
					data: statusName,
				},
				nzFooter: null,
			});

			modal.afterClose.subscribe((data:any) => {
				if(data && data.action) {
					this.comments = data && data.data ? data.data.comments : '';
					this.onAction(status)
					this.checkedRequests = [];
				}
			});
		}
	}

	requestTypeChange(type) {
		if(type !== 'travelRequest') {
			this.requestHeaders = [
				'tableHeader.inbox.id',
				'tableHeader.inbox.employee',
				'tableHeader.inbox.department',
				'tableHeader.inbox.project',
				'tableHeader.inbox.requestDate',
				'tableHeader.inbox.claimAmount',
				'tableHeader.inbox.status',
			];
		}else {
			this.requestHeaders = [
				'tableHeader.inbox.id',
				'tableHeader.inbox.employee',
				'tableHeader.inbox.department',
				'tableHeader.inbox.project',
				'tableHeader.inbox.requestDate',
				'tableHeader.inbox.status',
			];
		}
		this.commonService.loading.next(true);
		this.requestType = type;
		this.requestDetails = null;
		this.checkedRequests = [];
		switch (this.requestType) {
			case 'travelRequest':
				this.updateTableForTravel();
				this.commonService.inboxType.next('travelRequest');
				break;
			case 'cashAdvance':
				this.updateTableForCashAdvance();
				this.commonService.inboxType.next('cashAdvance');
				break;
			case 'expenseReimburse':
				this.updateTableForExpense();
				this.commonService.inboxType.next('expenseReimburse');
		}
	}

	onRowData(data) {
		switch (this.requestType) {
			case 'travelRequest':
				this.getTravelRequestRowData(data);
				break;
			case 'cashAdvance':
				this.getCashAdvanceRowData(data);
				break;
			case 'expenseReimburse':
				this.getExpenseRequestRowData(data);
				break;
		}
	}

	onView(data) {
		this.router.navigateByUrl(
			`/expense-reimburse/action/view/${data.expenseReimburseRequestId}`,
		);
	}

	getCashRequestToApprove() {
		this.requestService
			.getRequestToApprove(this.empId)
			.subscribe((data: any) => {
				this.requests = data.data;
				this._cdr.detectChanges();
				this.approvalStatusService.getApprovalStatus();
				this.commonService.loading.next(false);
			});
	}

	getTravelRequestToApprove() {
		this.requestService
			.getTravelRequestToApprove(this.empId)
			.subscribe((data: any) => {
				this.requests = data.data;
				this._cdr.detectChanges();
				this.approvalStatusService.getApprovalStatus();
				this.commonService.loading.next(false);
			});
	}

	getExpenseRequestToApprove() {
		this.requestService
			.getExpenseRequestToApprove(this.empId)
			.subscribe((data: any) => {
				this.requests = data.data;
				this._cdr.detectChanges();
				this.approvalStatusService.getApprovalStatus();
				this.commonService.loading.next(false);
			});
	}

	updateTableForCashAdvance() {
		this.getCashRequestToApprove();
		this.formName = 'inbox';
	}

	updateTableForTravel() {
		this.getTravelRequestToApprove();
		this.formName = 'inbox';
	}

	updateTableForExpense() {
		this.getExpenseRequestToApprove();
		this.formName = 'expense-reimburse-inbox';
	}
}
