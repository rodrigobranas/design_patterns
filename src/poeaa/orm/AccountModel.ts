import { Model, column, model } from "./ORM";

@model("cccat16", "account")
export default class AccountModel extends Model {
	@column("account_id", true)
	accountId: string;
	@column("name")
	name: string;
	@column("email")
	email: string;
	@column("cpf")
	cpf: string;
	@column("car_plate")
	carPlate: string;

	constructor (accountId: string, name: string, email: string, cpf: string, carPlate: string) {
		super();
		this.accountId = accountId;
		this.name = name;
		this.email = email;
		this.cpf = cpf;
		this.carPlate = carPlate;
	}

}
