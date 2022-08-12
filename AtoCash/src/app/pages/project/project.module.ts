import { SharedModule } from 'src/app/components/shared.module';
import { AntdModule } from './../../components/antd.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list/project-list.component';

import { ProjectFormComponent } from './project-form/project-form.component';


@NgModule({
  declarations: [ProjectComponent, ProjectListComponent, ProjectFormComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class ProjectModule { }
