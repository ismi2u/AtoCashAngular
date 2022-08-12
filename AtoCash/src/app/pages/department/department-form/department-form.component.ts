import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CostService } from 'src/app/services/cost.service';
import { DepartmentService } from 'src/app/services/department.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
	selector: 'app-department-form',
	templateUrl: './department-form.component.html',
	styleUrls: ['./department-form.component.scss'],
})
export class DepartmentFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'add';
	costCenterList = [];
	status = [];

	submitForm(): void {
		this.commonService.loading.next(true);
		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}

		if (this.mode === 'edit') {
			this.service
				.updateDepartmentById(this.recordId, {
					...this.form.value,
					id: this.recordId,
				})
				.subscribe(() => {
					this.router.navigateByUrl(`/department/list`);
				});
		} else {
			this.service.addDepartment(this.form.value).subscribe(() => {
				this.router.navigateByUrl(`/department/list`);
			});
		}
	}

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private service: DepartmentService,
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
	ngOnInit(): void {
		this.statusService.getStatusList().subscribe((response: any) => {
			this.status = response.data;
		});
		this.snapshot.params.subscribe((param) => {
			if (param.type === 'edit') {
				this.mode = param.type;
				this.service.getDepartmentById(param.id).subscribe((response: any) => {
					this.recordId = param.id;
					delete response.data.id;
					delete response.data.statusType;
					delete response.data.costCenter;
					this.form.setValue(response.data);
					if (this.mode === 'edit') this.form.controls['deptCode'].disable();
					this.commonService.loading.next(false);
				});
			} else {
				this.commonService.loading.next(false);
			}
		});

		this.costCenterService.getCostCenterList().subscribe((response: any) => {
			this.costCenterList = response.data;
		});

		this.form = this.fb.group({
			deptCode: [null, [Validators.required]],
			deptName: [null, [Validators.required]],
			costCenterId: [null, [Validators.required]],
			statusTypeId: [null, [Validators.required]],
		});
	}
}
