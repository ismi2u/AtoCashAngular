import { UserRoleListComponent } from './user-role-list/user-role-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleComponent } from './user-role.component';
import { UserRoleFormComponent } from './user-role-form/user-role-form.component';




const routes: Routes = [{
  path: '', component: UserRoleComponent,
  children: [
    {
      path: 'list',
      component: UserRoleListComponent,
    }, {
      path: 'action/:type',
      component: UserRoleFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: UserRoleFormComponent,
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },


  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
