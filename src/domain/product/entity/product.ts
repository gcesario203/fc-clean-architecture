import Entity from "../../@shared/entity/entity.abstract";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {
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

    get name(): string {
        return this._name;
    }

    changePrice(price: number): void {
        this._price = price;

        this.validate();
    }

    get price(): number {
        return this._price;
    }

    // set name(value : string){
    //     this;this._name = value;
    // }

    validate() {
        if (!!!this._id)
            this.notification.addError({
                context: "product",
                message: "Id is required"
            })

        if (!!!this._name)
            this.notification.addError({
                context: "product",
                message: "Name is required"
            })

        if (this._price <= 0)
            this.notification.addError({
                context: "product",
                message: "The price is less or equals 0"
            })

        this.throwErrorIfHasAtLeastOne();
    }
}