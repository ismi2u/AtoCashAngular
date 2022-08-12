import { EmploymentTypeFormComponent } from './employment-type-form/employment-type-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { EmploymentTypeComponent } from './employment-type.component';
import { EmploymentTypeListComponent } from './employment-type-list/employment-type-list.component';



const routes: Routes = [{
    path: '', component: EmploymentTypeComponent,
    children: [
        {
            path: 'list',
            component: EmploymentTypeListComponent,
        }, 
        {
            path: 'action/:type',
            component: EmploymentTypeFormComponent,
          },
          {
            path: 'action/:type/:id',
            component: EmploymentTypeFormComponent,
          },
       
        { path: '', redirectTo: 'list', pathMatch: 'full' },


    ],
},];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmploymentTypeRoutingModule { }
