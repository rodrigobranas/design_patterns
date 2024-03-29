export function calculateFare (segments: any[]) {
	let fare = 0;
	for (const segment of segments) {
		if (!isValidDistance(segment.distance)) throw new Error("Invalid distance");
		if (!isValidDate(segment.date)) throw new Error("Invalid date");
		if (isOvernight(segment.date) && !isSunday(segment.date)) {
			fare += segment.distance * 3.90;
		}
		if (isOvernight(segment.date) && isSunday(segment.date)) {
			fare += segment.distance * 5;
		}
		if (!isOvernight(segment.date) && isSunday(segment.date)) {
			fare += segment.distance * 2.9;
		}
		if (!isOvernight(segment.date) && !isSunday(segment.date)) {
			fare += segment.distance * 2.10;
		}
	}
	return (fare < 10) ? 10 : fare;
}

function isValidDistance (distance: number) {
	return distance != null && distance != undefined && typeof distance === "number" && distance > 0;
}

function isValidDate (date: Date) {
	return date != null && date != undefined && date instanceof Date && date.toString() !== "Invalid Date";
}

function isOvernight (date: Date) {
	return date.getHours() >= 22 || date.getHours() <= 6;
}

function isSunday (date: Date) {
	return date.getDay() === 0;
}
