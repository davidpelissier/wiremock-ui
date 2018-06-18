import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Mappings } from './mappings.model';

import { Mock, mockCompareUri } from './mock.model';

@Injectable()
export class MocksService {

  readonly mappings = '/__admin/mappings';

  constructor(private http: HttpClient) {
  }

  get(): Observable<Mock[]> {
    return this.http.get<Mappings>(environment.wiremock.host + this.mappings).pipe(
      map(res => res.mappings),
      map(mocks => {
        return MocksService.determineUri(mocks)
      }),
      map(mocks => mocks.sort(mockCompareUri)),);
  }

  static determineUri(mocks: Mock[]): Mock[] {
    mocks.forEach(mock => {
      if (mock.request.url)
        mock.request.uri = mock.request.url;
      else if (mock.request.urlPath)
        mock.request.uri = mock.request.urlPath;
      else if (mock.request.urlPattern)
        mock.request.uri = mock.request.urlPattern;
      else if (mock.request.urlPathPattern)
        mock.request.uri = mock.request.urlPathPattern;
      else
        mock.request.uri = 'Path undefined';
    });
    return mocks;
  }
}
