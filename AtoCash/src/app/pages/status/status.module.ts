import { AntdModule } from '../../components/antd.module';
import { SharedModule } from '../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StatusRoutingModule } from './status-routing.module';
import { StatusComponent } from './status.component';
import { StatusListComponent } from './status-list/status-list.component';
import { StatusFormComponent } from './status-form/status-form.component';

@NgModule({
  declarations: [StatusComponent, StatusListComponent, StatusFormComponent],
  imports: [
    CommonModule,
    StatusRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class StatusModule { }
