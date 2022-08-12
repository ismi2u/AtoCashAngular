import { SubProjectFormComponent } from './sub-project-form/sub-project-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubProjectComponent } from './sub-project.component';

import { SubProjectListComponent } from './sub-project-list/sub-project-list.component';



const routes: Routes = [{
  path: '', component: SubProjectComponent,
  children: [
    {
      path: 'list',
      component: SubProjectListComponent,
    },
    {
      path: 'action/:type',
      component: SubProjectFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: SubProjectFormComponent,
    }, 
    { path: '', redirectTo: 'list', pathMatch: 'full' },


  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubProjectRoutingModule { }
