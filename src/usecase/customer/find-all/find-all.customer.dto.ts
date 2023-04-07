export interface InputFindAllCustomerDto {

}

type Customer = {
    id: string,
    name: string,
    address: {
        city: string;
        street: string;
        number: number;
        zip: string;
    }
}

export interface OutputFindAllCustomerDto{
    customers: Customer[];
}