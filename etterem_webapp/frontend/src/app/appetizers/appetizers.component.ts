import { Component, OnInit, getDebugNode } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Food, Food_order, OrderedFood, Table_order } from '../_models'
import { FoodService, Food_orderService, Table_orderService } from '../_services';
//import { privateDecrypt } from 'crypto';

@Component({
  selector: 'app-appetizers',
  templateUrl: './appetizers.component.html',
  styleUrls: ['./appetizers.component.css']
})
export class AppetizersComponent implements OnInit {

  foodbyCategory: Food[] = [];
  toBeOrdered: OrderedFood[] = [];
  cat_id: number;
  id: number;
  val: number[] = [];
  food_order: Food_order;
  table: Table_order;

  private sum=0;
  private total=0;

  constructor(private route: ActivatedRoute, private foodService: FoodService, private food_orderService: Food_orderService, private table_orderService: Table_orderService, private location: Location) {
    route.params.subscribe(val => {
    this.id = + this.route.parent.snapshot.paramMap.get('id');
    this.get_FoodbyCategory();
    this.table = {id: this.id, reserve: "1"};
    })
  }

  ngOnInit() {}

  updateTable(): void {		
    this.table_orderService.updateTable_order(this.table).subscribe();
    console.log(this.table);
	}

  get_FoodbyCategory(): void{
    this.cat_id = + this.route.snapshot.paramMap.get('cat_id');
    this.foodService.getFoodbyCategory(this.cat_id).subscribe(foodbyCategory => this.foodbyCategory = foodbyCategory);
  }

  rendeles(): void{//rendelendő dolgok -> "rendelési lista"
    this.toBeOrdered = [];
    for (let i = 0; i < this.foodbyCategory.length; i++){
      if ( this.val[i] > 0) {
        this.toBeOrdered.push(
          {
            id: this.foodbyCategory[i].id,
            name: this.foodbyCategory[i].name,
            price: this.foodbyCategory[i].price,
            food_order_id: 0,
            quantity: this.val[i]
          });
          this.sum += this.foodbyCategory[i].price * this.val[i];
          
          //console.log(this.sum);
      }
      //this.total += this.sum;
    }
    this.total = this.sum;
    this.sum = 0;/*resetelés, hogy ne bugoljon össze a korábban eltárolt értékkel, 
                  ha pl nem lett megrendelve tényelgesen,
                  csak ki lett exitelve a sidebar*/
    //this.total += this.sum;
  }

  megrendel(): void {//tényleges rendelés, hatása van az adatbázisra
    this.rendeles();
    this.id = + this.route.parent.snapshot.paramMap.get('id');
    for (let i = 0; i < this.toBeOrdered.length; i++){
        this.food_order = { table_order_id: this.id, food_id: this.toBeOrdered[i].id, quantity: this.toBeOrdered[i].quantity};
        this.food_orderService.addFood_order(this.food_order).subscribe();
      }
    }
  
  goBack(): void {
		this.location.back();
	}
}
