import { Routes } from '@angular/router';
import { MocksComponent } from "./mocks/mocks.component";

export const routes: Routes = [
  { path: '', redirectTo: 'mocks', pathMatch: 'full' },
  { path: 'mocks', component: MocksComponent },
];
