import { Component } from '@angular/core';
import { Drink } from "src/app/models/drink";
import { DrinkService } from "src/app/services/drink.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-main",
  templateUrl: "./main.page.html",
  styleUrls: ["./main.page.scss"]
})
export class MainPage {

  drinks: Drink[] = [];
  drink: Drink;
  index: number;
  isClicked: boolean = false;
  type: string = "";
  search: string = "";
  showAdvanced: boolean = false;
  showFavorites: boolean = false;

  selectedColor: string = "medium";
  starColor: string = "medium";

  favorites: Drink[] = [];

  min: number = 0;
  max: number = 100;

  precio: number = 100;

  copia: Drink[];

  constructor(private drinkService: DrinkService, public alertController: AlertController) {
    this.getDrinks();
  }

  getDrinks() {
    this.drinkService.getDrinks().subscribe(
      data => {
        this.drinks = data;
        this.copia = data;
      }
    );
  }

  showDetails(id: number) {
    this.index = this.drinks.findIndex(d => d.id == id);
    this.isClicked = !this.isClicked;
  }

  showFilter() {
    this.showAdvanced = !this.showAdvanced;
    if (this.showAdvanced) {
      this.selectedColor = "light";
    } else {
      this.selectedColor = "medium";
    }
  }
  
  toggleFavorites(drink: Drink) {
    if(!drink.favorite) {
      this.drinkService.addToFavoriteDrinks(drink);
      console.log(this.drinkService.favoriteDrinks);
    } else {
      this.presentAlertConfirm(drink);
    }
  }

  async presentAlertConfirm(drink: Drink) {
    const alert = await this.alertController.create({
      header: 'Eliminar '  + drink.name + ' de favoritos',
      message: '¿Seguro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Sí',
          handler: () => {
            this.drinkService.deleteFromFavoriteDrinks(drink);
            console.log(this.drinkService.favoriteDrinks);
            this.showEverything();
          }
        }
      ]
    });
    await alert.present();
  }

  showOnlyFavorites() {
    this.isClicked = false;
    if (!this.showFavorites) {
      this.drinks = this.drinkService.favoriteDrinks;
    } else if (this.showFavorites) {
      this.drinks = this.copia;
    }
    this.showFavorites = !this.showFavorites;
  }
  showEverything() {
    if (this.showFavorites) {
      this.drinks = this.drinkService.favoriteDrinks;
    } else if (!this.showFavorites) {
      this.drinks = this.copia;
    }
  }
}
