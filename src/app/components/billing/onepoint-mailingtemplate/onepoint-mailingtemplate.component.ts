import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-onepoint-mailingtemplate',
  templateUrl: './onepoint-mailingtemplate.component.html',
  styleUrls: ['./onepoint-mailingtemplate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnepointMailingtemplateComponent  {
  @ViewChild('childTemplate') childTemplateRef: ElementRef;
  @Input() companylogo: string;
  @Input() model: any; // Replace 'any' with the actual type of your model data
  @Input() userDetails: any; // Replace 'any' with the actual type of user details data
  @Input() estInvoicedetails: any ; // Replace 'any' with the actual type of estimate invoice details data
  @Input() billingaddress: string; // Replace 'string' with the actual type of billing address
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    // Log changes for debugging
    console.log('Changes detected:', changes);
    
    // Manually trigger change detection if needed
    this.cdr.markForCheck();
  }
}
