import { TasksService } from './../../../services/tasks.service';
import { ProjectsService } from './../../../services/projects.service';
import { CashRequestService } from './../../../services/cash-request.service';
import { CommonService } from './../../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApprovalLevelsService } from 'src/app/services/approval-levels.service';
import { DepartmentService } from 'src/app/services/department.service';
import { SubProjectsService } from 'src/app/services/sub-projects.service';
import { TranslateService } from '@ngx-translate/core';
import { StatusService } from 'src/app/services/status.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { CostService } from 'src/app/services/cost.service';

@Component({
	selector: 'app-approval-level-form',
	templateUrl: './cash-advance-form.component.html',
	styleUrls: ['./cash-advance-form.component.scss'],
})
export class CashAdvanceFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'add';

	departments = [];
	projects = [];
	subProjects = [];
	tasks = [];
	enableProject = false;
	empId = this.commonService.getUser().empId;
	currencies = [];
	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private cashRequestService: CashRequestService,
		private departmentService: DepartmentService,
		private projectService: ProjectsService,
		private subProjectService: SubProjectsService,
		private taskService: TasksService,
		private router: Router,
		private commonService: CommonService,
		private translate: TranslateService,
		private currencyService: CurrencyService,
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
			this.cashRequestService
				.updateCashRequestById(this.recordId, {
					...this.form.value,
					id: this.recordId,
				})
				.subscribe(
					() => {
						this.commonService.loading.next(false);
						this.router.navigateByUrl(`/cash-advance/list`);
					},
					(err) => console.log(err),
				);
		} else {
			this.cashRequestService
				.addCashRequest({
					...this.form.value,
					currencyTypeId: this.form.controls['currencyTypeId'].value,
				})
				.subscribe(
					() => {
						this.commonService.loading.next(false);
						this.router.navigateByUrl(`/cash-advance/list`);
					},
					(err) => void this.commonService.loading.next(false),
				);
		}
	}

	ngOnInit(): void {
		this.currencyService.getCurrencyList().subscribe((response: any) => {
			this.currencies = response.data;
		});
		this.departmentService.getDepartmentList().subscribe((response: any) => {
			this.departments = response.data;
		});

		this.taskService.getTasksList().subscribe((response: any) => {
			this.tasks = response.data;
		});

		this.form = this.fb.group({
			employeeId: [this.commonService.getUser().empId, [Validators.required]],
			pettyClaimAmount: [0, [Validators.required]],
			pettyClaimRequestDesc: [null, [Validators.required]],
			currencyTypeId: [
				this.commonService.getUser().currencyId,
				[Validators.required],
			],
			projectId: [null, [Validators.nullValidator]],
			subProjectId: [null, [Validators.nullValidator]],
			workTaskId: [null, [Validators.nullValidator]],
		});
		this.form.controls['currencyTypeId'].disable();

		this.snapshot.params.subscribe((param) => {
			if (param.type === 'edit') {
				this.recordId = param.id;
				this.mode = param.type;
				this.cashRequestService
					.geCashRequestById(param.id)
					.subscribe((response: any) => {
						let formData: any = {
							pettyClaimAmount: response.data.pettyClaimAmount,
							pettyClaimRequestDesc: response.data.pettyClaimRequestDesc,
							employeeId: response.data.employeeId,
							projectId: response.data.projectId,
							subProjectId: response.data.subProjectId,
							workTaskId: response.data.workTaskId,
							currencyTypeId: response.data.currencyTypeId,
						};

						if (response.data.projectId) {
							this.enableProject = true;
							this.projectService
								.getProjectListByEmpId()
								.subscribe((projects: any) => {
									this.projects = projects.data;
									this.selectProject(response.data.projectId);
								});
						}
						this.form.setValue(formData);
					});
			}
		});
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
		if (event) {
			this.taskService
				.getSTaskListBySubProject(event)
				.subscribe((response: any) => {
					this.tasks = response.data;
				});
		}
	};

	refreshForm = (event) => {
		if (event) {
			this.projectService.getProjectListByEmpId().subscribe((response: any) => {
				this.projects = response.data;
			});
		}

		if (!event) {
			this.form.controls['projectId'].reset();
			this.form.controls['subProjectId'].reset();
			this.form.controls['workTaskId'].reset();
		}
	};
}
