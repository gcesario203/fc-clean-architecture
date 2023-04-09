import Notification from "../notification/notification";
import NotificationError from "../notification/notification.error";

export default abstract class Entity {
    protected _id: string;
    protected _notification: Notification;

    constructor() {
        this._notification = new Notification();
    }

    protected throwErrorIfHasAtLeastOne() {    
        if (this._notification.hasErrors())
            throw new NotificationError(this._notification.messages());
    }

    get id(): string {
        return this._id;
    }

    get notification(): Notification{
        return this._notification;
    }
}