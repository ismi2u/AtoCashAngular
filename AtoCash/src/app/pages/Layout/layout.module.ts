import { AntdModule } from '../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';
import { LayoutComponent } from './layout.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './layout-routing.module';



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
 LoginRoutingModule,
    SharedModule,
    AntdModule
 
  ]
})
export class LayoutModule { }
