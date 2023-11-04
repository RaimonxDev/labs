import { Component, OnInit } from '@angular/core';
import { RxLabsUiModule, TableConfig } from '@rx-labs-ui';
import { MOCK_DATA } from './data.example';
import { TableService } from 'libs/ui/src/lib/table/table.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-table-ui',
  templateUrl: './table-ui.component.html',
  styleUrls: ['./table-ui.component.css'],
  standalone: true,
  imports: [
    RxLabsUiModule,
    MatButtonModule
  ]
})
export default class TableUiComponent implements OnInit {
  configTable: TableConfig[] = [
    {
      columnDef: 'id',
      header: 'id atencion',
      type: 'number',
      width: { min: 60, max: 120 },
      sticky: false,
      cell: (element: any) => {
        element.email = 'ramon@ramon.com';
      }
    },
    {
      columnDef: 'first_name',
      header: 'Nombres',
      type: 'text',
      width: { min: 120 },
      sticky: false,
    },
    {
      columnDef: 'last_name',
      header: 'Apellidos',
      type: 'text',
      width: { min: 120 },
      sticky: false,
    },
    {
      columnDef: 'email',
      header: 'Email',
      type: 'text',
      width: { min: 250 },
    },
    {
      columnDef: 'birth_date',
      header: 'Fecha de Nacimiento',
      type: 'text',
      width:
        { min: 100 },
    },
    {
      columnDef: 'id_atencion',
      header: 'Id Atencion',
      type: 'text',
      formatDate: 'shortDate',
      width: {
        min: 100
      },
    },
    {
      columnDef: 'codigo_examen',
      header: 'Codigo Examen',
      type: 'text',
      formatDate: 'shortDate',
      width: {
        min: 100
      },
    }

  ]

  dataExample = MOCK_DATA;


  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.tableService.getDataTable().subscribe((data) => {
      console.log('data', data);
    });

    console.log(this.tableService.getCellValue(this.dataExample[1], 'email'));
    // console.log('dataExample', this.dataExample);
  }

  changeData() {
    this.dataExample = [{ "id": 1, "first_name": "Analiese", "last_name": "Renbold", "email": "arenbold0@guardian.co.uk", "gender": "Female", "birth_date": "2022-08-07 06:41:22", "id_atencion": "gov.fda.Y-find", "codigo_examen": "7416" }]
  }

  find() {
    console.log(this.tableService.findRow((element) => element.codigo_examen === '8618'));

    this.tableService.updateRow((element) => element.codigo_examen === '8618', {
      first_name: 'Ramon',
    })
  }

}
