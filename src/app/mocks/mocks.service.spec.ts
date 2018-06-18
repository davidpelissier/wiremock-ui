import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Mock, mockCompareUri } from './mock.model';
import { MocksService } from './mocks.service';

export const mocksResponse = require('app/testing/mocks.response.json');

export class MocksTestingService extends MocksService {
  get(): Observable<Mock[]> {
    return observableOf(mocksResponse).pipe(
      map(mocks => {
        return MocksService.determineUri(mocks)
      }),
      map(mocks => mocks.sort(mockCompareUri)),);
  }
}

describe('MocksService', () => {

  let service: MocksService;
  let httpMock: HttpTestingController;
  let uri;
  let response;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ MocksService ]
    });

    service = TestBed.get(MocksService);
    httpMock = TestBed.get(HttpTestingController);
    uri = environment.wiremock.host + service.mappings;
    response = require('app/testing/mappings.response.json');
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('get', () => {
    it('should get sorted mocks', () => {
      service.get().subscribe(m => {
        expect(m[ 0 ].request.uri).toEqual('/abc');
        expect(m[ 1 ].request.uri).toEqual('/abc');
        expect(m[ 2 ].request.uri).toEqual('/def');
      });

      httpMock.expectOne(uri)
        .flush(response);
    });

    it('', () => {
      service.get().subscribe(m => {
        m.forEach(m => expect(m.request.uri).toBeTruthy())
      });

      httpMock.expectOne(uri)
        .flush(response);
    });

    it('should get mocks with new "uri" field', () => {
      service.get().subscribe(m => {
        expect(m.length).toBe(7);
        m.forEach(m => expect(m.request.uri).toBeTruthy())
        expect(m[ 0 ].request.uri).toEqual('/abc');
        expect(m[ 1 ].request.uri).toEqual('/abc');
        expect(m[ 2 ].request.uri).toEqual('/def');
      });

      httpMock.expectOne(uri)
        .flush(response);
    });
  });
});



