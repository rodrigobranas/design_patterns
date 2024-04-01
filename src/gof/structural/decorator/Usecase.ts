export default interface Usecase {
	execute (input: any): Promise<any>;
}
