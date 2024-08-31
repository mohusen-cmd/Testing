import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAlert]'
})
export class AlertDirective {
  @Input("error")error:string;
  constructor(public elementRef:ElementRef) { }
  ngOnInit(){
    this.elementRef.nativeElement.innerHTML=`<div 
    class="alert alert-danger" role="alert"><span> ${this.error}<span> </div>`;

  }

}
