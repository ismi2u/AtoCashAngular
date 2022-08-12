import { CommonService } from 'src/app/services/common.service';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(private commonService: CommonService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     let userRoles = this.commonService.getUserRole();
       
        if(_.intersection(userRoles,route.data.allowedRoles).length !== 0) {
             return true;
        }
       
       return userRoles.includes('AtominosAdmin') ? this.router.createUrlTree(['cost-center']) : this.router.createUrlTree(['dashboard']);
    }
}
