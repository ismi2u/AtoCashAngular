import { FiltersComponent } from './filters/filters.component';
import { AntdModule } from './antd.module';
import { StatusProgressComponent } from './status-progress/status-progress.component';
import {DisburseFormComponent} from './disburse-form/disburse-form.component'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Angular Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { CapitalizeDirective } from '../directives/capitalize.directive';
import {  TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslationsComponent } from './translations/translations.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [FiltersComponent,TableComponent,DisburseFormComponent, StatusProgressComponent, RequestDetailsComponent, CapitalizeDirective, TranslationsComponent],
  imports: [
    CommonModule,
    FormsModule,
    AntdModule,
    ReactiveFormsModule,
    TranslateModule.forChild({ useDefaultLang: true, isolate: false, loader: { provide: TranslateLoader, useFactory: (HttpLoaderFactory), deps: [HttpClient] } })

  ],
  exports: [
    TableComponent,
    StatusProgressComponent,
    RequestDetailsComponent,
    CapitalizeDirective,
    TranslationsComponent,
    TranslateModule,
    DisburseFormComponent,
    FiltersComponent
  ]
})
export class SharedModule { }
