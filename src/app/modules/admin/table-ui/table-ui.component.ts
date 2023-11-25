import { Component, OnInit } from '@angular/core';
import { RxLabsUiModule, TableConfig } from '@rx-labs-ui';
import { MOCK_DATA } from './data.example';
import { TableService } from 'libs/ui/src/lib/table/table.service';
import { MatButtonModule } from '@angular/material/button';
import { ColumnRefDirective } from 'libs/ui/src/lib/table/columnRef.directive';

export interface InterfaceExample {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  classCell?: string;
  birth_date: string;
  id_atencion: string;
  codigo_examen: string;
}

@Component({
  selector: 'app-table-ui',
  templateUrl: './table-ui.component.html',
  styleUrls: ['./table-ui.component.css'],
  standalone: true,
  imports: [
    RxLabsUiModule,
    MatButtonModule,
  ]
})
export default class TableUiComponent implements OnInit {

  configTable: TableConfig<InterfaceExample>[] = [
    {
      columnDef: 'id',
      header: 'id atencion',
      type: 'text',
      width: { min: 150, },
      sticky: false,
      cell: (element) => {
        element.email = 'ramon@ramon.com';
      },
      conditionClass: (element) => {
        return element.id % 2 === 0 ? 'testui' : 'testui2';
      },
      classCell: 'test',
    },
    {
      columnDef: 'first_name',
      header: 'Nombres',
    },
    {
      columnDef: 'last_name',
      header: 'Apellidos',
    },
    {
      columnDef: 'email',
      header: 'Email',
    },
    {
      columnDef: 'birth_date',
      header: 'Fecha de Nacimiento',
    },
    {
      columnDef: 'id_atencion',
      header: 'Id Atencion',
    },
    {
      columnDef: 'codigo_examen',
      header: 'Codigo Examen',
    }
  ]

  dataExample: InterfaceExample[] = MOCK_DATA;


  constructor(private tableService: TableService<InterfaceExample>) { }

  ngOnInit() {
    // this.tableService.getDataTable().subscribe((data) => {
    //   console.log('data', data);
    // });
  }

  changeData() {
    // this.dataExample = [{ "id": 1, "first_name": "Analiese", "last_name": "Renbold", "email": "arenbold0@guardian.co.uk", "gender": "Female", "birth_date": "2022-08-07 06:41:22", "id_atencion": "gov.fda.Y-find", "codigo_examen": "7416" }]
  }

  find() {
    // console.log(this.tableService.findRow((element) => element.codigo_examen === '8618'));
    // this.tableService.updateRow()
  }
  getCellValue() {
    // const element = this.tableService.findRow((element) => element.codigo_examen === '8618');

    // console.log(this.tableService.getCellValue(element.element, 'email'));
  }

}
