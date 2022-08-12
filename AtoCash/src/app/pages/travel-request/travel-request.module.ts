import { AntdModule } from '../../components/antd.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TravelRequestRoutingModule } from './travel-request-routing.module';
import { TravelRequestComponent } from './travel-request.component';
import { TravelRequestListComponent } from './travel-request-list/travel-request-list.component';
import { TravelRequestFormComponent } from './travel-request-form/travel-request-form.component';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  declarations: [TravelRequestComponent, TravelRequestListComponent, TravelRequestFormComponent],
  imports: [
    CommonModule,
    TravelRequestRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AntdModule
  ]
})
export class TravelRequestModule { }
