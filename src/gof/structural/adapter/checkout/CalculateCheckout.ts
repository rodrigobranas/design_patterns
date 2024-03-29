import CatalogGateway from "./CatalogGateway"
import Order from "./Order";

export default class CalculateCheckout {

	constructor (readonly catalogGateway: CatalogGateway) {
	}

	async execute (input: Input): Promise<Output> {
		const order = new Order();
		for (const item of input.items) {
			const product = await this.catalogGateway.getProduct(item.productId);
			order.addProduct(product, item.quantity);
		}
		const total = order.getTotal();
		return {
			total
		};
	}
}

type Input = {
	items: { productId: number, quantity: number }[]
}

type Output = {
	total: number
}
