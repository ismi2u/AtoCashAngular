import { AntdModule } from './../../components/antd.module';
import { SharedModule } from './../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CostCenterRoutingModule } from './cost-center-routing.module';
import { CostCenterComponent } from './cost-center.component';
import { CostCenterListComponent } from './cost-center-list/cost-center-list.component';

import { CostCenterFormComponent } from './cost-center-form/cost-center-form.component';

@NgModule({
  declarations: [
    CostCenterComponent,
    CostCenterListComponent,
    CostCenterFormComponent,
    
  ],
  imports: [
    CommonModule,
    CostCenterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AntdModule
  ]
})
export class CostCenterModule {}
