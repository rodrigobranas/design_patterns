export default interface FareCalculator {
	calculate (checkinDate: Date, checkoutDate: Date): number;
}

export class AirportFareCalculator implements FareCalculator {

	calculate(checkinDate: Date, checkoutDate: Date): number {
		const diff = (checkoutDate.getTime() - checkinDate.getTime())/(1000*60*60);
		return diff * 10;
	}

}

export class ShoppingFareCalculator implements FareCalculator {

	calculate(checkinDate: Date, checkoutDate: Date): number {
		const diff = (checkoutDate.getTime() - checkinDate.getTime())/(1000*60*60);
		let fare = 10;
		const remainingHours = diff - 3;
		if (remainingHours > 0) fare += remainingHours * 10;
		return fare;
	}

}

export class BeachFareCalculator implements FareCalculator {

	calculate(checkinDate: Date, checkoutDate: Date): number {
		return 10;
	}

}

export class PublicFareCalculator implements FareCalculator {

	calculate(checkinDate: Date, checkoutDate: Date): number {
		return 0;
	}

}

export class FareCalculatorFactory {
	static create (location: string): FareCalculator {
		if (location === "airport") return new AirportFareCalculator();
		if (location === "shopping") return new ShoppingFareCalculator();
		if (location === "beach") return new BeachFareCalculator();
		if (location === "public") return new PublicFareCalculator();
		throw new Error("Location not found");
	}

}
