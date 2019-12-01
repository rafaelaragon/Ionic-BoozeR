import { Injectable } from "@angular/core";
import { Drink } from "../models/drink";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: "root"
})
export class DrinkService {
  drinks: Drink[];
  favoriteDrinks: Drink[];

  constructor(private httpClient: HttpClient, private storage: Storage) {
    this.getDrinks().subscribe(data => {
      this.drinks = data;
      data.forEach(d => {
        d.favorite = false;
      });
    });
    this.getFavoriteDrinks().then(
      data => (this.favoriteDrinks = data == null ? [] : data)
    );
  }

  getDrinks(): Observable<any> {
    return this.httpClient.get("assets/drinks.json");
  }
  S
  getDrink(id: number) {
    return this.drinks.filter(f => f.id == id);
  }

  getFavoriteDrinks(): Promise<Drink[]> {
    return this.storage.get("favorites");
  }

  addToFavoriteDrinks(drink: Drink): Promise<boolean> {
    drink.favorite = true;
    this.favoriteDrinks.push(drink);
    return this.storage.set("favoriteDrinks", this.favoriteDrinks);
  }

  deleteFromFavoriteDrinks(drink: Drink): Promise<boolean> {
    drink.favorite = false;
    this.favoriteDrinks = this.favoriteDrinks.filter(fav => fav.favorite);
    return this.storage.set("favoriteDrinks", this.favoriteDrinks);
  }

}
