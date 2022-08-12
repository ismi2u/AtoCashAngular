import { AssignProjectComponent } from './assign-project.component';
import { AntdModule } from '../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignRoleRoutingModule } from './assign-project-routing.module';




@NgModule({
  declarations: [  AssignProjectComponent],
  imports: [
    CommonModule,
    AssignRoleRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule,
    FormsModule
 
  ]
})
export class AssignProjectModule { }
