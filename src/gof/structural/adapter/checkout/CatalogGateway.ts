import HttpClient from "./HttpClient";

export default interface CatalogGateway {
	getProduct (productId: number): Promise<ProductDTO>;
}

export type ProductDTO = {
	productId: number,
	description: string,
	price: number
}

export class CatalogGatewayHttp implements CatalogGateway {

	constructor (readonly httpClient: HttpClient) {
	}

	async getProduct(productId: number): Promise<ProductDTO> {
		const response = await this.httpClient.get(`http://localhost:3001/products/${productId}`);
		return response;
	}

}