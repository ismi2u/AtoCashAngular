import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './inbox.component';

import { InboxListComponent } from './inbox-list/inbox-list.component';
import { InboxFormComponent } from './inbox-form/inbox-form.component';

const routes: Routes = [{
  path: '', component: InboxComponent,
  children: [
    {
      path: 'list',
      component: InboxListComponent,
    },
    {
      path: 'action/:type',
      component: InboxFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: InboxFormComponent,
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
