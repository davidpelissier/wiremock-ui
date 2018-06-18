import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightModule } from "ngx-highlightjs";
import { SharedModule } from "../shared/shared.module";
import { MockDetailsComponent } from "./mock-details/mock-details.component";
import { MockListComponent } from "./mock-list/mock-list.component";
import { MocksComponent } from "./mocks.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HighlightModule.forRoot({ theme: 'monokai' })
  ],
  declarations: [
    MocksComponent,
    MockListComponent,
    MockDetailsComponent
  ],
  exports: [
    MocksComponent,
    MockListComponent,
    MockDetailsComponent
  ]
})
export class MocksModule {
}
