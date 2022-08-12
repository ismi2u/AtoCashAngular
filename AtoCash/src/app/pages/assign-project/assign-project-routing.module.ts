import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignProjectComponent } from './assign-project.component';

const routes: Routes = [{
  path: '', component: AssignProjectComponent,
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignRoleRoutingModule {}
