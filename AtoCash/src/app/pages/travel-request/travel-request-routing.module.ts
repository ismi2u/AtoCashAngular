import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelRequestComponent } from './travel-request.component';

import { TravelRequestListComponent } from './travel-request-list/travel-request-list.component';
import { TravelRequestFormComponent } from './travel-request-form/travel-request-form.component';

const routes: Routes = [{
  path: '', component: TravelRequestComponent,
  children: [
    {
      path: 'list',
      component: TravelRequestListComponent,
    },
    {
      path: 'action/:type',
      component: TravelRequestFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: TravelRequestFormComponent,
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelRequestRoutingModule { }
