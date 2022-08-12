import { AntdModule } from './../../components/antd.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApprovalLevelRoutingModule } from './approval-level-routing.module';
import { ApprovalLevelComponent } from './approval-level.component';
import { ApprovalLevelListComponent } from './approval-level-list/approval-level-list.component';
import { ApprovalLevelFormComponent } from './approval-level-form/approval-level-form.component';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  declarations: [ApprovalLevelComponent, ApprovalLevelListComponent, ApprovalLevelFormComponent],
  imports: [
    CommonModule,
    ApprovalLevelRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class ApprovalLevelModule { }
