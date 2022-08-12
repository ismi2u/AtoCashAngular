import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';

import { ReportsListComponent } from './reports-list/reports-list.component';

const routes: Routes = [{
  path: '', component: ReportsComponent,
  children: [
    {
      path: 'list',
      component: ReportsListComponent,
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
