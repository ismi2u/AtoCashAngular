import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonService } from 'src/app/services/common.service';

@Component({
	selector: 'app-inbox-alert',
	templateUrl: './inbox-alert.component.html',
	styleUrls: ['./inbox-alert.component.scss'],
})
export class InboxAlertComponent implements OnInit {
	form!: FormGroup;
	@Input() data;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private commonService: CommonService,
		private modal: NzModalRef,
	) {}

	ngOnInit(): void {
		this.form = this.fb.group({
			comments: [null, [Validators.required]],
		});
	}

	closeModal(action) {
		this.modal.close({
			data: this.data === 'Approve' ? null : this.form.value,
			action
		});
	}
}
