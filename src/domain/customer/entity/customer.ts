import Entity from "../../@shared/entity/entity.abstract";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity {
    private _name: string;
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();

        this._id = id;

        this._name = name;

        this.validate();
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get name(): string {
        return this._name;
    }


    validate() {
        CustomerValidatorFactory.create().validate(this);

        this.throwErrorIfHasAtLeastOne();
    }

    set name(name: string) {
        this._name = name;
    }

    changeName(name: string) {
        this._name = name;

        this.validate();
    }

    activate() {
        if (!this._address) {
            this._notification.addError({
                context: "customer",
                message: 'Address is mandatory to activate a costumer'
            })
            this.throwErrorIfHasAtLeastOne();
        }

        this._active = true;
    }

    isActive() {
        return this._active;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    changeAddress(newAddress: Address): Customer {
        this._address = newAddress;

        return this;
    }

    get Address(): Address {
        return this._address;
    }

    set active(value: boolean) {
        this._active = value;
    }
}