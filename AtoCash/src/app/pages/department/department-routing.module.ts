import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepartmentComponent } from './department.component';
import { DepartmentListComponent } from './department-list/department-list.component';

import { DepartmentFormComponent } from './department-form/department-form.component';

const routes: Routes = [{
  path: '', component: DepartmentComponent,
  children: [
    {
      path: 'list',
      component: DepartmentListComponent,
    },
    {
      path: 'action/:type',
      component: DepartmentFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: DepartmentFormComponent,
    },
  
    { path: '', redirectTo: 'list', pathMatch: 'full' },


  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
