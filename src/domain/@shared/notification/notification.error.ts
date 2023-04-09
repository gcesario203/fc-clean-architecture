export default class NotificationError extends Error {
    constructor(public errorMessage: string) {
        super(errorMessage);
    }
}