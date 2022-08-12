import { AntdModule } from '../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskRoutingModule } from './user-role-routing.module';
import { UserRoleFormComponent } from './user-role-form/user-role-form.component';
import { UserRoleListComponent } from './user-role-list/user-role-list.component';
import { UserRoleComponent } from './user-role.component';



@NgModule({
  declarations: [UserRoleComponent, UserRoleListComponent,  UserRoleFormComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
 
  ]
})
export class UserRoleModule { }
