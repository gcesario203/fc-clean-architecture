import Entity from "../../@shared/entity/entity.abstract";
import ProductInterface from "./product.interface";

export default class ProductDoubledValue extends Entity implements ProductInterface {
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        super();
        this._id = id;
        this._name = name;
        this._price = price;

        this.validate();
    }

    changeName(name: string): void {
        this._name = name;

        this.validate();
    }
    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    changePrice(price: number): void {
        this._price = price;

        this.validate();
    }

    get price() : number{
        return this._price * 2;
    }

    // set name(value : string){
    //     this;this._name = value;
    // }

    validate() {
        if (!!!this._id)
            throw Error('Id is required');

        if (!!!this._name)
            throw Error('Name is required');

        if (this._price <= 0)
            throw Error('The price is less or equals 0');
    }
}