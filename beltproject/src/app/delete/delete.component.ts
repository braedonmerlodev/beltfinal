import { Component, OnInit } from '@angular/core';

import { HttpService } from './../http.service';

import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  _id: any;
  restaurant: any;


  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

    ngOnInit() {
      this._route.params.subscribe((params: Params) => {
        console.log(params['_id'])
        this._id = params['_id'];
      })
      this.deleteRestaurant(this._id)
    }

  deleteRestaurant(_id){
      let observable = this._httpService.deleteRestaurant(this._id)
      observable.subscribe(data => {
      this.restaurant = data
      })
      this.goHome()
    }

  goHome(){
    this._router.navigate(['/restaurants']);
  }

}
