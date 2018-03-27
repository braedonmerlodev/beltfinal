import { Component, OnInit } from '@angular/core';

import { HttpService } from './../http.service';

import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  data: any;
  restaurant: any;
  _id: any;
  didClick = false;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

    ngOnInit() {
      this._route.params.subscribe((params: Params) => {
        console.log(params['_id'])
        this._id = params['_id'];
      })
      this.getRestaurantFromService();
    }

  getRestaurantFromService(){
    let observable = this._httpService.getRestaurantById(this._id)
    observable.subscribe(data => {
      this.restaurant = data;
    })
  }

  goHome() {
    this._router.navigate(['/restaurants']);
  }
}
