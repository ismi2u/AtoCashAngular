import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthDeactivateGuard } from './guards/auth-deactivate.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: '', canActivate: [AuthGuard], loadChildren: () => import('./pages/Layout/layout.module').then(m => m.LayoutModule) }, 
  { path: 'login',canActivate: [AuthDeactivateGuard],  loadChildren: () => import('./pages/Login/login.module').then(m => m.LoginModule) },
  { path: 'forget-password',canActivate: [AuthDeactivateGuard],  loadChildren: () => import('./pages/Forget-password/forget-password.module').then(m => m.ForgetPasswordModule) },
  { path: 'change-password',canActivate: [AuthDeactivateGuard],  loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordModule) },  
  { path: '**', redirectTo: '/login' }
];

// http://localhost:4200/change-password?token=CfDJ8IqIUuL4TKVBnhdcazDB+aZGv38+1tF0bZmTQtabi00l6NwNw38jhyyux+DWizy9cunDrI8bF8hUczxWDjQlDxvr6ya+eJEgytohmliDL9HWbrIvUFQNPmmZG+ydf2F7qFjNCEqYqXLU2GXsf+Ekp4IQ8Wy+3jecAcOTzdpHLJY1r9lL0M4DT+QB1uWAapiKhu3U1J1phE20mxxs+WhtY2ekMwLa8O9PHpVwzup&email=rsnk2013@gmail.com

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
