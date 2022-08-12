import { ExpenseTypeFormComponent } from './expense-type-form/expense-type-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseTypeComponent } from './expense-type.component';

import { ExpenseTypeListComponent } from './expense-type-list/expense-type-list.component';

const routes: Routes = [{
  path: '', component: ExpenseTypeComponent,
  children: [
    {
      path: 'list',
      component: ExpenseTypeListComponent,
    },
    {
      path: 'action/:type',
      component: ExpenseTypeFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: ExpenseTypeFormComponent,
    },
    
    { path: '', redirectTo: 'list', pathMatch: 'full' },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseTypeRoutingModule { }
