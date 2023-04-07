import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ICustomerRepository from "../../../domain/customer/repository/customer.repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase{
    private _customerRepository: ICustomerRepository;


    constructor(customerRepository : ICustomerRepository) {
        this._customerRepository = customerRepository;        
    }

    async execute (input: InputUpdateCustomerDto) : Promise<OutputUpdateCustomerDto>
    {
        const customerToBeUpdated = await this._customerRepository.find(input.id);

        customerToBeUpdated.changeAddress(new Address(input.address.street, input.address.zip, input.address.city, input.address.number));

        customerToBeUpdated.changeName(input.name);

        await this._customerRepository.update(customerToBeUpdated);

        return {
            id: customerToBeUpdated.id,
            name: customerToBeUpdated.name,
            address: {
                street: customerToBeUpdated.Address.street,
                city: customerToBeUpdated.Address.city,
                number: customerToBeUpdated.Address.number,
                zip: customerToBeUpdated.Address.zipCode,
            }
        }
    }
}