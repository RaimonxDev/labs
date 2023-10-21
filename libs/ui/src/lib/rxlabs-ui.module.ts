import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  imports: [CommonModule, CdkTableModule],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class RxLabsUiModule { }
