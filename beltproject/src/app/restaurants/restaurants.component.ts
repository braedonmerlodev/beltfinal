import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { HttpService } from './../http.service';

import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
  encapsulation: ViewEncapsulation.None

})

export class RestaurantsComponent implements OnInit {
  data: any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) {}

  ngOnInit() {
    this.getRestaurantsFromService()
  }

  getRestaurantsFromService(){
    let observable = this._httpService.getRestaurants()
    observable.subscribe(data => {
      // lists by type
      this.data = data['restaurants']
    })
  }
  }
