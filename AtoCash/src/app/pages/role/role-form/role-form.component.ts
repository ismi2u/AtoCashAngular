import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CostService } from 'src/app/services/cost.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
	selector: 'app-role-form',
	templateUrl: './role-form.component.html',
	styleUrls: ['./role-form.component.scss'],
})
export class RoleFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'add';
	costCenterList = [];

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private roleService: RolesService,
		private router: Router,
		private costCenterService: CostService,
		private translate: TranslateService,
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
			this.roleService
				.updateJobRoleById(this.recordId, {
					...this.form.value,
					id: this.recordId,
				})
				.subscribe(() => {
					this.router.navigateByUrl(`/role/list`);

				});
		} else {
			this.roleService.addJobRole(this.form.value).subscribe(() => {
				this.router.navigateByUrl(`/role/list`);

			});
		}

	}

	ngOnInit(): void {
		this.costCenterService.getCostCenterList().subscribe((response: any) => {
			this.costCenterList = response.data;
		});

		this.snapshot.params.subscribe((param) => {
			if (param.type === 'edit') {
				this.mode = param.type;
				this.roleService.getJobRoleById(param.id).subscribe((response: any) => {
					this.recordId = param.id;
					delete response.data.id;
					this.form.setValue(response.data);
					if (this.mode === 'edit') this.form.controls['roleCode'].disable();
				});
			}
		});
		this.form = this.fb.group({
			roleCode: [null, [Validators.required]],
			roleName: [null, [Validators.required]],
			maxPettyCashAllowed: [null, [Validators.required]],
		});
	}
}
