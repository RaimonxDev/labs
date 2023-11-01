import { Component, OnInit } from '@angular/core';
import { RxLabsUiModule, TableConfig } from '@rx-labs-ui';

@Component({
  selector: 'app-table-ui',
  templateUrl: './table-ui.component.html',
  styleUrls: ['./table-ui.component.css'],
  standalone: true,
  imports: [
    RxLabsUiModule
  ]
})
export default class TableUiComponent implements OnInit {
  configTable: TableConfig[] = [
    {
      columnDef: 'id',
      header: 'id atencion',
      type: 'number',
      width: '150px',
      sticky: false,
      cell: (element: any) => `${element.header}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      type: 'text',
      width: '100px',
      cell: (element: any) => `${element.header}`,
    },
    {
      columnDef: 'fecha',
      header: 'Fecha de Inicio',
      type: 'date',
      formatDate: 'shortDate',
      width: '150px',
      sticky: false,
      cell: (element: any) => console.log(element, 'element'),
    },
    {
      columnDef: 'paciente',
      header: 'Paciente',
      type: 'number',
      width: '200px',
      cell: (element: any) => `${element.header}`,
    },
    {
      columnDef: 'apePaciente',
      header: 'Apellido Paciente',
      type: 'text',
      width: '200px',
      cell: (element: any) => `${element.header}`,
    },
    {
      columnDef: 'edad',
      header: 'Edad',
      type: 'date',
      formatDate: 'shortDate',
      width: '200px',
      cell: (element: any) => console.log(element, 'element'),
    }
  ]

  dataExample =
    [
      { id: 1, name: 'Ramon', fecha: new Date(), paciente: 1, apePaciente: 'Perez', edad: 20 },
      { id: 2, name: 'Meilyn', fecha: new Date() },
      { id: 3, name: 'Rodrigo', fecha: new Date() },
      { id: 5, name: 'Fanny', fecha: new Date() },
      { id: 6, name: 'Robert', fecha: new Date() },
      { id: 7, name: 'Nora', fecha: new Date() },
      { id: 8, name: 'Jose', fecha: new Date() },
    ]


  constructor() { }

  ngOnInit() {
  }

}
