import AccountModel from "../../../src/poeaa/orm/AccountModel";
import { PgPromiseAdapter } from "../../../src/poeaa/orm/DatabaseConnection";
import ORM from "../../../src/poeaa/orm/ORM";
import crypto from "crypto";

test("Deve testar o ORM", async function () {
	const connection = new PgPromiseAdapter();
	const orm = new ORM(connection);
	const accountId = crypto.randomUUID();
	const account = new AccountModel(accountId, "a", "b", "c", "d");
	await orm.save(account);
	const savedAccount = await orm.get("account_id", accountId, AccountModel);
	console.log(savedAccount);
	await connection.close();
});
