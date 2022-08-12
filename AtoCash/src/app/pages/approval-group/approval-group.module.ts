import { AntdModule } from './../../components/antd.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ApprovalGroupRoutingModule } from './approval-group-routing.module';
import { ApprovalGroupComponent } from './approval-group.component';
import { ApprovalGroupListComponent } from './approval-group-list/approval-group-list.component';
import { ApprovalGroupFormComponent } from './approval-group-form/approval-group-form.component';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  declarations: [ApprovalGroupComponent, ApprovalGroupListComponent, ApprovalGroupFormComponent],
  imports: [
    CommonModule,
    ApprovalGroupRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule

  ]
})
export class ApprovalGroupModule { }
