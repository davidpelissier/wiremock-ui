import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightModule } from "ngx-highlightjs";
import { SharedModule } from "../shared/shared.module";
import { MockDetailsComponent } from "./mock-details/mock-details.component";
import { MockListComponent } from "./mock-list/mock-list.component";

import { MocksComponent } from './mocks.component';
import { MocksService } from "./mocks.service";
import { MocksTestingService } from "./mocks.service.spec";

export const mockResponse = require('app/testing/mock1.response.json');

describe('MocksComponent', () => {
  let component: MocksComponent;
  let fixture: ComponentFixture<MocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        SharedModule,
        HighlightModule.forRoot({ theme: 'monokai' })
      ],
      declarations: [
        MocksComponent,
        MockDetailsComponent,
        MockListComponent
      ],
      providers: [ { provide: MocksService, useClass: MocksTestingService } ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the mock selected in the list', () => {
    component.onSelected(mockResponse);
    expect(component.selectedMock).toEqual(mockResponse);
  });
});
