import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalLevelComponent } from './approval-level.component';

import { ApprovalLevelListComponent } from './approval-level-list/approval-level-list.component';
import { ApprovalLevelFormComponent } from './approval-level-form/approval-level-form.component';

const routes: Routes = [{
  path: '', component: ApprovalLevelComponent,
  children: [
    {
      path: 'list',
      component: ApprovalLevelListComponent,
    },
    {
      path: 'action/:type',
      component: ApprovalLevelFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: ApprovalLevelFormComponent,
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalLevelRoutingModule { }
