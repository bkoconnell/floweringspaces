/**
 * FrontEnd [client] App Module
 */

// import Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import components, services, & router module
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-router.module';
import { FlowerListingComponent } from './flower-listing/flower-listing.component';
import { FlowerCardComponent } from './flower-card/flower-card.component';
import { FlowerDataService } from './services/flower-data.service';
import { AuthenticationService } from './services/authentication.service';
import { AddFlowerComponent } from './add-flower/add-flower.component';
import { EditFlowerComponent } from './edit-flower/edit-flower.component';
import { DeleteFlowerComponent } from './delete-flower/delete-flower.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    FlowerListingComponent,
    FlowerCardComponent,
    AddFlowerComponent,
    EditFlowerComponent,
    DeleteFlowerComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    FlowerDataService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
