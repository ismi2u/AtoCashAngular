import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusComponent } from './status.component';

import { StatusListComponent } from './status-list/status-list.component';
import { StatusFormComponent } from './status-form/status-form.component';

const routes: Routes = [{
  path: '', component: StatusComponent,
  children: [
    {
      path: 'list',
      component: StatusListComponent,
    }, 
    {
      path: 'action/:type',
      component: StatusFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: StatusFormComponent,
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusRoutingModule { }
