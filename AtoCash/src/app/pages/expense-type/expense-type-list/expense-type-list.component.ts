import { CommonService } from 'src/app/services/common.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseTypesService } from 'src/app/services/expense-types.service';

@Component({
	selector: 'app-expense-type-list',
	templateUrl: './expense-type-list.component.html',
	styleUrls: ['./expense-type-list.component.scss'],
})
export class ExpenseTypeListComponent implements OnInit {
	expenseTypes: any;
	expenseTypesHeaders: any = [
		'tableHeader.expenseType.expenseTypeName',
		'tableHeader.expenseType.expenseTypeDescription',
    'tableHeader.expenseType.status'
	];

	constructor(
		private _cdr: ChangeDetectorRef,
		private expenseTypesService: ExpenseTypesService,
		private router: Router,
    private commonService:CommonService
	) {}

	ngOnInit(): void {
    this.commonService.loading.next(true)
		this.expenseTypesService.getExpenseTypes();
		this.expenseTypesService.expenseTypes.subscribe((data) => {
			this.expenseTypes = data;
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
    this.commonService.loading.next(true)
		this.expenseTypesService.deleteExpenseType(event.id).subscribe(() => {
			this.expenseTypesService.getExpenseTypes();
      this.commonService.loading.next(false)
		});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/expense-type/action/edit/${event.id}`);
	};
}
