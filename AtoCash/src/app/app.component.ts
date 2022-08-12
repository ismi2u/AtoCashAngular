import { CommonService } from './services/common.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading:any = false;

  constructor(public translate: TranslateService, private commonService:CommonService) {

    translate.addLangs(['en', 'ar', 'es', 'tr']);
    translate.setDefaultLang('en');


    const browserLang = localStorage.getItem('lang') ? localStorage.getItem('lang')  : translate.getBrowserLang();


    translate.use(browserLang.match(/en|ar|es|tr/) ? browserLang : 'en');
  }

  ngOnInit(): void {
    this.commonService.getPermission()
  
    this.commonService.currentLanguage.subscribe(data=>{
      if(data == 'ar') {
        document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
      }else {
        document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');

      }
      this.translate.use(data)
    })

    this.commonService.unauthorizedLoading.subscribe(data=>{
      this.loading = data;
    })
  }

  
}
