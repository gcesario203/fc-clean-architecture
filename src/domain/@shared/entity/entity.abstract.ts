import Notification from "../notification/notification";
import NotificationError from "../notification/notification.error";

export default abstract class Entity {
    protected _id: string;
    protected notification: Notification;

    constructor() {
        this.notification = new Notification();
    }

    protected throwErrorIfHasAtLeastOne() {    
        if (this.notification.hasErrors())
            throw new NotificationError(this.notification.messages());
    }

    get id(): string {
        return this._id;
    }
}