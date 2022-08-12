import { TaskFormComponent } from './task-form/task-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';

import { TaskListComponent } from './task-list/task-list.component';



const routes: Routes = [{
  path: '', component: TaskComponent,
  children: [
    {
      path: 'list',
      component: TaskListComponent,
    }, {
      path: 'action/:type',
      component: TaskFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: TaskFormComponent,
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
