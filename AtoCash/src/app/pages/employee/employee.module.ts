import { SharedModule } from 'src/app/components/shared.module';
import { AntdModule } from './../../components/antd.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';


@NgModule({
  declarations: [EmployeeComponent,  EmployeeListComponent, EmployeeFormComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class EmployeeModule { }
