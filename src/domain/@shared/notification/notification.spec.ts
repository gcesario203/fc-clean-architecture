import Notification from "./notification";


describe("Unit tests for notifications", () => {

    it("should create errors", () => {
        const notification = new Notification();

        const errorOne = {
            message: "error message",
            context: "customer"
        }
        const errorTwo = {
            message: "error message 2",
            context: "customer"
        }

        const errorThree = {
            message: "error message 3",
            context: "order"
        }

        notification.addError(errorOne);
        notification.addError(errorTwo);
        notification.addError(errorThree);

        expect(notification.messages("customer")).toBe("customer: error message, customer: error message 2");

        expect(notification.messages("order")).toBe("order: error message 3")


        expect(notification.messages()).toBe("customer: error message, customer: error message 2, order: error message 3");
    })
});