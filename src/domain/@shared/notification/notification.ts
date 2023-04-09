export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification {
    private _errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps){
        this._errors.push(error);
    }

    messages(context?: string) : string {
        const errorsFilteredByContext = !!context ? this._errors.filter(error => error.context == context) : this._errors;

        if(!errorsFilteredByContext || errorsFilteredByContext.length === 0)
            return;

        return errorsFilteredByContext.map(error => `${error.context}: ${error.message}`)
                                      .join(", ")
    }

    hasErrors() : boolean{
        return this._errors.length > 0;
    }

    get errors(): NotificationErrorProps[] {
        return this._errors;
    }
}