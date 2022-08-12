import { ExpenseTypesService } from 'src/app/services/expense-types.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ApprovalLevelsService } from 'src/app/services/approval-levels.service';
import { CommonService } from 'src/app/services/common.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { SubProjectsService } from 'src/app/services/sub-projects.service';
import { TasksService } from 'src/app/services/tasks.service';
import { ExpenseReimburseRequestService } from 'src/app/services/expense-reimburse-request.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { constant } from 'src/app/constant/constant';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
	selector: 'app-expense-reimburse-form',
	templateUrl: './expense-reimburse-request-init.component.html',
	styleUrls: ['./expense-reimburse-request-init.component.scss'],
})
export class ExpenseReimburseRequestInitComponent implements OnInit {
	form!: FormGroup;
	fileList: any = [];
	projects = [];
	subProjects = [];
	expenseType = [];
	tasks = [];
	enableProject = false;
	empId = this.commonService.getUser().empId;
	taxes = [...Array(31).keys()];
	currencies = [];
	@Input() data;

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private expenseReimburseService: ExpenseReimburseRequestService,
		private expenseTypeService: ExpenseTypesService,
		private projectService: ProjectsService,
		private subProjectService: SubProjectsService,
		private taskService: TasksService,
		private router: Router,
		private commonService: CommonService,
		private translate: TranslateService,
		private modal: NzModalRef,
		private currencyService: CurrencyService,
	) {}

	submitForm(): void {
		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}

		this.modal.close({
			data: {
				...this.form.value,
				employeeId: this.commonService.getUser().empId,
				currencyTypeId: this.form.controls['currencyTypeId'].value,
			},
		});
	}

	ngOnInit(): void {
		this.commonService.loading.next(true);
		this.currencyService.getCurrencyList().subscribe((response: any) => {
			this.currencies = response.data;
		});
		this.taskService.getTasksList().subscribe((response: any) => {
			this.tasks = response.data;
			this.commonService.loading.next(false);
		});
		this.form = this.fb.group({
			currencyTypeId: [this.commonService.getUser().currencyId],
			expenseReportTitle: ['Expense Reimburse', [Validators.required]],
			projectId: [null, [Validators.nullValidator]],
			subProjectId: [null, [Validators.nullValidator]],
			workTaskId: [null, [Validators.nullValidator]],
		});

		this.form.controls['currencyTypeId'].disable();
		this.form.controls['currencyTypeId'].setValue(this.commonService.getUser().currencyId)

		if (this.data) {
			delete this.data.employeeId;
			this.form.setValue(this.data);
			if (this.data.projectId) {
				this.enableProject = true;
				this.projectService
					.getProjectListByEmpId()
					.subscribe((response: any) => {
						this.projects = response.data;
					});

				this.selectProject(this.data.projectId);
			}

			if (this.data.subProjectId) {
				this.selectSubProject(this.data.subProjectId);
			}
		}


	}

	selectProject = (event) => {
		if (event) {
			this.subProjectService
				.getSubProjectListByProject(event)
				.subscribe((response: any) => {
					this.subProjects = response.data;
				});
		}
	};

	selectSubProject = (event) => {
		if(event)
		this.taskService
			.getSTaskListBySubProject(event)
			.subscribe((response: any) => {
				this.tasks = response.data;
			});
	};

	refreshForm = (event) => {
        if(event)
		this.projectService.getProjectListByEmpId().subscribe((response: any) => {
			this.projects = response.data;
		});

		if(!event){
		this.form.controls['projectId'].setValue(null);
		this.form.controls['subProjectId'].setValue(null);
		this.form.controls['workTaskId'].setValue(null);
		}
	};

	getModalButton(data) {
	return this.translate.instant(data ? 'button.update' : 'button.next')	
	}
}

