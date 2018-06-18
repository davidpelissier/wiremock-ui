import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { MocksService } from '../mocks.service';
import { MocksTestingService } from '../mocks.service.spec';

import { MockListComponent } from './mock-list.component';

export const mockResponse = require('app/testing/mock1.response.json');

describe('MockListComponent', () => {
  let component: MockListComponent;
  let fixture: ComponentFixture<MockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, SharedModule ],
      declarations: [ MockListComponent ],
      providers: [ { provide: MocksService, useClass: MocksTestingService } ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of mocks', async(() => {
    expect(component.mocks.length).toBe(6);
  }));

  it('should emit an event when mock selected', () => {
    spyOn(component.selectedMock, 'emit');
    let nativeElement = fixture.nativeElement;
    let item = nativeElement.querySelector('li');
    item.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.selectedMock.emit).toHaveBeenCalledWith(mockResponse);
  });

  it('should have a list of mocks sorted by method asc', async(() => {
    component.sort('method');
    fixture.detectChanges();
    expect(component.mocks[ 0 ].request.method).toEqual('DELETE');
    expect(component.mocks[ 1 ].request.method).toEqual('GET');
    expect(component.mocks[ 2 ].request.method).toEqual('GET');
    expect(component.mocks[ 3 ].request.method).toEqual('OPTIONS');
    expect(component.mocks[ 4 ].request.method).toEqual('POST');
    expect(component.mocks[ 5 ].request.method).toEqual('PUT');
  }));

  it('should have a list of mocks sorted by method desc', async(() => {
    component.sort('method'); // First time to sort by ASC
    component.sort('method'); // Second time to sort by DESC
    fixture.detectChanges();
    expect(component.mocks[ 0 ].request.method).toEqual('PUT');
    expect(component.mocks[ 1 ].request.method).toEqual('POST');
    expect(component.mocks[ 2 ].request.method).toEqual('OPTIONS');
    expect(component.mocks[ 3 ].request.method).toEqual('GET');
    expect(component.mocks[ 4 ].request.method).toEqual('GET');
    expect(component.mocks[ 5 ].request.method).toEqual('DELETE');
  }));

  it('should have a list of mocks sorted by path asc', async(() => {
    component.sort('path'); // Sorted by path by default so sort by DESC now
    component.sort('path'); // Launch again the sort method to sort by ASC
    expect(component.mocks[ 0 ].request.uri).toEqual('/abc');
    expect(component.mocks[ 1 ].request.uri).toEqual('/abc');
    expect(component.mocks[ 2 ].request.uri).toEqual('/def');
    expect(component.mocks[ 3 ].request.uri).toEqual('/ghi');
    expect(component.mocks[ 4 ].request.uri).toEqual('/ghi');
    expect(component.mocks[ 5 ].request.uri).toEqual('/jkl');
  }));

  it('should have a list of mocks sorted by path desc', async(() => {
    component.sort('path'); // Sorted by path by default so sort by DESC now
    fixture.detectChanges();
    expect(component.mocks[ 0 ].request.uri).toEqual('/jkl');
    expect(component.mocks[ 1 ].request.uri).toEqual('/ghi');
    expect(component.mocks[ 2 ].request.uri).toEqual('/ghi');
    expect(component.mocks[ 3 ].request.uri).toEqual('/def');
    expect(component.mocks[ 4 ].request.uri).toEqual('/abc');
    expect(component.mocks[ 5 ].request.uri).toEqual('/abc');
  }));

  it('should have a list of mocks sorted by status asc', async(() => {
    component.sort('status'); // Sort by ASC
    fixture.detectChanges();
    expect(component.mocks[ 0 ].response.status).toEqual(200);
    expect(component.mocks[ 1 ].response.status).toEqual(200);
    expect(component.mocks[ 2 ].response.status).toEqual(302);
    expect(component.mocks[ 3 ].response.status).toEqual(400);
    expect(component.mocks[ 4 ].response.status).toEqual(400);
    expect(component.mocks[ 5 ].response.status).toEqual(500);
  }));

  it('should have a list of mocks sorted by status desc', async(() => {
    component.sort('status'); // First time to sort by ASC
    component.sort('status'); // Second time to sort by DESC
    fixture.detectChanges();
    expect(component.mocks[ 0 ].response.status).toEqual(500);
    expect(component.mocks[ 1 ].response.status).toEqual(400);
    expect(component.mocks[ 2 ].response.status).toEqual(400);
    expect(component.mocks[ 3 ].response.status).toEqual(302);
    expect(component.mocks[ 4 ].response.status).toEqual(200);
    expect(component.mocks[ 5 ].response.status).toEqual(200);
  }));
});
