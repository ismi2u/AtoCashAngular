import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss']
})
export class TranslationsComponent implements OnInit {
  translation = localStorage.getItem('lang') || 'en'
  
  constructor(public translate:TranslateService, private commonService: CommonService) { }

  ngOnInit(): void {
    if(this.translation == 'ar') {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    }else {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');

    }
  }

  changeLanguage = () => {
    this.commonService.currentLanguage.next(this.translation)
    localStorage.setItem('lang',this.translation)
  }

  getLang = () => this.translate.getLangs()


}
