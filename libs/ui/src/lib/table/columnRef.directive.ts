import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appColumnRef]'
})
export class ColumnRefDirective {

  constructor(private ref: ElementRef) { }

  @Input() id!: string;

}
