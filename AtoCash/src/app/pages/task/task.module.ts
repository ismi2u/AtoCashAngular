import { AntdModule } from './../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { TaskListComponent } from './task-list/task-list.component';

import { TaskFormComponent } from './task-form/task-form.component';


@NgModule({
  declarations: [TaskComponent, TaskListComponent,  TaskFormComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
 
  ]
})
export class TaskModule { }
