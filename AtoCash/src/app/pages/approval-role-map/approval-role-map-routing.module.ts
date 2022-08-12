import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalRoleMapComponent } from './approval-role-map.component';
import { ApprovalRoleMapListComponent } from './approval-role-map-list/approval-role-map-list.component';
import { ApprovalRoleMapFormComponent } from './approval-role-map-form/approval-role-map-form.component';

const routes: Routes = [{
  path: '', component: ApprovalRoleMapComponent,
  children: [
    {
      path: 'list',
      component: ApprovalRoleMapListComponent,
    }, 
    {
      path: 'action/:type',
      component: ApprovalRoleMapFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: ApprovalRoleMapFormComponent,
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalRoleMapRoutingModule { }
