import { TranslateService } from '@ngx-translate/core';
import { UserRolesService } from './../../../services/user-roles.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubProjectsService } from 'src/app/services/sub-projects.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
	selector: 'app-task-form',
	templateUrl: './user-role-form.component.html',
	styleUrls: ['./user-role-form.component.scss'],
})
export class UserRoleFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode = 'add';

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private userRolesService: UserRolesService,
		private router: Router,
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
			this.userRolesService
				.updateUserRole({ ...this.form.value, id: this.recordId })
				.subscribe(() => {
					this.router.navigateByUrl(`/user-role/list`);
				});
		} else {
			this.userRolesService.addUserRole(this.form.value).subscribe(() => {
				this.router.navigateByUrl(`/user-role/list`);
			});
		}
	}

	ngOnInit(): void {
		this.snapshot.params.subscribe((param) => {
			if (param.type === 'edit') {
				this.mode = param.type;
				this.userRolesService
					.getUserRoleById(param.id)
					.subscribe((response: any) => {
						this.recordId = param.id;
						const formData = { roleName: response.data.name };
						this.form.setValue(formData);
					});
			}
		});
		this.form = this.fb.group({
			roleName: [null, [Validators.required]],
		});
	}
}
