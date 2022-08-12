import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseReimburseRequestComponent } from './expense-reimburse-request.component';

import { ExpenseReimburseRequestListComponent } from './expense-reimburse-list/expense-reimburse-request-list.component';
import { ExpenseReimburseRequestCreateComponent } from './expense-reimburse-create/expense-reimburse-request-create.component';

const routes: Routes = [
  {
    path: '',
    component: ExpenseReimburseRequestComponent,
    children: [
      {
        path: 'list',
        component: ExpenseReimburseRequestListComponent,
      },
      {
        path: 'action/:type',
        component: ExpenseReimburseRequestCreateComponent,
      },
      {
        path: 'action/:type/:id',
        component: ExpenseReimburseRequestCreateComponent,
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseReimburseRequestRoutingModule {}
