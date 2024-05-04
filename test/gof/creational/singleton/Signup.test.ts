import Login from "../../../../src/gof/creational/singleton/Login";
import Signup from "../../../../src/gof/creational/singleton/Signup"

test("Deve fazer um signup", async function () {
	const signup = new Signup();
	const login = new Login();
	const inputSignup = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		password: "123456"
	};
	await signup.execute(inputSignup);
	const inputLogin = {
		email: "john.doe@gmail.com",
		password: "123456"
	}

	const outputLogin = await login.execute(inputLogin);
	expect(outputLogin.isValid).toBe(true);
});
