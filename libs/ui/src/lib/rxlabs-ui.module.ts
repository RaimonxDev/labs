import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, CdkTableModule, MatMenuModule, MatIconModule, MatButtonModule],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class RxLabsUiModule { }
