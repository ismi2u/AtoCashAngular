import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisburseComponent } from './disburse.component';

import { DisburseListComponent } from './disburse-list/disburse-list.component';

const routes: Routes = [{
  path: '', component: DisburseComponent,
  children: [
    {
      path: 'list',
      component: DisburseListComponent,
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashAdvanceRoutingModule { }
