import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  restaurant: any;
  newReview: any;
  _id: any;
  reviews = [];

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this._id = params['_id'];
      this.getRestaurantFromService();
    })
    this.newReview = {customer: "", stars: 0, description: ""};
  }

  getRestaurantFromService(){
    let observable = this._httpService.getRestaurantById(this._id);
    observable.subscribe(data => {
      this.restaurant = data;
    })
  }

  onSubmitReview(restaurant, _id){
    let observable = this._httpService.addReview(this.newReview, _id);
    observable.subscribe(data => {
      console.log(data);
      this.newReview = data;
      this.reviews.push(this.newReview);
    })
    this.goBack();
  }

  

  goBack() {
    this._router.navigate([`/reviews/${this._id}`]);
  }

}
