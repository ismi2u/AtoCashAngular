import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApprovalGroupsService } from 'src/app/services/approval-groups.service';
import { ApprovalLevelsService } from 'src/app/services/approval-levels.service';
import { ApprovalRoleMapsService } from 'src/app/services/approval-role-maps.service';
import { CostService } from 'src/app/services/cost.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
	selector: 'app-approval-role-map-form',
	templateUrl: './approval-role-map-form.component.html',
	styleUrls: ['./approval-role-map-form.component.scss'],
})
export class ApprovalRoleMapFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'add';
	roles = [];
	levels = [];
	groups = [];

	submitForm(): void {
		this.commonService.loading.next(true);
		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}

		if (this.mode === 'edit') {
			this.approvalRoleMapService
				.updateApprovalRoleMapById(this.recordId, {
					...this.form.value,
					id: this.recordId,
				})
				.subscribe(() => {
					this.router.navigateByUrl(`/approval-role-map/list`);
				});
		} else {
			this.approvalRoleMapService
				.addApprovalRoleMap(this.form.value)
				.subscribe(() => {
					this.router.navigateByUrl(`/approval-role-map/list`);
				});
		}
	}

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private approvalRoleMapService: ApprovalRoleMapsService,
		private approvalLevelService: ApprovalLevelsService,
		private approvalGroupService: ApprovalGroupsService,
		private rolesService: RolesService,
		private router: Router,
		private translate: TranslateService,
		private commonService: CommonService,
	) {}

	getButtonLabel = () => {
		return this.mode !== 'edit'
			? this.translate.instant('button.create')
			: this.translate.instant('button.update');
	};
	ngOnInit(): void {
		this.snapshot.params.subscribe((param) => {
			if (param.type === 'edit') {
				this.mode = param.type;
				this.approvalRoleMapService
					.getApprovalRoleMapById(param.id)
					.subscribe((response: any) => {
						this.recordId = param.id;
						const formData = {
							approvalGroupId: response.data.approvalGroupId,
							roleId: response.data.roleId,
							approvalLevelId: response.data.approvalLevelId,
						};
						this.form.setValue(formData);
            this.commonService.loading.next(false);
					});
			} else {
				this.commonService.loading.next(false);
			}
		});

		this.rolesService.getJobRoleList().subscribe((response: any) => {
			this.roles = response.data;
			this.approvalLevelService.getApprovalLevels();
		});

		this.approvalLevelService.approvalLevels.subscribe((data) => {
			this.levels = data;
		});

		this.approvalGroupService
			.getApprovalGroupsList()
			.subscribe((response: any) => {
				this.groups = response.data;
			});

		this.form = this.fb.group({
			approvalGroupId: [null, [Validators.required]],
			roleId: [null, [Validators.required]],
			approvalLevelId: [null, [Validators.required]],
		});
	}
}
