import { AntdModule } from './../../components/antd.module';
import { SharedModule } from './../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApprovalStatusRoutingModule } from './approval-status-routing.module';
import { ApprovalStatusComponent } from './approval-status.component';
import { ApprovalStatusListComponent } from './approval-status-list/approval-status-list.component';
import { ApprovalStatusFormComponent } from './approval-status-form/approval-status-form.component';

@NgModule({
  declarations: [ApprovalStatusComponent, ApprovalStatusListComponent, ApprovalStatusFormComponent],
  imports: [
    CommonModule,
    ApprovalStatusRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class ApprovalStatusModule { }
