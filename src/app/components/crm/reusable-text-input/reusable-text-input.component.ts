import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reusable-text-input',
  templateUrl: './reusable-text-input.component.html',
  styleUrls: ['./reusable-text-input.component.scss']
})
export class ReusableTextInputComponent implements OnInit {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() required: boolean = false;
  @Input() options: { value: string, label: string }[] = [];
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  onValueChange(newValue: string): void {
    this.valueChange.emit(newValue);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
