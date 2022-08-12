import { CommonService } from './../../services/common.service';
import { ExpenseTypesService } from './../../services/expense-types.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { constant } from '../../constant/constant';
import * as moment from 'moment';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
	@Input() enableCheckBox = false;
	@Input() enableDuplicate = false;
	@Input() enableView = false;
	@Input() mode;
	@Input() tableHeaders = [];
	@Input() tableData = [];
	@Input() formName;
	@Input() pageSize = 7;
	@Input() enableEmployeeSelection = false;
	@Output() onEdit = new EventEmitter();
	@Output() onDelete = new EventEmitter();
	@Input() enableEdit = true;
	@Input() enableDelete = true;
	@Input() enableSearch = true;
	@Input() scroll = { x: '800px' };
	@Output() onRowSelect = new EventEmitter();
	@Output() onRowCheck = new EventEmitter();
	@Output() onRequestChange = new EventEmitter();
	@Output() onRowAdd = new EventEmitter();
	@Output() onDuplicate = new EventEmitter();
	@Output() onView = new EventEmitter();
	@Output() onMethodUpdate = new EventEmitter();
	@Output() onDisburseChange = new EventEmitter();
	@Output() onDisburseFilterChange = new EventEmitter();

	@Output() onDownload = new EventEmitter();
	@Input() filters = [];
	@Input() enableDownload = false;
	searchTerm = '';
	checked = false;
	loading = false;
	indeterminate = false;
	listOfData: ReadonlyArray<any> = [];
	listOfCurrentPageData: ReadonlyArray<any> = [];
	setOfCheckedId = new Set<number>();
	selectedRecords = [];
	filteredList = [];
	RequestTypes: any[] = constant.REQUEST_TYPES_OPTIONS;
	ReportsTypes: any[] = constant.REPORTS_TYPES_OPTIONS;
	disburseTypes: any[] = constant.DISBURSE.FILTER;
	@Input() requestType = 'cashAdvance';
	reportsType = 'cashAdvance';
	disburseType = 'all';
	@Output() onFilterChange = new EventEmitter();

	disburseFilter = {
		isAccountSettled: null,
		settledAccountsFrom: moment().subtract(1, 'day').toISOString(),
		settledAccountsTo: moment().toISOString(),
	};

	expenses = [];
	date = new Date().toISOString();

	constructor(
		private modal: NzModalService,
		private translate: TranslateService,
		private expenseService: ExpenseTypesService,
		public commonService: CommonService,
	) {}

	updateCheckedSet(id: number, checked: boolean): void {
		if (checked) {
			this.setOfCheckedId.add(id);
		} else {
			this.setOfCheckedId.delete(id);
		}
	}

	onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<any>): void {
		this.listOfCurrentPageData = listOfCurrentPageData;
		this.refreshCheckedStatus();
	}

	refreshCheckedStatus(): void {
		const listOfEnabledData = this.listOfCurrentPageData.filter(
			({ disabled }) => !disabled,
		);
		this.checked = listOfEnabledData.every(({ id }) =>
			this.setOfCheckedId.has(id),
		);
		this.indeterminate =
			listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) &&
			!this.checked;
	}

	onItemChecked(data: any, checked: boolean): void {
		this.updateCheckedSet(data.id, checked);
		this.refreshCheckedStatus();

		if (checked) {
			this.selectedRecords.push(data);
			this.onRowCheck.emit(this.selectedRecords);
		}
		if (!checked) {
			const index = this.selectedRecords.findIndex(
				(item) => item.id === data.id,
			);
			if (index !== -1) {
				this.selectedRecords.splice(index, 1);
				this.onRowCheck.emit(this.selectedRecords);
			}
		}
	}

	onAllChecked(checked: boolean): void {
		this.refreshCheckedStatus();
		this.setOfCheckedId.clear();
		[...this.tableData].forEach(({ id }) => this.updateCheckedSet(id, checked));
		this.selectedRecords = checked ? [...this.tableData] : [];
		this.onRowCheck.emit(this.selectedRecords);
	}

	sendRequest(): void {
		this.loading = true;
		const requestData = this.listOfData.filter((data) =>
			this.setOfCheckedId.has(data.id),
		);
		setTimeout(() => {
			this.setOfCheckedId.clear();
			this.refreshCheckedStatus();
			this.loading = false;
		}, 1000);
	}

	ngOnInit(): void {
		if (this.commonService.canOrganize()) {
			this.ReportsTypes = [
				...constant.REPORTS_TYPES_OPTIONS,
				{
					label: 'heading.employees',
					value: 'employees',
				},
				{
					label: 'heading.user',
					value: 'users',
				},
			];
		}

		if (this.commonService.canAccessSubClaimsReports()) {
			this.ReportsTypes = [
				...this.ReportsTypes,
				{
					label: 'heading.subClaims',
					value: 'subClaims',
				},
			];
		}

		if (this.formName === 'expenseReimburseData') {
			this.expenseService.getExpenseTypes();
			this.expenseService.expenseTypes.subscribe((expenses: any) => {
				this.expenses = expenses;
			});
		}

		this.commonService.onStatusChange.subscribe(() => {
			this.selectedRecords = [];
		});
	}

	onSelect = (event, data) => {
		event.preventDefault();
		this.onRowSelect.emit(data);
	};

	showConfirm(event, data, index): void {
		event.preventDefault();
		event.stopPropagation();
		this.modal.confirm({
			nzTitle: `<i>${this.translate.instant('alert.delete')}</i>`,
			nzOkText: this.translate.instant('button.yes'),
			nzCancelText: this.translate.instant('button.no'),
			nzOnOk: () =>
				this.formName == 'expenseReimburseData'
					? this.onDelete.emit({ data, index })
					: this.onDelete.emit(data),
			nzOnCancel: () => {},
		});
	}

	onSearchChange = (event) => {
		this.searchTerm = event;
		this.filteredList = this.tableData.filter((data: any) => {
			let canAdd = false;
			Object.keys(data).map((key) => {
				if (String(data[key]).toLowerCase().includes(event.toLowerCase())) {
					canAdd = true;
				}
			});
			return canAdd;
		});
	};

	onRequestTypeChange = (event) => {
		this.requestType = event;
		this.onRequestChange.emit(event);
	};

	addNewRow() {
		this.onRowAdd.emit();
	}

	duplicate(event, data) {
		event.preventDefault();
		event.stopPropagation();
		this.onDuplicate.emit(data);
	}

	canShow(data) {
		return Object.keys(data).includes('showEditDelete')
			? data.showEditDelete
			: true;
	}

	edit(event, data, index) {
		event.preventDefault();
		event.stopPropagation();
		this.formName == 'expenseReimburseData'
			? this.onEdit.emit({ data, index })
			: this.onEdit.emit(data);
	}

	view(event, data) {
		event.preventDefault();
		event.stopPropagation();
		this.onView.emit(data);
	}

	limitString(data: String) {
		// if (data) return data.length > 9 ? data.substr(0, 8) + '...' : data;
		return data;
	}

	getExpenseName(id) {
		return this.expenses.filter((expense) => expense.id == id)[0]
			.expenseTypeName;
	}

	onDisburseTypeChange() {
		this.disburseFilter['isAccountSettled'] =
			this.disburseType === 'all' ? null : this.disburseType;
		this.onDisburseFilterChange.emit(this.disburseFilter);
	}

	disburseDateChange(event, type) {
		this.disburseFilter[type] = event;
		this.onDisburseFilterChange.emit(this.disburseFilter);
	}

	get direction() {
		return document.getElementsByTagName('html')[0].getAttribute('dir');
	}
}
