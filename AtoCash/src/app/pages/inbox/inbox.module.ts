import { AntdModule } from '../../components/antd.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';
import { InboxListComponent } from './inbox-list/inbox-list.component';
import { InboxFormComponent } from './inbox-form/inbox-form.component';
import { SharedModule } from 'src/app/components/shared.module';
import { InboxAlertComponent } from './inbox-alert/inbox-alert.component';

@NgModule({
  declarations: [InboxAlertComponent,InboxComponent, InboxListComponent, InboxFormComponent],
  imports: [
    CommonModule,
    InboxRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class InboxModule { }
