// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

// Components
import { NewsComponent } from './components/news/news.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { MmaComponent } from './components/mma/mma.component';
import { ContactComponent } from './components/contact/contact.component';
import { FightersComponent } from './components/mma/parts/fighters/fighters.component';
import { FightsComponent } from './components/mma/parts/fights/fights.component';
import { ClubsComponent } from './components/mma/parts/clubs/clubs.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent
  },
  {
    path: 'onas',
    component: AboutusComponent
  },
  {
    path: 'mma',
    component: MmaComponent
  },
  {
    path: 'mma/zawodnicy', 
    component: FightersComponent
  },
  {
    path: 'mma/walki', 
    component: FightsComponent
  },
  {
    path: 'mma/kluby', 
    component: ClubsComponent
  },
  {
    path: 'kontakt',
    component: ContactComponent
  }
  
]

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
