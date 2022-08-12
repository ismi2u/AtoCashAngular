import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyComponent } from './currency.component';

import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CurrencyFormComponent } from './currency-form/currency-form.component';

const routes: Routes = [
  {
    path: '',
    component: CurrencyComponent,
    children: [
      {
        path: 'list',
        component: CurrencyListComponent,
      },
      {
        path: 'action/:type',
        component: CurrencyFormComponent,
      },
      {
        path: 'action/:type/:id',
        component: CurrencyFormComponent,
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrencyRoutingModule {}
