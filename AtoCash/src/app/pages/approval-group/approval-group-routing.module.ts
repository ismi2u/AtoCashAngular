import { ApprovalGroupFormComponent } from './approval-group-form/approval-group-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalGroupComponent } from './approval-group.component';

import { ApprovalGroupListComponent } from './approval-group-list/approval-group-list.component';

const routes: Routes = [{
  path: '', component: ApprovalGroupComponent,
  children: [
    {
      path: 'list',
      component: ApprovalGroupListComponent,
    }, 
    {
      path: 'action/:type',
      component: ApprovalGroupFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: ApprovalGroupFormComponent,
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalGroupRoutingModule { }
