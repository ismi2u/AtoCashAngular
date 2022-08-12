import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApprovalStatusService } from 'src/app/services/approval-status.service';

@Component({
	selector: 'app-approval-status-form',
	templateUrl: './approval-status-form.component.html',
	styleUrls: ['./approval-status-form.component.scss'],
})
export class ApprovalStatusFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'Add';

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private approvalStatusService: ApprovalStatusService,
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
			this.approvalStatusService
				.updateApprovalStatusById(this.recordId, {
					...this.form.value,
					id: this.recordId,
				})
				.subscribe(() => {
					this.router.navigateByUrl(`/approval-status/list`);
				});
		} else {
			this.approvalStatusService
				.addApprovalStatus(this.form.value)
				.subscribe(() => {
					this.router.navigateByUrl(`/approval-status/list`);
				});
		}
	}

	ngOnInit(): void {
		this.snapshot.params.subscribe((param) => {
			if (param.type === 'edit') {
				this.mode = param.type;
				this.approvalStatusService
					.getApprovalStatusById(param.id)
					.subscribe((response: any) => {
						this.recordId = param.id;
						delete response.data.id;
						this.form.setValue(response.data);
						this.commonService.loading.next(false);
					});
			} else {
				this.commonService.loading.next(false);
			}
		});
		this.form = this.fb.group({
			status: [null, [Validators.required]],
			statusDesc: [null, [Validators.required]],
		});
	}
}
