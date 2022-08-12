import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
import cookie from 'js-cookie';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	currentUser = new BehaviorSubject({});
	emailToChangePwd = '';

	constructor(
		private http: HttpClient,
		private router: Router,
		private commonService: CommonService,
	) {}

	login = (data: any) => {
		const { email } = data;
		let domain = email.split('@')[1];
		domain =  environment.baseUrl.includes('localhost') ? 'http://' : `https://${domain.split('.')[0]}.`;
		return this.http
			.post(
				`${`${domain}${environment.baseUrl}`}/api/Account/Login`,data,)
			.subscribe(
				(response: any) => {
					if (
						!response.success ||
						(response.data && !response.data.role.length)
					) {
						response.data && !response.data.role.length
							? this.commonService.createNotification('error', 'Unautorized')
							: null;
					} else {
						if (response && response.data) {
							cookie.set('user', JSON.stringify(response.data));
							cookie.set('api',`${domain}${environment.baseUrl}`,);
							this.router.navigateByUrl('/dashboard');
							this.currentUser.next(response);
							this.commonService.getPermission();
						}
					}
				},
				(err) => {},
			);
	};

	logout = () => {
		cookie.remove('user');
		this.router.navigateByUrl('/login');
		this.commonService.resetAccess();
	};

	forgetPassword = (data) =>
		this.http.post(
			`${this.commonService.getApi()}/api/Account/ForgotPassword`,
			data,
		);

	resetPassword = (data) => {
		return this.http.post(
			`${this.commonService.getApi()}/api/Account/ResetPassword`,
			data,
		);
	};
}
