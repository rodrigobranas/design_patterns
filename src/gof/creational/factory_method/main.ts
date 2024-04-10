import crypto from "crypto";

export class CalculateFare {

	constructor (readonly rideRepository: RideRepository, readonly segmentRepository: SegmentRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const ride = await this.rideRepository.getById(input.rideId);
		const segments = await this.segmentRepository.listByRideId(input.rideId);
		const fare = ride.calculateFare(segments);
		return {
			fare
		}
	}
}

type Output = {
	fare: number
}

export class UpdateLocation {

	constructor (readonly rideRepository: RideRepository, readonly segmentRepository: SegmentRepository) {
	}

	async execute (input: Input): Promise<void> {
		const ride = await this.rideRepository.getById(input.rideId);
		const newLocation = new Location(new Coord(input.lat, input.long), input.date);
		const segment = ride.createSegment(ride.lastLocation, newLocation);
		ride.updateLocation(newLocation);
		await this.rideRepository.update(ride);
		await this.segmentRepository.save(segment);
	}
}

type Input = {
	rideId: string,
	lat: number,
	long: number,
	date: Date
}

export interface RideRepository {
	getById (rideId: string): Promise<Ride>;
	save (ride: Ride): Promise<void>;
	update (ride: Ride): Promise<void>
}

export class RideRepositoryMemory implements RideRepository {
	rides: Ride[];

	constructor () {
		this.rides = [];
	}

	async getById(rideId: string): Promise<Ride> {
		const ride = this.rides.find((ride: Ride) => ride.rideId === rideId);
		if (!ride) throw new Error("Ride not found");
		return ride;
	}

	async save(ride: Ride): Promise<void> {
		this.rides.push(ride);
	}

	async update(ride: Ride): Promise<void> {
		const index = this.rides.findIndex((r: Ride) => r.rideId === ride.rideId);
		this.rides[index] = ride;
	}

}

export interface SegmentRepository {
	save (segment: Segment): Promise<void>;
	listByRideId (rideId: string): Promise<Segment[]>;
}

export class SegmentRepositoryMemory implements SegmentRepository {
	segments: Segment[];

	constructor () {
		this.segments = [];
	}

	async save(segment: Segment): Promise<void> {
		this.segments.push(segment);
	}

	async listByRideId(rideId: string): Promise<Segment[]> {
		return this.segments.filter((segment: Segment) => segment.rideId === rideId);
	}

}

export abstract class Ride {
	lastLocation: Location;

	constructor (readonly rideId: string, lat: number, long: number, date: Date) {
		this.lastLocation = new Location(new Coord(lat, long), date);
	}

	abstract createSegment (from: Location, to: Location): Segment;

	abstract calculateFare (segments: Segment[]): number;

	updateLocation (location: Location) {
		this.lastLocation = location;
	}

}

export class DistanceRide extends Ride {

	constructor (rideId: string, lat: number, long: number, date: Date) {
		super(rideId, lat, long, date);
	}

	createSegment(from: Location, to: Location): Segment {
		return new DistanceSegment(this.rideId, from, to);
	}

	calculateFare(segments: DistanceSegment[]): number {
		let total = 0;
		for (const segment of segments) {
			total += segment.getDistance();
		}
		return total * 4;
	}

	static create (lat: number, long: number, date: Date) {
		const rideId = crypto.randomUUID();
		return new DistanceRide(rideId, lat, long, date);
	}

}

export class TimeRide extends Ride {

	constructor (rideId: string, lat: number, long: number, date: Date) {
		super(rideId, lat, long, date);
	}

	createSegment(from: Location, to: Location): Segment {
		return new TimeSegment(this.rideId, from, to);
	}

	calculateFare(segments: TimeSegment[]): number {
		let total = 0;
		for (const segment of segments) {
			total += segment.getDurationInMinutes();
		}
		return total * 1;
	}

	static create (lat: number, long: number, date: Date) {
		const rideId = crypto.randomUUID();
		return new TimeRide(rideId, lat, long, date);
	}

}

export abstract class Segment {

	constructor (readonly rideId: string) {
	}
}

export class DistanceSegment extends Segment {
	from: Coord;
	to: Coord;

	constructor (rideId: string, from: Location, to: Location) {
		super(rideId);
		this.from = from.coord;
		this.to = to.coord;
	}

	getDistance () {
		const earthRadius = 6371;
		const degreesToRadians = Math.PI / 180;
		const deltaLat = (this.to.getLat() - this.from.getLat()) * degreesToRadians;
		const deltaLon = (this.to.getLong() - this.from.getLong()) * degreesToRadians;
		const a =
			Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
			Math.cos(this.from.getLat() * degreesToRadians) *
			Math.cos(this.to.getLat() * degreesToRadians) *
			Math.sin(deltaLon / 2) *
			Math.sin(deltaLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return Math.round(earthRadius * c);
	}
}

export class TimeSegment extends Segment {
	from: Date;
	to: Date;

	constructor (rideId: string, from: Location, to: Location) {
		super(rideId);
		this.from = from.date;
		this.to = to.date;
	}

	getDurationInMinutes () {
		return (this.to.getTime() - this.from.getTime()) / (1000*60);
	}
}

export class Location {
	constructor (readonly coord: Coord, readonly date: Date) {
	}
}

export class Coord {
	constructor (readonly lat: number, readonly long: number) {
		if (lat < -90 || lat > 90) throw new Error("Invalid latitude");
		if (long < -180 || long > 180) throw new Error("Invalid Longitude");
	}

	getLat () {
		return this.lat;
	}

	getLong () {
		return this.long;
	}

}
