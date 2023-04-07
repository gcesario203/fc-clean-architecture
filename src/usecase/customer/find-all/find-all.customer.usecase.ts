import Customer from "../../../domain/customer/entity/customer";
import ICustomerRepository from "../../../domain/customer/repository/customer.repository.interface";
import { InputFindAllCustomerDto, OutputFindAllCustomerDto } from "./find-all.customer.dto";

export default class FindAllCustomersUseCase {
    private _customerRepository: ICustomerRepository;


    constructor(customerRepository: ICustomerRepository) {
        this._customerRepository = customerRepository;
    }

    async execute(input: InputFindAllCustomerDto): Promise<OutputFindAllCustomerDto> {
        const foundCustomers = await this._customerRepository.findAll();

        return OutputMapper.toOutput(foundCustomers);
    }
}

class OutputMapper {
    static toOutput(foundCustomers: Customer[]): OutputFindAllCustomerDto {
        return {
            customers: foundCustomers.map(customer => ({
                id: customer.id,
                name: customer.name,
                address: {
                    city: customer.Address.city,
                    street: customer.Address.street,
                    number: customer.Address.number,
                    zip: customer.Address.zipCode,
                }
            }))
        }
    }
}