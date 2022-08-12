import { CostCenterFormComponent } from './cost-center-form/cost-center-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CostCenterComponent } from './cost-center.component';
import { CostCenterListComponent } from './cost-center-list/cost-center-list.component';


const routes: Routes = [{
  path: '', component: CostCenterComponent,
  children: [
    {
      path: 'list',
      component: CostCenterListComponent,
    },
    {
      path: 'action/:type',
      component: CostCenterFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: CostCenterFormComponent,
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostCenterRoutingModule { }
