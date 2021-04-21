import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlowerListingComponent } from './flower-listing/flower-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    FlowerListingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
