async function main (invoice: any) {
	let totalPurchases = 0;
	let totalEvents = 0;
	let totalPayments = 0;
	for (const purchase of invoice.purchases) {
		totalEvents += purchase.amount;
		totalPurchases += purchase.amount;
	}
	for (const penalty of invoice.penalties) {
		totalEvents += penalty.amount;
	}
	for (const interest of invoice.interests) {
		totalEvents += interest.amount;
	}
	for (const payment of invoice.payments) {
		totalPayments += payment.amount;
	}
	if (totalEvents !== totalPayments) throw new Error("");
	let total = 0;
	let sharedPayments = [];
	const events: any = [];
	for (const purchase of invoice.purchases) {
		const share = purchase.amount/totalPurchases;
		events.push(purchase);
		for (const penalty of invoice.penalties) {
			const purchasePenalty = penalty.amount * share;
			events.push({
				type: "penalty",
				amount: purchasePenalty,
				parent: purchase
			});
		}
		for (const interest of invoice.interests) {
			const purchaseInterest = interest.amount * share;
			events.push({
				type: "interest",
				amount: purchaseInterest,
				parent: purchase
			});
		}
	}
	const payments = [];
	for (const payment of invoice.payments) {
		const share = payment.amount/totalEvents;
		for (const event of events) {
			const eventPayment = event.amount * share;
			payments.push({
				type: "payment",
				amount: eventPayment,
				parent: event
			});
		}
	}
	events.push(...payments);
	console.log(events);
	console.log(payments[11].type);
	console.log(payments[11].parent.type);
	console.log(payments[11].parent.parent.type);
}

const invoice = {
	month: 1,
	year: 2022,
	purchases: [
		{ type: "purchase", amount: 1000 },
		{ type: "purchase", amount: 500 }
	],
	penalties: [
		{ type: "penalty", amount: 100 }
	],
	interests: [
		{ type: "interest", amount: 100 }
	],
	payments: [
		{ type: "payment", amount: 1200 },
		{ type: "payment", amount: 500 }
	]
}
main(invoice);
