import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './/app-routing.module';

// Components 
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { NewsComponent } from './components/news/news.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { MmaComponent } from './components/mma/mma.component';
import { ContactComponent } from './components/contact/contact.component';
import { FightersComponent } from './components/mma/parts/fighters/fighters.component';
import { ClubsComponent } from './components/mma/parts/clubs/clubs.component';
import { FightsComponent } from './components/mma/parts/fights/fights.component';
import { FighterDetailsComponent } from './components/mma/parts/fighters/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    NewsComponent,
    AboutusComponent,
    MmaComponent,
    ContactComponent,
    FightersComponent,
    FighterDetailsComponent,
    ClubsComponent,
    FightsComponent
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
