import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApprovalGroupsService } from 'src/app/services/approval-groups.service';

@Component({
	selector: 'app-approval-group-form',
	templateUrl: './approval-group-form.component.html',
	styleUrls: ['./approval-group-form.component.scss'],
})
export class ApprovalGroupFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'add';

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private approvalGroupService: ApprovalGroupsService,
		private router: Router,
		private translate: TranslateService,
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
			this.approvalGroupService
				.updateApprovalGroupById(this.recordId, {
					...this.form.value,
					id: Number(this.recordId),
				})
				.subscribe(() => {
					this.router.navigateByUrl(`/approval-group/list`);
				});
		} else {
			this.approvalGroupService
				.addApprovalGroup(this.form.value)
				.subscribe(() => {
					this.router.navigateByUrl(`/approval-group/list`);
				});
		}
	}

	ngOnInit(): void {
		this.snapshot.params.subscribe((param) => {
			if (param.type === 'edit') {
				this.mode = param.type;
				this.approvalGroupService
					.getApprovalGroupById(param.id)
					.subscribe((response: any) => {
						this.recordId = param.id;
						delete response.data.id;
						this.form.setValue(response.data);
						if (this.mode === 'edit')
							this.form.controls['approvalGroupCode'].disable();
						this.commonService.loading.next(false);
					});
			} else {
				this.commonService.loading.next(false);
			}
		});
		this.form = this.fb.group({
			approvalGroupCode: [null, [Validators.required]],
			approvalGroupDesc: [null, [Validators.required]],
		});
	}
}
