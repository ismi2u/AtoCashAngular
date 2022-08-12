import { ExpenseReimburseRequestService } from './../../../services/expense-reimburse-request.service';
import { ApprovalStatusService } from '../../../services/approval-status.service';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApprovalLevelsService } from 'src/app/services/approval-levels.service';
import { CommonService } from 'src/app/services/common.service';
import { RequestService } from 'src/app/services/request.service';
import { TravelRequestService } from 'src/app/services/travel-request.service';

@Component({
	selector: 'app-expense-reimburse-list',
	templateUrl: './expense-reimburse-request-list.component.html',
	styleUrls: ['./expense-reimburse-request-list.component.scss'],
})
export class ExpenseReimburseRequestListComponent implements OnInit {
	expenseRequests: any = [];	
  actualRequests: any = [];
	travelRequestHeaders: any = [
		'tableHeader.expenseReimburse.list.id',
		'tableHeader.expenseReimburse.list.expenseName',
		'tableHeader.expenseReimburse.list.department',
		'tableHeader.expenseReimburse.list.project',
		'tableHeader.expenseReimburse.list.claimAmount',
		'tableHeader.expenseReimburse.list.status',
	];

	requestApprovalFlow = null;
	requestDetails = null;
	empId = this.commonService.getUser().empId;

	constructor(
		private commonService: CommonService,
		private requestService: RequestService,
		private _cdr: ChangeDetectorRef,
		private expenseReimburseService: ExpenseReimburseRequestService,
		private router: Router,
	) {}

	ngOnInit(): void {
		this.commonService.loading.next(true);
		this.expenseReimburseService.getExpenseRequests(
			this.commonService.getUser().empId,
		);
		this.expenseReimburseService.expenseReimburseRequest.subscribe((data) => {
      this.actualRequests = data;
			this.expenseRequests = data;
			this.commonService.loading.next(false);
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
		if (event.id) {
			this.commonService.loading.next(true);
			this.expenseReimburseService
				.deleteExpenseRequest(event.id)
				.subscribe(() => {
					this.expenseReimburseService.getExpenseRequests(
						this.commonService.getUser().empId,
					);
				});
		} else {
     const duplicateRecords =  this.expenseReimburseService.deleteDuplicateRequest(event.oldId);
     this.expenseRequests = [...this.actualRequests,...duplicateRecords]
		}
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/expense-reimburse/action/edit/${event.id || event.oldId}`);
	};

	getRowData = (event) => {
		this.commonService.loading.next(true);
		this.requestService
			.getExpenseRequestStatus(event.id)
			.subscribe((statusResponse: any) => {
				this.requestApprovalFlow = statusResponse.data;
				this.expenseReimburseService
					.getExpenseRequestById(event.id)
					.subscribe((detailsResponse: any) => {
						this.requestDetails = detailsResponse.data;
						this.commonService.loading.next(false);
					});
			});
	};

	duplicateExpense = (record) => {
		let recordToDuplicate = { ...record };
		recordToDuplicate.oldId = recordToDuplicate.id;
		delete recordToDuplicate.id;
		this.expenseReimburseService.duplicateExpenseReimburseRequest[
			recordToDuplicate.oldId
		] = { ...recordToDuplicate };
		this.expenseRequests = [...this.expenseRequests, recordToDuplicate];
	};

	onView(data) {
		console.log(data);
		this.router.navigateByUrl(
			`/expense-reimburse/action/view/${data.id}`,
		);
	}

}
