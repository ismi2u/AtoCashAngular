import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashAdvanceComponent } from './cash-advance.component';

import { CashAdvanceListComponent } from './cash-advance-list/cash-advance-list.component';
import { CashAdvanceFormComponent } from './cash-advance-form/cash-advance-form.component';

const routes: Routes = [{
  path: '', component: CashAdvanceComponent,
  children: [
    {
      path: 'list',
      component: CashAdvanceListComponent,
    },
    {
      path: 'action/:type',
      component: CashAdvanceFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: CashAdvanceFormComponent,
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashAdvanceRoutingModule { }
