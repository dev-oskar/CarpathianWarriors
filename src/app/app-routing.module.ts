import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnersComponent } from './components/partners/partners.component'
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'partnerzy',
    component: PartnersComponent
  },
]

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}