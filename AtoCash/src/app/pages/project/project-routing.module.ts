import { ProjectFormComponent } from './project-form/project-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';

import { ProjectListComponent } from './project-list/project-list.component';



const routes: Routes = [{
  path: '', component: ProjectComponent,
  children: [
    {
      path: 'list',
      component: ProjectListComponent,
    },
    {
      path: 'action/:type',
      component: ProjectFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: ProjectFormComponent,
    },
  
    { path: '', redirectTo: 'list', pathMatch: 'full' },


  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
