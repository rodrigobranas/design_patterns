import Segment from "./Segment";

export default interface FareCalculator {
	next?: FareCalculator;
	calculate (segment: Segment): number;
}

export class NormalFareCalculator implements FareCalculator {
	FARE = 2.1;

	constructor (readonly next?: FareCalculator) {
	}

	calculate(segment: Segment): number {
		if (!segment.isOvernight() && !segment.isSunday()) {
			return segment.distance * this.FARE;
		}
		if (!this.next) throw new Error();
		return this.next.calculate(segment);
	}

}

export class OvernightFareCalculator implements FareCalculator {
	FARE = 3.9;

	constructor (readonly next?: FareCalculator) {
	}

	calculate(segment: Segment): number {
		if (segment.isOvernight() && !segment.isSunday()) {
			return segment.distance * this.FARE;
		}
		if (!this.next) throw new Error();
		return this.next.calculate(segment);
	}

}

export class SundayFareCalculator implements FareCalculator {
	FARE = 2.9;

	constructor (readonly next?: FareCalculator) {
	}

	calculate(segment: Segment): number {
		if (!segment.isOvernight() && segment.isSunday()) {
			return segment.distance * this.FARE;
		}
		if (!this.next) throw new Error();
		return this.next.calculate(segment);
	}

}

export class OvernightSundayFareCalculator implements FareCalculator {
	FARE = 5;

	constructor (readonly next?: FareCalculator) {
	}

	calculate(segment: Segment): number {
		if (segment.isOvernight() && segment.isSunday()) {
			return segment.distance * this.FARE;
		}
		if (!this.next) throw new Error();
		return this.next.calculate(segment);
	}

}