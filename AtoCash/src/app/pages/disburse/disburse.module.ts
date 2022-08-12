import { AntdModule } from '../../components/antd.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CashAdvanceRoutingModule } from './disburse-routing.module';
import { DisburseComponent } from './disburse.component';
import { DisburseListComponent } from './disburse-list/disburse-list.component';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  declarations: [DisburseComponent, DisburseListComponent, ],
  imports: [
    CommonModule,
    CashAdvanceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AntdModule
  ]
})
export class DisburseModule { }
