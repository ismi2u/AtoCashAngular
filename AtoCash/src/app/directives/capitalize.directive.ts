import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCapitalize]'
})
export class CapitalizeDirective {

  constructor(private elementRef:ElementRef, private ngControl:NgControl) { }

  @HostListener('input',['$event']) onChange(event) {
    let value:string = event.target.value;
    if(value)
    value = value[0].toUpperCase() +  value.substr(1,value.length)
    this.ngControl.control.patchValue(value)
  } 

}
