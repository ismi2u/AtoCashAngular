import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApprovalLevelsService } from 'src/app/services/approval-levels.service';
import { CommonService } from 'src/app/services/common.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { DepartmentService } from 'src/app/services/department.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { SubProjectsService } from 'src/app/services/sub-projects.service';
import { TasksService } from 'src/app/services/tasks.service';
import { TravelRequestService } from 'src/app/services/travel-request.service';

@Component({
	selector: 'app-approval-level-form',
	templateUrl: './travel-request-form.component.html',
	styleUrls: ['./travel-request-form.component.scss'],
})
export class TravelRequestFormComponent implements OnInit {
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
		private travelRequestService: TravelRequestService,
		private departmentService: DepartmentService,
		private projectService: ProjectsService,
		private subProjectService: SubProjectsService,
		private taskService: TasksService,
		private router: Router,
		private commonService: CommonService,
		private translate: TranslateService,
		private currencyService: CurrencyService,
		private _cdr: ChangeDetectorRef,
	) {}

	getButtonLabel = () => {
		return this.mode !== 'edit'
			? this.translate.instant('button.create')
			: this.translate.instant('button.update');
	};
	submitForm(): void {
		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}

		if (this.mode === 'edit') {
			this.travelRequestService
				.updateTravelRequestById(this.recordId, {
					...this.form.value,
					id: this.recordId,
					travelEndDate:new Date(this.form.controls['travelEndDate'].value),
				})
				.subscribe(()=>{
					this.router.navigateByUrl(`/travel-request/list`);
				});
		} else {
			this.travelRequestService
				.addTravelRequest({
					...this.form.value,
					travelEndDate:new Date(this.form.controls['travelEndDate'].value),
					
				})
				.subscribe(()=>{
					this.router.navigateByUrl(`/travel-request/list`);

				});
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

		this.snapshot.params.subscribe((param) => {
			if (param.type === 'edit') {
				this.mode = param.type;
				this.recordId = param.id;
				this.travelRequestService
					.getTravelRequestById(param.id)
					.subscribe((response: any) => {
						const formData = {
							employeeId: response.data.employeeId,
							travelStartDate: response.data.travelStartDate,
							travelEndDate: response.data.travelEndDate,
							travelPurpose: response.data.travelPurpose,
							projectId: response.data.projectId,
							subProjectId: response.data.subProjectId,
							workTaskId: response.data.workTaskId,
							currencyTypeId: response.data.currencyTypeId,
						};

						if (response.data.projectId) {
							this.enableProject = true;
							this.projectService
								.getProjectListByEmpId()
								.subscribe((response: any) => {
									this.projects = response.data;
								});
						}
						this.form.setValue(formData);
					});
			}
		});

		this.form = this.fb.group({
			employeeId: [this.commonService.getUser().empId, [Validators.required]],
			travelStartDate: [null, [Validators.required]],
			travelEndDate: [null, [Validators.required]],
			travelPurpose: [null, [Validators.required]],
			projectId: [null, [Validators.nullValidator]],
			subProjectId: [null, [Validators.nullValidator]],
			workTaskId: [null, [Validators.nullValidator]],
		});

		this.form.controls['travelEndDate'].disable();

		this.form.controls['travelStartDate'].valueChanges.subscribe((value) => {
			if (!this.form.controls['travelEndDate'].value) {
				this.form.controls['travelEndDate'].enable();
				const newDate = new Date(value).getTime() + 24 * 60 * 60 * 1000;
				this.form.controls['travelEndDate'].setValue(new Date(newDate));
			}
		});

		this.form.controls['travelEndDate'].valueChanges.subscribe();
	}

	selectProject = (event) => {
		if(event)
		this.subProjectService
			.getSubProjectListByProject(event)
			.subscribe((response: any) => {
				this.subProjects = response.data;
			});
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
		if (!event) {
			this.form.controls['projectId'].reset();
			this.form.controls['subProjectId'].reset();
			this.form.controls['workTaskId'].reset();
		}
	};

	disabledEndDate = (endValue: Date): boolean => {
		const date = new Date();

		if (this.form.controls['travelStartDate'].value) {
			const startDate = new Date(
				this.form.controls['travelStartDate'].value,
			).getTime();
			return (
				new Date(date).getTime() - 24 * 60 * 60 * 1000 >=
					new Date(endValue).getTime() ||
				startDate > new Date(endValue).getTime()
			);
		} else {
			return (
				new Date(date).getTime() - 24 * 60 * 60 * 1000 >=
				new Date(endValue).getTime()
			);
		}
	};

	disabledStartDate = (startValue: Date): boolean => {
		const date = new Date();
		return (
			new Date(date).getTime() - 24 * 60 * 60 * 1000 >=
			new Date(startValue).getTime()
		);
	};
}
