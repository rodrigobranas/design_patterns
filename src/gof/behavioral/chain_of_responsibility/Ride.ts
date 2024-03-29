import FareCalculator from "./FareCalculator";
import Segment from "./Segment";

export default class Ride {
	private segments: Segment[];
	private fare: number;

	constructor (readonly fareCalculator: FareCalculator) {
		this.segments = [];
		this.fare = 0;
	}
	
	addSegment (distance: number, date: Date) {
		this.segments.push(new Segment(distance, date));
	}

	calculateFare () {
		this.fare = 0;
		for (const segment of this.segments) {
			this.fare += this.fareCalculator.calculate(segment);
		}
		this.fare = (this.fare < 10) ? 10 : this.fare;
	}

	getFare () {
		return this.fare;
	}
}
