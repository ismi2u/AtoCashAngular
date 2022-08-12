import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { SharedModule } from 'src/app/components/shared.module';
import { AntdModule } from 'src/app/components/antd.module';

@NgModule({
  declarations: [ReportsComponent, ReportsListComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    AntdModule
  ]
})
export class ReportsModule { }
