import { Routes } from '@angular/router';
import { AngularjsIframeComponent } from './components/angularjs-iframe.component';

export const routes: Routes = [
  { path: '', redirectTo: '/angularjs-iframe', pathMatch: 'full' },
  { path: 'angularjs-iframe', component: AngularjsIframeComponent },
  { path: '**', redirectTo: '/angularjs-iframe' }
];
