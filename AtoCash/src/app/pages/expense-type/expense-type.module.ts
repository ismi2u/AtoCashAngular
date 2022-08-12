import { AntdModule } from './../../components/antd.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseTypeRoutingModule } from './expense-type-routing.module';
import { ExpenseTypeComponent } from './expense-type.component';
import { ExpenseTypeListComponent } from './expense-type-list/expense-type-list.component';
import { ExpenseTypeFormComponent } from './expense-type-form/expense-type-form.component';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  declarations: [ExpenseTypeComponent, ExpenseTypeListComponent, ExpenseTypeFormComponent],
  imports: [
    CommonModule,
    ExpenseTypeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class ExpenseTypeModule { }
