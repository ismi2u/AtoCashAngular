import { AssignRoleComponent } from './assign-role.component';
import { AntdModule } from '../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AssignRoleRoutingModule } from './assign-role-routing.module';




@NgModule({
  declarations: [  AssignRoleComponent],
  imports: [
    CommonModule,
    AssignRoleRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
 
  ]
})
export class AssignRoleModule { }
