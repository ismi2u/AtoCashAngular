import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApprovalLevelsService } from 'src/app/services/approval-levels.service';

@Component({
	selector: 'app-approval-level-form',
	templateUrl: './approval-level-form.component.html',
	styleUrls: ['./approval-level-form.component.scss'],
})
export class ApprovalLevelFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'add';

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private approvalLevelService: ApprovalLevelsService,
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
			this.approvalLevelService
				.updateApprovalLevelById(this.recordId, {
					...this.form.value,
					id: this.recordId,
				})
				.subscribe(() => {
					this.router.navigateByUrl(`/approval-level/list`);
				});

		} else {
			this.approvalLevelService
				.addApprovalLevel(this.form.value)
				.subscribe(() => {
					this.router.navigateByUrl(`/approval-level/list`);
				});
		}
	}

	ngOnInit(): void {
		this.snapshot.params.subscribe((param) => {
			if (param.type === 'edit') {
				this.mode = param.type;
				this.approvalLevelService
					.getApprovalLevelById(param.id)
					.subscribe((response: any) => {
						this.recordId = param.id;
						delete response.data.id;
						this.form.setValue(response.data);
						if (this.mode === 'edit') this.form.controls['level'].disable();
            this.commonService.loading.next(false);
					});
			}else {
        this.commonService.loading.next(false);
      }
		});
		this.form = this.fb.group({
			level: [null, [Validators.required]],
			levelDesc: [null, [Validators.required]],
		});
	}
}
