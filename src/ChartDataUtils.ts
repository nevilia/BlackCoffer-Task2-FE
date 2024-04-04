
interface Item {
    name: string;
    tags: string[];
    price: number;
    quantity: number;
}

interface Customer {
    gender: 'M' | 'F';
    age: number;
    email: string;
    satisfaction: number;
}

export interface Purchase {
    saleDate: Date;
    items: Item[];
    storeLocation: string;
    customer: Customer;
    couponUsed: boolean;
    purchaseMethod: 'Online' | 'In store' | 'Phone';
}
