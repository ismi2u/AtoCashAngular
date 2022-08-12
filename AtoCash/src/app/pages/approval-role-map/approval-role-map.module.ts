import { AntdModule } from './../../components/antd.module';
import { SharedModule } from './../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApprovalRoleMapRoutingModule } from './approval-role-map-routing.module';
import { ApprovalRoleMapComponent } from './approval-role-map.component';
import { ApprovalRoleMapListComponent } from './approval-role-map-list/approval-role-map-list.component';
import { ApprovalRoleMapFormComponent } from './approval-role-map-form/approval-role-map-form.component';

@NgModule({
  declarations: [ApprovalRoleMapComponent, ApprovalRoleMapListComponent, ApprovalRoleMapFormComponent],
  imports: [
    CommonModule,
    ApprovalRoleMapRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class ApprovalRoleMapModule { }
