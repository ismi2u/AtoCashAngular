import { CommonService } from 'src/app/services/common.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CostService } from 'src/app/services/cost.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
	selector: 'app-project-form',
	templateUrl: './project-form.component.html',
	styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'add';
	costCenterList = [];
	employees = [];
	status = [];

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private projectService: ProjectsService,
		private employeeService: EmployeeService,
		private router: Router,
		private costCenterService: CostService,
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
			this.projectService
				.updateProjectById(this.recordId, {
					...this.form.value,
					id: this.recordId,
				})
				.subscribe(() => {
					this.router.navigateByUrl(`/project/list`);
				});
		} else {
			this.projectService.addProject(this.form.value).subscribe(() => {
				this.router.navigateByUrl(`/project/list`);
			});
		}
	}

	ngOnInit(): void {
		this.statusService.getStatusList().subscribe((response: any) => {
			this.status = response.data;
		});
		this.costCenterService.getCostCenterList().subscribe((response: any) => {
			this.costCenterList = response.data;
		});

		this.employeeService.getEmployeeList().subscribe((response: any) => {
			this.employees = response.data;
		});

		this.snapshot.params.subscribe((param) => {
			if (param.type === 'edit') {
				this.mode = param.type;
				this.projectService
					.getProjectById(param.id)
					.subscribe((response: any) => {
						this.recordId = param.id;
						const formData = {
							projectName: response.data.projectName,
							costCenterId: response.data.costCenterId,
							projectDesc: response.data.projectDesc,
							projectManagerId: response.data.projectManagerId,
							statusTypeId: response.data.statusTypeId,
						};
						this.form.setValue(formData);
						this.commonService.loading.next(false);
					});
			} else {
				this.commonService.loading.next(false);
			}
		});
		this.form = this.fb.group({
			projectName: [null, [Validators.required]],
			costCenterId: [null, [Validators.required]],
			projectDesc: [null, [Validators.required]],
			projectManagerId: [null, [Validators.required]],
			statusTypeId: [null, [Validators.required]],
		});
	}
}
