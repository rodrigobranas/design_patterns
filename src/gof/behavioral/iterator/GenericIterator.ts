import Iterator from "./Iterator";

export default class GenericIterator implements Iterator {
	position: number;

	constructor (readonly elements: any[]) {
		this.position = 0;
	}

	next() {
		return this.elements[this.position++];
	}

	hasNext(): boolean {
		return this.position < this.elements.length;
	}

}
