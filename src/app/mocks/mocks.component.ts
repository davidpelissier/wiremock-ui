import { Component, OnInit } from '@angular/core';
import { Mock } from "./mock.model";

@Component({
  selector: 'wui-mocks',
  templateUrl: './mocks.component.html',
  styleUrls: [ './mocks.component.scss' ]
})
export class MocksComponent implements OnInit {

  selectedMock: Mock;

  constructor() {
  }

  ngOnInit() {
  }

  onSelected(mock: Mock) {
    this.selectedMock = mock;
  }

}
