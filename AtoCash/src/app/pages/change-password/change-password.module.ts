import { ActivatedRouteSnapshot } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AntdModule } from '../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';
import { ChangePasswordComponent } from './change-password.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordRoutingModule } from './change-password-routing.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
	declarations: [ChangePasswordComponent],
	imports: [
		CommonModule,
		ForgetPasswordRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		AntdModule,
	],
})
export class ChangePasswordModule {}
