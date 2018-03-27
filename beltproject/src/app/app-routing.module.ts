import { RestaurantsComponent } from './restaurants/restaurants.component';
import { NewComponent } from './new/new.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { WriteComponent } from './write/write.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: "", pathMatch: 'full', redirectTo: "/restaurants"},
  {path: "restaurants", component: RestaurantsComponent},
  {path: "new", component: NewComponent},
  {path: 'reviews/:_id', component: ReviewsComponent},
  {path: 'write/:_id', component: WriteComponent },
  {path: "edit/:_id", component: EditComponent},
  {path: "delete/:_id", component: DeleteComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
