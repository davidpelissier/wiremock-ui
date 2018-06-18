import { HttpClientModule } from "@angular/common/http";
import { SimpleChange } from "@angular/core";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightModule } from "ngx-highlightjs";
import { SharedModule } from "../../shared/shared.module";

import { MockDetailsComponent } from './mock-details.component';

export const mock1Response = require('app/testing/mock1.response.json');
export const mock2Response = require('app/testing/mock2.response.json');

describe('MockDetailsComponent', () => {
  let component: MockDetailsComponent;
  let fixture: ComponentFixture<MockDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        SharedModule,
        HighlightModule.forRoot({ theme: 'monokai' })
      ],
      declarations: [ MockDetailsComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockDetailsComponent);
    component = fixture.componentInstance;
    component.mock = mock1Response;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.mock).toEqual(mock1Response);
    expect(component.mockCode).toEqual(JSON.stringify(mock1Response, null, 4));
  });

  it('should change the mock rendered', () => {
    expect(component.mock).toEqual(mock1Response);
    expect(component.mockCode).toEqual(JSON.stringify(mock1Response, null, 4));
    component.ngOnChanges({
      'mock': new SimpleChange(null, mock2Response, true)
    });
    fixture.detectChanges();
    expect(component.mock).toEqual(mock2Response);
    expect(component.mockCode).toEqual(JSON.stringify(mock2Response, null, 4));
  });

});
