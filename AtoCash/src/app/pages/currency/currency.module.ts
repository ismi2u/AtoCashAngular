import { AntdModule } from '../../components/antd.module';
import { SharedModule } from '../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyComponent } from './currency.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CurrencyFormComponent } from './currency-form/currency-form.component';

@NgModule({
  declarations: [CurrencyComponent, CurrencyListComponent, CurrencyFormComponent],
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class CurrencyModule { }
