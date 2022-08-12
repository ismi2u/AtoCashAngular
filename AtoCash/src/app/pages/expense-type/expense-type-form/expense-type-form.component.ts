import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ExpenseTypesService } from 'src/app/services/expense-types.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
	selector: 'app-expense-type-form',
	templateUrl: './expense-type-form.component.html',
	styleUrls: ['./expense-type-form.component.scss'],
})
export class ExpenseTypeFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'add';
	status = [];

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private expenseTypeService: ExpenseTypesService,
		private router: Router,
		private translate: TranslateService,
		private statusService: StatusService,
		private commonService: CommonService,
	) {}

	getButtonLabel = () => {
		return this.mode !== 'edit'
			? this.translate.instant('button.create')
			: this.translate.instant('button.update');
	};
	submitForm(): void {
		this.commonService.loading.next(true);
		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}

		if (this.mode === 'edit') {
			this.expenseTypeService
				.updateExpenseTypeById(this.recordId, {
					...this.form.value,
					id: this.recordId,
				})
				.subscribe(() => {
					this.router.navigateByUrl(`/expense-type/list`);
				});
		} else {
			this.expenseTypeService.addExpenseType(this.form.value).subscribe(() => {
				this.router.navigateByUrl(`/expense-type/list`);
			});
		}
	}

	ngOnInit(): void {
		this.statusService.getStatusList().subscribe((response: any) => {
			this.status = response.data;
		});
		this.snapshot.params.subscribe((param) => {
			if (param.type === 'edit') {
				this.mode = param.type;
				this.expenseTypeService
					.getExpenseTypeById(param.id)
					.subscribe((response: any) => {
						this.recordId = param.id;
						delete response.data.id;
						delete response.data.statusType;
						this.form.setValue(response.data);
						this.commonService.loading.next(false);
					});
			} else {
				this.commonService.loading.next(false);
			}
		});
		this.form = this.fb.group({
			expenseTypeName: [null, [Validators.required]],
			expenseTypeDesc: [null, [Validators.required]],
			statusTypeId: [null, [Validators.required]],
		});
	}
}
