import { Injectable } from '@angular/core';
import {
	Router,
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';

import jwt from 'jwt-decode';
import cookies from 'js-cookie';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private router: Router,
		private commonService: CommonService,
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const user = this.commonService.getUser();
		const currentTime = new Date().getTime();
		if (user && currentTime > (jwt(user.token) as any).exp * 1000) {
			cookies.remove('user');
			this.router.createUrlTree(['login']);
		}
		if (user && !(currentTime > (jwt(user.token) as any).exp * 1000)) {
			return true;
		}
		return this.router.createUrlTree(['login']);
	}
}
