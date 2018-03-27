import { Component, OnInit } from '@angular/core';

import { HttpService } from './../http.service';

import { ActivatedRoute, Params, Router } from '@angular/router';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  _id: any;
  restaurant: any;
  editedRestaurant: any;
  errMessage: any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

    ngOnInit() {
      this._route.params.subscribe((params: Params) => {this._id = params['_id'];})
      this.getPetFromService();
    }

  //grabs single pet by _id
    getPetFromService(){
      let observable = this._httpService.getRestaurantById(this._id);
      observable.subscribe(data => {
        this.restaurant = data;
      })
    }

    onEdit(restaurant, _id){
      this.editedRestaurant = restaurant;
      let observable = this._httpService.editRestaurant(this.editedRestaurant, _id);
      observable.subscribe(data => {
        if(data["error"]){
          this.errMessage = data['error']
        } else {
          this.goHome()
        }
      })
    }

    goHome() {
      this._router.navigate(['/restaurants']);
    }

}
