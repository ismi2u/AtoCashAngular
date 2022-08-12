import { CommonService } from 'src/app/services/common.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	FormControl,
	Validators,
} from '@angular/forms';

import * as moment from 'moment';
import {constant} from '../../constant/constant'

@Component({
	selector: 'app-disburse-form',
	templateUrl: './disburse-form.component.html',
	styleUrls: ['./disburse-form.component.scss'],
})
export class DisburseFormComponent implements OnInit {
	form!: FormGroup;
	formControls = []
	@Output() onFormSubmit = new EventEmitter();
	@Input() requestDetails = null;

	constructor(
		private formBuild: FormBuilder,
		private translate: TranslateService,
		private commonService: CommonService,
	) {}

	ngOnInit(): void {
		this.form = this.formBuild.group({});
        this.formControls = [...constant.DISBURSE.FORM]
		this.addFields();
	}

	addFields() {
		this.formControls.map((filter) => {
			this.form.addControl(filter.name, new FormControl(filter.defaultValue,[Validators.required]));
		});
	}

	onSubmit() {
		const formData = { ...this.requestDetails ,...this.form.value,settlementAccount: this.requestDetails.bankCardNo, settlementBankCard: this.requestDetails.bankAccount , isSettledAmountCredited:true };
		delete formData.bankCardNo;
		delete formData.bankAccount;

		this.onFormSubmit.emit(formData)
	}



}
