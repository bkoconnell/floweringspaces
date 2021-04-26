/**
 * FrontEnd [client] Routers
 */

// import Angular modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import components
import { FlowerListingComponent } from './flower-listing/flower-listing.component';
import { AddFlowerComponent } from './add-flower/add-flower.component';
import { EditFlowerComponent } from './edit-flower/edit-flower.component';
import { DeleteFlowerComponent } from './delete-flower/delete-flower.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

/**
 * Route Mapping & Definitions
 */
const routes: Routes = [
    { path: 'login', component: LoginComponent},                // login route
    { path: 'register', component: RegisterComponent},          // register route
    { path: 'list-flowers', component: FlowerListingComponent}, // flower list route
    { path: 'add-flower', component: AddFlowerComponent},       // add-flower route
    { path: 'edit-flower', component: EditFlowerComponent},     // edit-flower route
    { path: 'delete-flower', component: DeleteFlowerComponent}, // delete-flower route    
    // DEFAULT PATH (when none is specified):
    { path: '', component: HomeComponent, pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }