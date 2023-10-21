import { Component, OnInit } from '@angular/core';
import { RxLabsUiModule } from '@rx-labs-ui';

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

  constructor() { }

  ngOnInit() {
  }

}
