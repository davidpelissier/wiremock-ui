import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Mock } from "../mock.model";

@Component({
  selector: 'wui-mock-details',
  templateUrl: './mock-details.component.html',
  styleUrls: [ './mock-details.component.scss' ]
})
export class MockDetailsComponent implements OnInit, OnChanges {

  mockCode: string;

  @Input()
  mock: Mock;

  constructor() {
  }

  ngOnInit() {
    this.mockCode = JSON.stringify(this.mock, null, 4);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.mock = changes[ 'mock' ].currentValue;
    this.mockCode = JSON.stringify(this.mock, null, 4);
  }

}
