import { ApprovalStatusService } from '../../../services/approval-status.service';
import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApprovalLevelsService } from 'src/app/services/approval-levels.service';
import { CommonService } from 'src/app/services/common.service';
import { RequestService } from 'src/app/services/request.service';
import { TravelRequestService } from 'src/app/services/travel-request.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ExpenseReimburseRequestFormComponent } from '../expense-reimburse-request-form/expense-reimburse-request-form.component';
import { constant } from 'src/app/constant/constant';
import { ExpenseReimburseRequestService } from 'src/app/services/expense-reimburse-request.service';
import _ from 'lodash';
import { ExpenseReimburseRequestInitComponent } from '../expense-reimburse-request-inti/expense-reimburse-request-init.component';
import { Subject } from 'rxjs';
import { ExpenseReimburseRequestSummaryComponent } from '../expense-reimburse-request-summary/expense-reimburse-request-summary.component';
@Component({
	selector: 'app-expense-reimburse-list',
	templateUrl: './expense-reimburse-request-create.component.html',
	styleUrls: ['./expense-reimburse-request-create.component.scss'],
})
export class ExpenseReimburseRequestCreateComponent implements OnInit {
	expenses: any = [];
	travelRequestHeaders: any = [
		'tableHeader.expenseReimburse.create.invoiceNo',
		'tableHeader.expenseReimburse.create.expenseType',
		'tableHeader.expenseReimburse.create.invoiceDate',
		'tableHeader.expenseReimburse.create.claimAmount',
	];
	requestApprovalFlow = null;
	requestDetails = null;
	empId = this.commonService.getUser().empId;
	primaryExpenseData = {
		expenseReportTitle: this.translate.instant("heading.expenseReimburse")
	};
	mode = 'add';
	recordId = null;
	disableActions = false;
	claimDocuments = [];

	totalClaimAmount = 0;

	constructor(
		private modalService: NzModalService,
		private commonService: CommonService,
		private requestService: RequestService,
		private translate: TranslateService,
		private _cdr: ChangeDetectorRef,
		private travelRequestService: TravelRequestService,
		private router: Router,
		private snapshot: ActivatedRoute,
		private expenseReimburseRequestService: ExpenseReimburseRequestService,
	) {}

	ngOnInit(): void {

		this.expenseReimburseRequestService.totalClaimAmount.subscribe((data)=>{
			this.totalClaimAmount =  data
		})

		this.snapshot.params.subscribe((param) => {
			this.mode = param.type;
			if (param.type === 'edit') {
				this.commonService.loading.next(true);
				this.recordId = param.id;
				this.expenseReimburseRequestService
					.getExpenseRequestById(param.id)
					.subscribe((expenseReimburse: any) => {
						this.primaryExpenseData = expenseReimburse.data;
						this.expenseReimburseRequestService
							.getExpenseClaimById(param.id)
							.subscribe((response: any) => {
								this.expenses = response.data;
								this.commonService.loading.next(false);
							});
					});
			} else if (param.type === 'add') {
				this.showPrimaryModal('new');
			} else {
				this.commonService.loading.next(true);
				this.disableActions = true;
				this.recordId = param.id;
				this.expenseReimburseRequestService
					.getExpenseRequestById(param.id)
					.subscribe((expenseReimburse: any) => {
						this.primaryExpenseData = expenseReimburse.data;
						this.expenseReimburseRequestService
							.getExpenseClaimById(param.id)
							.subscribe((response: any) => {
								this.expenses = response.data;
							});
					});
			}
		});
	}

	deleteRecord = (event) => {
		if (event.index && event.data) {
			this.expenses.splice(event.index, 1);
			this.expenses = [...this.expenses];
			this._cdr.detectChanges();
		}
	};

	editRecord = (event) => {
		this.showModal({ ...this.expenses[event.index], index: event.index });
	};

	getRowData = (event) => {
		this.requestDetails = event;
		if (this.mode === 'view') {
			this.commonService.loading.next(true);
			this.expenseReimburseRequestService
				.getDocumentsBySubClaimId(event.id)
				.subscribe((response: any) => {
					this.claimDocuments = response.data;
					this.commonService.loading.next(false);
				});
		}
	};

	getTotalAmount() {
		return this.expenses.reduce((acc, val) => {
			return acc + Number(val.expenseReimbClaimAmount) + Number(val.taxAmount);
		}, 0);
	}

	showModal(data) {
		const modal = this.modalService.create({
			nzTitle: this.primaryExpenseData.expenseReportTitle,
			nzContent: ExpenseReimburseRequestFormComponent,
			nzFooter: null,
			nzComponentParams: {
				data: data || null,
			},
		});
		modal.afterClose.subscribe((data) => {
			if (data && data.data) {
				if (data.type === 'add') {
					this.expenses = [...this.expenses, data.data];
					this._cdr.detectChanges();
				} else {
					const updated = [...this.expenses];
					updated[data.data.index] = data.data;
					this.expenses = updated;
					this.requestDetails = null;
					this._cdr.detectChanges();
				}
			}
		});
	}

	showPrimaryModal(state) {
		const modal = this.modalService.create({
			nzTitle: this.translate.instant('heading.expenseReimburseInitialization'),
			nzContent: ExpenseReimburseRequestInitComponent,
			nzFooter: null,
			nzComponentParams: {
				data: this.primaryExpenseData,
			},
			nzClosable: this.primaryExpenseData ? true : false,
			nzMaskClosable: this.primaryExpenseData ? true : false,
		});
		modal.afterClose.subscribe((data) => {
			if (data && data.data) {
				this.primaryExpenseData = data.data;
				state === 'new' ? this.showModal(null) : null;
			}
		});
	}

	duplicateRow(data) {
		if (data) {
			this.expenses = [...this.expenses, data];
			this._cdr.detectChanges();
		}
	}

	showSummaryModal() {
		if (this.expenses.length > 0) {
			const modal = this.modalService.create({
				nzTitle: this.primaryExpenseData.expenseReportTitle,
				nzContent: ExpenseReimburseRequestSummaryComponent,
				nzFooter: null,
				nzComponentParams: {
					data: {
						...this.primaryExpenseData,
						subClaims: this.expenses,
						totalAmount: this.getTotalAmount(),
					},
				},
			});
			modal.afterClose.subscribe((data) => {
				if (data && data.data === 'submit') {
					this.commonService.loading.next(true);
					this.submitExpense();
				}
			});
		} else {
			this.commonService.createNotification('warning', 'No Sub Claims Added');
		}
	}

	submitExpense() {
		const requestExpenseData = this.expenses.map((expense) => {
			let updatedExpense = { ...expense };
			updatedExpense.documentIds = expense.documents
				.map((document) => document.id)
				.join(',');
			delete updatedExpense.documents;
			delete updatedExpense.index;
			return updatedExpense;
		});

		let expenseRequest = {
			...this.primaryExpenseData,
			expenseSubClaims: requestExpenseData,
		};

		this.expenseReimburseRequestService
			.addExpenseReimburse(expenseRequest)
			.subscribe(
				(data) => {
					this.commonService.loading.next(false);
					this.router.navigateByUrl('/expense-reimburse/list');
				},
				(err) => {
					this.commonService.loading.next(false);
				},
			);
	}

	hasAllDocuments = () => {
		return (
			this.expenses.filter((expense) => {
				return !expense.documents
			}).length === 0
		);
	};

	

}
