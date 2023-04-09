import { toXML } from 'jstoxml'
import { OutputFindAllCustomerDto } from '../../../usecase/customer/find-all/find-all.customer.dto';

export default class CustomerPresenter {
    static listXMl(data: OutputFindAllCustomerDto) : string
    {
        const xmlOptions = {
            header: true,
            indent: "   ",
            newLine: "\n",
            allowEmpty: true
        }

        return toXML({
            customers: data.customers.map((customer)=>({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    number: customer.address.number,
                    zip: customer.address.zip,
                    city: customer.address.city,
                }
            }))
        }, xmlOptions);
    }
}