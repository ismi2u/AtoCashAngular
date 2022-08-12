import { DashboardComponent } from './dashboard.component';
import { AntdModule } from '../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AssignRoleRoutingModule } from './dashboard-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';




@NgModule({
  declarations: [  DashboardComponent],
  imports: [
    CommonModule,
    AssignRoleRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule,
    HighchartsChartModule
 
  ]
})
export class DashboardModule { }
