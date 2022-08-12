import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthDeactivateGuard implements CanActivate {
  constructor(private authService: AuthService, private router:Router, private commonService: CommonService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.commonService.getUser();
      if (currentUser == null) {
          return true
      }
      return this.router.createUrlTree(['dashboard'])
  }
  
}
