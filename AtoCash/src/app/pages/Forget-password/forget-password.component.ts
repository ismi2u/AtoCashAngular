import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-task',
	templateUrl: './forget-password.component.html',
	styleUrls: ['./forget-password.component.scss'],
})
export class LoginComponent implements OnInit {
	form!: FormGroup;
	showPassword = false;
	passwordChangeRequested = false;
	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private commonService: CommonService,
		private translateService: TranslateService,
		private router: Router,
	) {}

	submitForm(): void {
		this.commonService.unauthorizedLoading.next(true);
		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}

		this.authService.forgetPassword(this.form.value).subscribe(
			(data) => {
				this.passwordChangeRequested = true;
				this.commonService.unauthorizedLoading.next(false);
			},
			(err) => {
				this.commonService.unauthorizedLoading.next(false);
			},
		);
	}

	ngOnInit(): void {
		this.translateService.addLangs(['en', 'ar']);
		this.translateService.setDefaultLang('en');
		this.commonService.currentLanguage.next('en');
		this.commonService.currentLanguage.subscribe((data) => {
			this.translateService.use(data);
			this.translateService.get('home.title').subscribe((data) => {});
		});

		// localStorage.clear()
		this.form = this.fb.group({
			email: [null, [Validators.required]],
		});
	}
}
