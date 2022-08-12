import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CostService } from 'src/app/services/cost.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
	selector: 'app-cost-center-form',
	templateUrl: './cost-center-form.component.html',
	styleUrls: ['./cost-center-form.component.scss'],
})
export class CostCenterFormComponent implements OnInit {
	costCenterForm!: FormGroup;
	recordId: any;
	mode: any = 'add';
	status = [];
	submitForm(): void {
		this.commonService.loading.next(true)
		for (const i in this.costCenterForm.controls) {
			this.costCenterForm.controls[i].markAsDirty();
			this.costCenterForm.controls[i].updateValueAndValidity();
		}

		if (this.mode === 'edit') {
			this.costCenterService
				.updateCostCenterById(this.recordId, {
					...this.costCenterForm.value,
					id: this.recordId,
				})
				.subscribe(() => {
					this.router.navigateByUrl(`/cost-center/list`);
				});
		} else {
			this.costCenterService
				.addCostCenter(this.costCenterForm.value)
				.subscribe(() => {
					this.router.navigateByUrl(`/cost-center/list`);
				});
		}

	}

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private costCenterService: CostService,
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
	ngOnInit(): void {
		this.statusService.getStatusList().subscribe((response: any) => {
			this.status = response.data;
		});
		this.snapshot.params.subscribe((param) => {
			if (param.type === 'edit') {
				this.mode = param.type;
				this.costCenterService
					.getCostCenterById(param.id)
					.subscribe((response: any) => {
						this.recordId = param.id;
						delete response.data.id;
						delete response.data.statusType;
						this.costCenterForm.setValue(response.data);
						if (this.mode === 'edit')
							this.costCenterForm.controls['costCenterCode'].disable();
						this.commonService.loading.next(false);
					});
			}else{
				this.commonService.loading.next(false)

			}
		});
		this.costCenterForm = this.fb.group({
			costCenterCode: [, [Validators.required]],
			costCenterDesc: [null, [Validators.required]],
			statusTypeId: [null, [Validators.required]],
		});
	}
}
