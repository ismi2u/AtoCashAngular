import { AntdModule } from '../../components/antd.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpenseReimburseRequestRoutingModule } from './expense-reimburse-request-routing.module';
import { ExpenseReimburseRequestComponent } from './expense-reimburse-request.component';
import { ExpenseReimburseRequestListComponent } from './expense-reimburse-list/expense-reimburse-request-list.component';
import { ExpenseReimburseRequestFormComponent } from './expense-reimburse-request-form/expense-reimburse-request-form.component';
import { SharedModule } from 'src/app/components/shared.module';
import { ExpenseReimburseRequestCreateComponent } from './expense-reimburse-create/expense-reimburse-request-create.component';
import { ExpenseReimburseRequestInitComponent } from './expense-reimburse-request-inti/expense-reimburse-request-init.component';
import { ExpenseReimburseRequestSummaryComponent } from './expense-reimburse-request-summary/expense-reimburse-request-summary.component';

@NgModule({
  declarations: [
    ExpenseReimburseRequestSummaryComponent,
    ExpenseReimburseRequestInitComponent,
    ExpenseReimburseRequestCreateComponent,
    ExpenseReimburseRequestComponent,
    ExpenseReimburseRequestListComponent,
    ExpenseReimburseRequestFormComponent,
  ],
  imports: [
    CommonModule,
    ExpenseReimburseRequestRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AntdModule,
  ],
})
export class ExpenseReimburseRequestModule {}
