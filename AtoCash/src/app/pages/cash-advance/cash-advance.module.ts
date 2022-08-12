import { AntdModule } from '../../components/antd.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CashAdvanceRoutingModule } from './cash-advance-routing.module';
import { CashAdvanceComponent } from './cash-advance.component';
import { CashAdvanceListComponent } from './cash-advance-list/cash-advance-list.component';
import { CashAdvanceFormComponent } from './cash-advance-form/cash-advance-form.component';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  declarations: [CashAdvanceComponent, CashAdvanceListComponent, CashAdvanceFormComponent],
  imports: [
    CommonModule,
    CashAdvanceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AntdModule
  ]
})
export class CashAdvanceModule { }
