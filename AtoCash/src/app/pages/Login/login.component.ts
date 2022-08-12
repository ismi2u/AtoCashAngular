import { CommonService } from './../../services/common.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-task',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	form!: FormGroup;
	showPassword = false;
	constructor(
		private router: Router,
		private fb: FormBuilder,
		private authService: AuthService,
		private commonService: CommonService,
		private translateService: TranslateService,
	) {}

	submitForm(): void {
		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}
		this.authService.login(this.form.value);
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
			password: [null, [Validators.required]],
			remember: [true],
		});
	}

	forgetPassword() {
		// this.authService.forgetPassword()
		this.router.navigateByUrl('/forget-password');
	}
}
