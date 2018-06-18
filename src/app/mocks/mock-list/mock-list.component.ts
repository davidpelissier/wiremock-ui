import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Mock, mockCompareMethod, mockCompareStatus, mockCompareUri } from '../mock.model';
import { MocksService } from '../mocks.service';

@Component({
  selector: 'wui-mock-list',
  templateUrl: './mock-list.component.html',
  styleUrls: [ './mock-list.component.scss' ]
})
export class MockListComponent implements OnInit {

  sortedBy = 'path';

  mocks: Mock[] = [];

  selectedMockId = '';

  @Output()
  selectedMock = new EventEmitter<Mock>();

  constructor(private service: MocksService) {
  }

  ngOnInit() {
    this.service.get().subscribe(m => {
      this.mocks = m;
    });
  }

  selectMock(mock: Mock) {
    this.selectedMock.emit(mock);
    this.selectedMockId = mock.id;
  }

  sort(field: string) {
    if (this.sortedBy == field) {
      this.sortedBy = '-' + this.sortedBy;
    } else {
      this.sortedBy = field;
    }

    switch (this.sortedBy) {
      case 'method':
        this.mocks.sort(mockCompareMethod);
        break;
      case 'path':
        this.mocks.sort(mockCompareUri);
        break;
      case 'status':
        this.mocks.sort(mockCompareStatus);
        break;
      case '-method':
      case '-path':
      case '-status':
        this.mocks.reverse();
        break;
    }
  }

}
