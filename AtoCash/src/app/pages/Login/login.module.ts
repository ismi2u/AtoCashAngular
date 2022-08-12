import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AntdModule } from './../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';
import { LoginComponent } from './login.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
 LoginRoutingModule,
 ReactiveFormsModule,
    SharedModule,
    AntdModule,
 
  ]
})
export class LoginModule { }
