import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalStatusComponent } from './approval-status.component';

import { ApprovalStatusListComponent } from './approval-status-list/approval-status-list.component';
import { ApprovalStatusFormComponent } from './approval-status-form/approval-status-form.component';

const routes: Routes = [{
  path: '', component: ApprovalStatusComponent,
  children: [
    {
      path: 'list',
      component: ApprovalStatusListComponent,
    }, 
    {
      path: 'action/:type',
      component: ApprovalStatusFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: ApprovalStatusFormComponent,
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalStatusRoutingModule { }
