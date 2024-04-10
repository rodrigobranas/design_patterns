import RideRepository from "./RideRepository";
import SegmentRepository from "./SegmentRepository";

export default class CalculateFare {

	constructor (readonly rideRepository: RideRepository, readonly segmentRepository: SegmentRepository) {
	}

	async execute (rideId: string): Promise<Output> {
		const ride = await this.rideRepository.getById(rideId);
		const segments = await this.segmentRepository.listByRideId(rideId);
		const fare = ride.calculateFare(segments);
		return {
			fare
		}
		
	}
}
type Output = {
	fare: number
}
