import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

    //show restaurants in DB
getRestaurants(){
  return this._http.get('/restaurants');
}

 //add movie to db
addRestaurant(newRestaurant){
  return this._http.post('/newRestaurant', newRestaurant);
  }


  //add review to a restaurant
addReview(newReview, _id){
  return this._http.put(`/newReview/${_id}`, newReview);
}

//get single restaurant by id
getRestaurantById(_id){
  return this._http.get(`/restaurants/${_id}`);
}

//edits the pet grabbed by ID
editRestaurant(restaurant, _id){
  return this._http.put(`/restaurants/${_id}`, restaurant);
}


deleteRestaurant(_id){
  return this._http.delete(`/restaurants/delete/${_id}`, _id);
}

}
