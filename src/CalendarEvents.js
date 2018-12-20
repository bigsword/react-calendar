class CalendarEvents {
	constructor () {
		//this.events = [];
		//this.events[0] = {
	//						date: new Date(2018, 11, 18), 
	//						type: ['holiday', 'birthday']
	//					};
		
		this.events = {};
		this.events[new Date(2018, 11, 18).getTime()] =  ['holiday', 'birthday'];

	}

	_notify () {
		// TODO inform the subscribers.
	}

	getEvents (date) {
		/*
		let record = this.events.find(function(element) {
			return element.date.getTime() === date.getTime()
		});

		return record ? record.type:[];
		*/
		return this.events[date.getTime()] ? this.events[date.getTime()] : [];
	}

	// TODO
	setEvents (date, events) {
		this.events[date.getTime()] = events;
		this._notify();
	}
}

export default CalendarEvents;

