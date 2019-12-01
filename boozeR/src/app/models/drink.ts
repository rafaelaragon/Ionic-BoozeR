export class Drink {
    id: number;
    name: string;
    vol: number;
    img: string;
    type: string;
    price: number;
    favorite: boolean;

    constructor(id: number, name: string, vol: number, img: string, type: string, price: number, favorite: boolean) {
        this.id = id;
        this. name = name;
        this.vol = vol;
        this.img = img;
        this.type = type;
        this.price = price;
        this.favorite = favorite;
    }
}
