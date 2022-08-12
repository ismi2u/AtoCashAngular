import { AntdModule } from './../../components/antd.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { RolelistComponent } from './role-list/role-list.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  declarations: [RoleComponent, RolelistComponent,  RoleFormComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class RoleModule { }
