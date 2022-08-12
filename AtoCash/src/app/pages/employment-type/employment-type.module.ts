import { SharedModule } from 'src/app/components/shared.module';
import { AntdModule } from './../../components/antd.module';
import { EmploymentTypeFormComponent } from './employment-type-form/employment-type-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmploymentTypeRoutingModule } from './employment-type-routing.module';
import { EmploymentTypeComponent } from './employment-type.component';
import { EmploymentTypeListComponent } from './employment-type-list/employment-type-list.component';


@NgModule({
    declarations: [EmploymentTypeFormComponent,EmploymentTypeComponent, EmploymentTypeListComponent],
    imports: [
        CommonModule,
        EmploymentTypeRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        AntdModule
    ]
})
export class EmploymentTypeModule { }
