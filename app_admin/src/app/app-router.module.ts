// import Angular modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import components
import { FlowerListingComponent } from './flower-listing/flower-listing.component';
import { AddFlowerComponent } from './add-flower/add-flower.component';
//import { EditTripComponent } from './edit-trip/edit-trip.component';

// define & map routes
const routes: Routes = [
    { path: 'add-flower', component: AddFlowerComponent},     // add-flower route
    //{ path: 'edit-trip', component: EditTripComponent},   // edit-trip route
    // default path (when none is specified) will route as follows:
    { path: '', component: FlowerListingComponent, pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }