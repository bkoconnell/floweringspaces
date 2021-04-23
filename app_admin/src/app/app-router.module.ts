// import Angular modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import components
import { FlowerListingComponent } from './flower-listing/flower-listing.component';
import { AddFlowerComponent } from './add-flower/add-flower.component';
import { EditFlowerComponent } from './edit-flower/edit-flower.component';
import { DeleteFlowerComponent } from './delete-flower/delete-flower.component';

// define & map routes
const routes: Routes = [
    { path: 'add-flower', component: AddFlowerComponent},     // add-flower route
    { path: 'edit-flower', component: EditFlowerComponent},   // edit-flower route
    { path: 'delete-flower', component: DeleteFlowerComponent},   // delete-flower route
    // default path (when none is specified):
    { path: '', component: FlowerListingComponent, pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }