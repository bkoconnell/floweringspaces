// import Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
// import components & services 
import { AppComponent } from './app.component';
import { FlowerListingComponent } from './flower-listing/flower-listing.component';
import { FlowerCardComponent } from './flower-card/flower-card.component';
import { FlowerDataService } from './services/flower-data.service';


@NgModule({
  declarations: [
    AppComponent,
    FlowerListingComponent,
    FlowerCardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    FlowerDataService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
