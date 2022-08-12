import { AntdModule } from './../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentRoutingModule } from './department-routing.module';

import { DepartmentComponent } from './department.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentFormComponent } from './department-form/department-form.component';


@NgModule({
  declarations: [DepartmentComponent, DepartmentListComponent, DepartmentFormComponent],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class DepartmentModule { }
