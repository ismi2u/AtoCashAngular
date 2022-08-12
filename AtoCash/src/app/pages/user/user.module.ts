import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { AntdModule } from '../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form/user-form.component';



@NgModule({
  declarations: [UserComponent, UserFormComponent, UserListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
 
  ]
})
export class UserModule { }
