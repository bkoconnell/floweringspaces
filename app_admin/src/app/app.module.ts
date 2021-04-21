import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlowerListingComponent } from './flower-listing/flower-listing.component';
import { FlowerCardComponent } from './flower-card/flower-card.component';

@NgModule({
  declarations: [
    AppComponent,
    FlowerListingComponent,
    FlowerCardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
