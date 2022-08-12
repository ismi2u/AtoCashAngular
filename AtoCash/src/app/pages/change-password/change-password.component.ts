import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
	form!: FormGroup;
	showPassword = false;
	email = '';
	token = '';
	success = false;
	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private commonService: CommonService,
		private translateService: TranslateService,
		private snapshot: ActivatedRoute,
		private router:Router
	) {}

	submitForm(): void {
		this.commonService.unauthorizedLoading.next(true);
		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}

		this.authService
			.resetPassword({
				token: this.token,
				email: this.email,
				password: this.form.get('password').value,
			})
			.subscribe(
				(data) => {
					this.commonService.unauthorizedLoading.next(false);
					this.success = true;
					this.router.navigateByUrl('/login')
				},
				(err) => {
					this.commonService.unauthorizedLoading.next(false);
				},
			);
	}

	async ngOnInit() {
		this.snapshot.queryParamMap.subscribe((data) => {
			this.token = data.get('token');
			this.email = data.get('email');
		});

		this.form = this.fb.group({
			password: [null, [Validators.required]],
		});
	}
}
