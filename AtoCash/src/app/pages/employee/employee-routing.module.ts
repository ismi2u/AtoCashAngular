import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EmployeeComponent } from "./employee.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";

const routes: Routes = [
  {
    path: "",
    component: EmployeeComponent,

    children: [
      {
        path: "list",
        component: EmployeeListComponent,
      },
      {
        path: "action/:type",
        component: EmployeeFormComponent,
      },
      {
        path: "action/:type/:id",
        component: EmployeeFormComponent,
      },
      { path: "", redirectTo: "list", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
