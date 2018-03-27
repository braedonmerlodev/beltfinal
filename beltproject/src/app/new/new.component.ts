import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newRestaurant: any;
  restaurants = [];
  validationError: any;


  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(){
    this.newRestaurant = {restaurant: "", cuisine: "" };
    this.validationError = {errors: {restaurant: false, cuisine: false}}
  }

  onSubmit(){
    let observable = this._httpService.addRestaurant(this.newRestaurant);
    console.log("submitting through component");
    observable.subscribe(response => {
      let data = response as any;
      if(data.hasOwnProperty('error')) {
        this.validationError = data.error;
      } else {
        this.newRestaurant = data;
        this.goHome();
      }
      
    })
  }

  goHome() {
    this._router.navigate(['/restaurants']);
  }

}
