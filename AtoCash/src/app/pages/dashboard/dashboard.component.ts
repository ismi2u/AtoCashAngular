import { EmployeeService } from './../../services/employee.service';
import { RequestService } from 'src/app/services/request.service';
import { TranslateService } from '@ngx-translate/core';
import { TravelRequestService } from 'src/app/services/travel-request.service';
import { CommonService } from 'src/app/services/common.service';
import { CashRequestService } from 'src/app/services/cash-request.service';
import { Component, OnInit } from '@angular/core';
import { ExpenseReimburseRequestService } from 'src/app/services/expense-reimburse-request.service';
import * as Highcharts from 'highcharts';

@Component({
	selector: 'app-task',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	cashRequest = null;
	travelRequest = null;
	expenseReimburse = null;
	employeeBalance = 0;
	employeeCurrency = 'INR';
	balance = null;
	employee = null;
	highCharts: typeof Highcharts = Highcharts;
	updateFlag: boolean = false; // optional boolean
	requestType = 'cashRequest';
	chartData = [];
	chartOptions: Highcharts.Options = {
		title: {
			text: '',
		},
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'variablepie',
			style: {
				fontWeight: '500',
				fontFamily: `-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji' !important;`,
			},
		},
		credits: {
			enabled: false,
		},

		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
				},
				showInLegend: true,
			},
		},
		series: [
			{
				type: 'pie',
				name: 'Requests',
				innerSize: '70%',
				colorByPoint: true,
				data: this.chartData,
			},
		],
	}; // required

	constructor(
		private cashRequestService: CashRequestService,
		private expenseRequestService: ExpenseReimburseRequestService,
		private TravelRequestService: TravelRequestService,
		private commonService: CommonService,
		private translate: TranslateService,
		private employeeService: EmployeeService,
	) {}

	ngOnInit(): void {
		this.initializeRequestData();
		this.commonService.getEmployeeAdvanceBalance().subscribe();
		this.commonService.getEmployeeBalance().subscribe((response: any) => {
			this.balance = response.data
		});
		this.employeeService
			.getEmployeeById(this.commonService.getEmpId())
			.subscribe((data: any) => {
				this.employee = data.data;
			});
		this.employeeCurrency = this.commonService.getUser().currencyCode;
	}

	initializeRequestData() {
		this.getCashRequestData();
		this.getExpenseRequestData(true);
		this.getTravelRequestData(true);
	}

	getCashRequestData() {
		this.commonService.loading.next(true);
		this.cashRequestService
			.geCashRequestCount(this.commonService.getUser().empId)
			.subscribe((response: any) => {
				this.cashRequest = response.data;
				this.cashRequest.chartOptions = this.getChartOptions(response.data);
				this.updateChartData(response.data, 'heading.cashAdvanceStatus');
				this.commonService.loading.next(false);
			});
	}

	getExpenseRequestData(initial) {
		this.commonService.loading.next(true);
		this.expenseRequestService
			.getExpenseRequestCount(this.commonService.getUser().empId)
			.subscribe((response: any) => {
				this.expenseReimburse = response.data;
				if (!initial)
					this.updateChartData(response.data, 'heading.expenseReimburse');
				this.commonService.loading.next(false);
			});
	}

	getTravelRequestData(initial) {
		this.commonService.loading.next(true);
		this.TravelRequestService.getTravelRequestCount(
			this.commonService.getUser().empId,
		).subscribe((response: any) => {
			this.travelRequest = response.data;
			if (!initial)
				this.updateChartData(response.data, 'heading.travelRequest');
			this.commonService.loading.next(false);
		});
	}

	updateChart(type) {
		this.updateFlag = false;
		this.requestType = type;
		switch (type) {
			case 'cashRequest':
				this.getCashRequestData();
				break;
			case 'travelRequest':
				this.getTravelRequestData(false);
				break;
			case 'expenseRequest':
				this.getExpenseRequestData(false);
				break;
		}
	}

	getChartOptions(data) {
		return [
			{
				name: this.translate.instant('heading.approved'),
				y: data.approvedCount,
				color: '#27DC9B',
			},
			{
				name: this.translate.instant('heading.pending'),
				y: data.pendingCount,
				color: '#F5C23D',
			},
			{
				name: this.translate.instant('heading.rejected'),
				y: data.rejectedCount,
				color: '#ED432B',
			},
			// { name: 'Total', y: data.totalCount, color: '#6C56F0' },
		];
	}

	updateChartData(request, title) {
		this.chartOptions.title.text = this.translate.instant(title);
		this.chartOptions.series = [
			{
				type: 'pie',
				data: this.getChartOptions(request),
			},
		];
		this.updateFlag = true;
	}

	getCardNumber = (cardNo:string) => {
       return cardNo.split('').map((char,index)=>(index + 1) % 4 === 0 ? char + ' ' : char ).join('')
	}
}

/**
 * cashInHand: 0
curBalance: 100000
maxLimit: 100000
totalAmountToCredit: 0
totalAmountToWallet: 0
walletBalLastUpdated: "2021-05-29T06:13:15.590244"
 */
