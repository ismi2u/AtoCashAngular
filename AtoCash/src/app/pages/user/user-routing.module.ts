import {  UserFormComponent } from './user-form/user-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

import {  UserListComponent } from './user-list/user-list.component';



const routes: Routes = [{
  path: '', component: UserComponent,
  children: [
    {
      path: 'list',
      component: UserListComponent,
    }, {
      path: 'action/:type',
      component: UserFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: UserFormComponent,
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },


  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
