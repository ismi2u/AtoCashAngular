import { AntdModule } from "./../../components/antd.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { SubProjectRoutingModule } from "./sub-project-routing.module";
import { SubProjectComponent } from "./sub-project.component";
import { SubProjectListComponent } from "./sub-project-list/sub-project-list.component";
import { SubProjectFormComponent } from "./sub-project-form/sub-project-form.component";
import { SharedModule } from 'src/app/components/shared.module';
@NgModule({
  declarations: [
    SubProjectComponent,
    SubProjectListComponent,
    SubProjectFormComponent,
  ],
  imports: [
    CommonModule,
    SubProjectRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule,
  ],
})
export class SubProjectModule {}
