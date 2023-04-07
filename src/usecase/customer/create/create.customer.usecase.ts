import Customer from "../../../domain/customer/entity/customer";
import ICustomerRepository from "../../../domain/customer/repository/customer.repository.interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import Address from '../../../domain/customer/value-object/address';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';

export default class CreateCustomerUseCase {
    private _customerRepository: ICustomerRepository;


    constructor(customerRepository : ICustomerRepository) {
        this._customerRepository = customerRepository;        
    }

    async execute (input: InputCreateCustomerDto) : Promise<OutputCreateCustomerDto>
    {
        const address = new Address(input.address.street, input.address.zip, input.address.city, input.address.number);
        const newCustomer = CustomerFactory.createWithAddress(input.name, address);

        await this._customerRepository.create(newCustomer);

        return {
            id: newCustomer.id,
            name: newCustomer.name,
            address: {
                street: newCustomer.Address.street,
                city: newCustomer.Address.city,
                number: newCustomer.Address.number,
                zip: newCustomer.Address.zipCode,
            }
        }
    }
}