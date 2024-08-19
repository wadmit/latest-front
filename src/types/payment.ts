export interface IPayment {
	student: string;
	payment_id: string;
	stripe_id: string;
	payment_intend_id: string;
	cost: number;
	items: PaymentItem[];
	payment_status: string;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
	id: string;
}

export interface PaymentItem {
	cost: number;
	product_id: string;
	quantity: number;
	createdAt: Date;
	updatedAt: Date;
	id: string;
}
