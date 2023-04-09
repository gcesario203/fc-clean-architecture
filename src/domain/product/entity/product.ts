import Entity from "../../@shared/entity/entity.abstract";
import ProductValidatorFactory from "../factory/product.validator.factory";
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
        ProductValidatorFactory.create().validate(this);

        this.throwErrorIfHasAtLeastOne();
    }
}