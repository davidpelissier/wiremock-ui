import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { MocksModule } from "./mocks/mocks.module";
import { MocksService } from './mocks/mocks.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(routes),

    MocksModule
  ],
  providers: [ MocksService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
