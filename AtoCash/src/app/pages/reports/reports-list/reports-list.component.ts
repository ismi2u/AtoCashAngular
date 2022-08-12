import { ReportsService } from './../../../services/reports.service';
import { StatusService } from './../../../services/status.service';
import { DepartmentService } from 'src/app/services/department.service';
import { TravelRequestService } from '../../../services/travel-request.service';
import { ApprovalStatusService } from '../../../services/approval-status.service';
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
import { CostService } from 'src/app/services/cost.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { constant } from 'src/app/constant/constant';
@Component({
	selector: 'app-reports-list',
	templateUrl: './reports-list.component.html',
	styleUrls: ['./reports-list.component.scss'],
})
export class ReportsListComponent implements OnInit {
	requests: any = [];
	filters = [];
	requestHeaders: any = [
		'tableHeader.inbox.id',
		'tableHeader.inbox.employee',
		'tableHeader.inbox.costCenter',
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
	formName = 'reports';
	comments = '';
	enableFilters = false;

	constructor(
		private commonService: CommonService,
		private approvalStatusService: ApprovalStatusService,
		private translate: TranslateService,
		private _cdr: ChangeDetectorRef,
		private cashRequestService: CashRequestService,
		private travelRequestService: TravelRequestService,
		private expenseRequestService: ExpenseReimburseRequestService,
		private requestService: RequestService,
		private reportService: ReportsService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.reportService.populateFilters(constant.FILTERS.REPORTS);
		this.reportService.filterStatus.subscribe((data) => {
			this.filters = data;
		});

		this.requestTypeChange(this.requestType, {}, 'typeChange');
	}

	getCashAdvanceRowData = (event) => {
		this.requestService
			.getRequestStatus(event.pettyCashRequestId)
			.subscribe((statusResponse: any) => {
				this.requestApprovalFlow = statusResponse.data;
				this.cashRequestService
					.geCashRequestById(event.pettyCashRequestId)
					.subscribe((detailsResponse: any) => {
						this.requestDetails = detailsResponse.data;
					});
			});
	};

	getTravelRequestRowData = (event) => {
		this.requestService
			.getTravelRequestStatus(event.id)
			.subscribe((statusResponse: any) => {
				this.requestApprovalFlow = statusResponse.data;
				this.travelRequestService
					.getTravelRequestById(event.id)
					.subscribe((detailsResponse: any) => {
						this.requestDetails = detailsResponse.data;
					});
			});
	};

	getExpenseRequestRowData = (event) => {
		this.requestService
			.getExpenseRequestStatus(event.id)
			.subscribe((statusResponse: any) => {
				this.requestApprovalFlow = statusResponse.data;
				this.expenseRequestService
					.getExpenseRequestById(event.expenseReimburseReqId)
					.subscribe((detailsResponse: any) => {
						this.requestDetails = detailsResponse.data;
					});
			});
	};

	async downloadReport() {

		if(!this.requests.length) {
			this.commonService.createNotification(
				'warning',
				this.translate.instant('notification.noRecordsToDownload'),
			);
		}else {

		let requestTypeId = 1;
		const filters = this.reportService.selectedFilters;
		switch (this.requestType) {
			case 'cashAdvance':
				await this.reportService.downloadCashReportsByEmployee(
					requestTypeId,
					this.requestType,
				);
				break;
			case 'expenseReimburse':
				requestTypeId = 2;
				await this.reportService.downloadCashReportsByEmployee(
					requestTypeId,
					this.requestType,
				);
				break;
			case 'travelRequest':
				this.reportService.downloadTravelReportsByEmployee(this.requestType);
				break;
			case 'employees':
				this.reportService.downloadEmployeesReport(this.requestType);
				break;
			case 'users':
				this.reportService.downloadUserReport(this.requestType);
				break;
			case 'subClaims':
				this.reportService.downloadSubClaimsReport(this.requestType);
				break;
		}

	}
	}

	requestTypeChange(type, filters, trigger) {
		if (type !== 'travelRequest') {
			this.requestHeaders = [
				'tableHeader.inbox.id',
				'tableHeader.inbox.employee',
				'tableHeader.inbox.costCenter',
				'tableHeader.inbox.department',
				'tableHeader.inbox.project',
				'tableHeader.inbox.requestDate',
				'tableHeader.inbox.claimAmount',
				'tableHeader.inbox.status',
			];
		} else {
			this.requestHeaders = [
				'tableHeader.inbox.id',
				'tableHeader.inbox.employee',
				'tableHeader.inbox.costCenter',
				'tableHeader.inbox.department',
				'tableHeader.inbox.project',
				'tableHeader.inbox.requestDate',
				'tableHeader.inbox.status',
			];
		}

		if (type === 'employees' || type === 'users') {
			this.requestHeaders = [
				'tableHeader.inbox.id',
				'tableHeader.employee.name',
				'tableHeader.employee.email',
				'tableHeader.employee.mobile',
				'tableHeader.employee.doj',
				'tableHeader.employee.jobRole',
				'tableHeader.inbox.department',
			];
		}
		if (type === 'subClaims') {
			this.requestHeaders = [
				'tableHeader.inbox.id',
				'tableHeader.inbox.employee',
				'tableHeader.inbox.costCenter',
				'tableHeader.inbox.department',
				'tableHeader.inbox.project',
				'tableHeader.inbox.invoiceDate',
				'tableHeader.inbox.claimAmount',
				'tableHeader.inbox.expenseType',

			];
		}
		if (trigger !== 'apply') {
			this.reportService.emptySelectedFilters();
			this.enableFilters = false;
		}
		this.requestType = type;
		this.requestDetails = null;
		let requestTypeId = 1;
		switch (this.requestType) {
			case 'cashAdvance':
				this.getCashOrExpenseReports(requestTypeId, filters);
				if (Object.keys(filters).length === 0)
					this.reportService.populateFilters(constant.FILTERS.REPORTS);
				break;
			case 'expenseReimburse':
				requestTypeId = 2;
				this.getCashOrExpenseReports(requestTypeId, filters);
				if (Object.keys(filters).length === 0)
					this.reportService.populateFilters(constant.FILTERS.REPORTS);
				break;
			case 'travelRequest':
				this.getTravelRequestReports(filters);
				if (Object.keys(filters).length === 0)
					this.reportService.populateFilters(constant.FILTERS.TRAVEL_FILTER);
				break;
			case 'employees':
				this.getEmployeesReports(filters);
				if (Object.keys(filters).length === 0)
					this.reportService.populateFilters(constant.FILTERS.EMPLOYEES);
				break;
			case 'users':
				this.getUsersReport(filters);
				if (Object.keys(filters).length === 0)
					this.reportService.populateFilters(constant.FILTERS.USERS);
				break;
			case 'subClaims':
				this.getSubClaimReport(filters);
				if (Object.keys(filters).length === 0)
					this.reportService.populateFilters(constant.FILTERS.SUB_CLAIMS);
				break;
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

	getCashOrExpenseReports(requestTypeId, filters) {
		this.reportService
			.getCashReportsByEmployee({ ...filters, requestTypeId })
			.subscribe((response: any) => {
				this.requests = response.data;
			});
	}

	getTravelRequestReports(filters) {
		this.reportService
			.getTravelReportsByEmployee(filters)
			.subscribe((response: any) => {
				this.requests = response.data;
			});
	}
	getEmployeesReports(filters) {
		this.reportService
			.getEmployeesReport(filters)
			.subscribe((response: any) => {
				this.requests = response.data;
			});
	}
	getUsersReport(filters) {
		this.reportService.getUsersReport(filters).subscribe((response: any) => {
			this.requests = response.data;
		});
	}
	getSubClaimReport(filters) {
		this.reportService
			.getSubClaimsReport(filters)
			.subscribe((response: any) => {
				this.requests = response.data;
			});
	}
	showFilters() {
		this.enableFilters = !this.enableFilters;
		if (!this.enableFilters) {
			this.reportService.emptySelectedFilters();
		}
	}

	applyFilter(filter) {
		const selectedFilters = this.reportService.updateSelectedFilters(filter);
		switch (this.requestType) {
			case 'cashAdvance':
				this.requestTypeChange('cashAdvance', selectedFilters, 'apply');
				break;
			case 'expenseReimburse':
				this.requestTypeChange('expenseReimburse', selectedFilters, 'apply');
				break;
			case 'travelRequest':
				this.requestTypeChange('travelRequest', selectedFilters, 'apply');
				break;
			case 'employees':
				this.requestTypeChange('employees', selectedFilters, 'apply');
				break;
			case 'users':
				this.requestTypeChange('users', selectedFilters, 'apply');
				break;
			case 'subClaims':
				this.requestTypeChange('subClaims', selectedFilters, 'apply');
				break;
		}
	}

	onView(data) {
		this.router.navigateByUrl(
			`/expense-reimburse/action/view/${data.expenseReimburseReqId}`,
		);
	}

	openAnalytics() {
		window.open("https://datastudio.google.com/reporting/8dcaf65f-297c-4055-9b92-5fb6264b3d30", "_blank");
	}
}
