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

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
	access: any = {};
	form!: FormGroup;
	@Input() filters: any = [];
	@Output() onFilterChange = new EventEmitter();
	date = Date.now();
	@Input() requestType = 'cashAdvance';
	constructor(
		private formBuild: FormBuilder,
		private translate: TranslateService,
		private commonService: CommonService,
	) {}

	ngOnInit(): void {
		this.form = this.formBuild.group({});
		this.addFields();
		this.commonService.roles.subscribe((data) => {
			this.access = data;
		});
	}

	addFields() {
		this.filters.map((filter) => {
			this.form.addControl(filter.name, new FormControl(filter.defaultValue));
		});
	}

	onSliderChange(event, filter) {
		this.onFilterChange.emit({
			[filter.splitField[0]]: event[0],
			[filter.splitField[1]]: event[1],
		});
	}

	onDateChange(event, filter) {
		if (!event && this.form.get(filter.name).value) {
			this.onFilterChange.emit({
				[filter.name]: this.form.get(filter.name).value,
			});
		}
	}

	onSelectChange(event, controlName) {
		this.onFilterChange.emit({ [controlName]: event });
	}

	getOnlyIfCondition(filter) {
		return filter.onlyIf
			? filter.type == 'select' &&
					this.form.controls[filter.onlyIf] &&
					this.form.controls[filter.onlyIf].value !== 0
			: filter.type == 'select';
	}

	onTextChange(event, controlName) {
		this.onFilterChange.emit({ [controlName]: event });
	}

	canManage: any = () => !this.access.isUser;

	canOrganize: any = () => this.access.isAdmin || this.access.isFinance;

	checkRole = (role) => (role ? this[role]() : false);
}
