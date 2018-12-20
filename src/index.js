import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EventEditor from './components/EventEditor.js';
import './index.css';
import CalendarEvents from './CalendarEvents.js';

let g_calendarEvents = new CalendarEvents();

//let r = g_calendarEvents.getEvents(new Date(2018, 11, 18));
//console.log(r);
// TODO need to implement set event function.
// how to get informed when things change?? observer??

class Day extends React.Component {
	constructor (props) {
		super(props);
	
    	this.state = {
			showEventEditor: false,
			holiday: false,
			birthday: false,
			busy: false,
			anniversary: false,
		};

		this.date = new Date(this.props.year, this.props.month, this.props.day);

		this.events = g_calendarEvents.getEvents(this.date);
		this.events.forEach( element => this.state[element] = true);
	}

	_isToday () {
		let today = new Date();

		if (this.props.day !== today.getDate()) {
			return false;
		}

		if (this.props.month !== today.getMonth()) {
			return false;
		}

		if (this.props.year !== today.getYear() + 1900) {
			return false;
		}

		return true;
	}

	_isWeekend() {
		let day = new Date(this.props.year, this.props.month, this.props.day).getDay();

		return (day === 0) || (day === 6);
	}

	_getEvents() {
		let events = [];

		if (this.state.holiday) events.push('holiday') ;
		if (this.state.birthday) events.push('birthday') ;
		if (this.state.busy) events.push('busy') ;
		if (this.state.anniversary) events.push('anniversary') ;

		return events;
	}

	handleClick = () => {
		this.setState({showEventEditor: true});
	}

	toggleEventEditor = () => {
		this.setState(state => ({
        showEventEditor: !state.showEventEditor
      }));
	}

	toggleEvent = key => event => {
		this.setState({[key]: event.target.checked });

		// update the events here.
		//
		g_calendarEvents.setEvents(this.date, this._getEvents());
	}

	componentDidMount () {
		//if (this.date.getTime() === g_calendarEvents.events[0].date.getTime()) {
			//console.log(g_calendarEvents.events[0].date.toString());
		//}
	}

	render () {
		const today = this._isToday() ? 'today' : '';
		const weekend = this._isWeekend() ? 'weekend' : '';

		const holiday = this.state.holiday ? 'holiday' : '';
		const birthday = this.state.birthday ? 'birthday' : '';
		const busy = this.state.busy ? 'busy' : '';
		const anniversary = this.state.anniversary ? 'anniversary' : '';

		let className = `square ${holiday} ${birthday} ${busy} ${anniversary} ${weekend} ${today}`;


		return (
			<div>
			<button className={className} onClick={this.handleClick}>
        		{this.props.day}
      		</button>
      		{this.state.showEventEditor && <EventEditor events={this.state} open={this.state.showEventEditor} 
				toggleEventEditor={this.toggleEventEditor} 
				toggleEvent={this.toggleEvent}/>}
      		</div>
		);
	}
}


class Month extends React.Component {
	constructor (props) {
		super(props);

		this.captions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	}

	_getLastDayOfMonth () {
		let lastDay = 28;
		while (this.props.month === new Date(this.props.year, this.props.month, lastDay).getMonth()) {
			lastDay++;
		}

		return lastDay - 1;
	}

	_renderDay (day) {
		if (day === 0) {
			return (
				<td>&nbsp;</td>
			);
		} else {
			const key = this.props.year.toString() + this.props.month.toString() + day.toString();
			return (
				<td key={key}><Day year={this.props.year} month={this.props.month} day={day} /></td>
			);
		}
	}

	_renderWeek (slots, index) {
		let week = [];
		for (let i = 0; i < 7; i++) {
			week.push(this._renderDay(slots[index + i]));
		}

		return (
			<tr>
				{week}
			</tr>
		);
	}

	render () {
		let leadingEmpty = new Date(this.props.year, this.props.month, 1).getDay();

		let lastDay = this._getLastDayOfMonth();
		let tailingEmpty = 6 - new Date(this.props.year, this.props.month, lastDay).getDay();

		let slots = new Array(leadingEmpty + lastDay + tailingEmpty).fill(0);
		for (let i = 0; i < lastDay; i++) {
			slots[leadingEmpty + i] = i + 1;
		}

		//console.log(slots);
		//console.log(this.props.events);

		let weeks = [];
		for ( let i = 0; i < slots.length / 7; i++) {
			weeks.push(this._renderWeek(slots, i * 7));
		}

		return (
			<Grid item xs={6} sm={4} md={3} container justify="center">
				<table>
					<caption>{this.captions[this.props.month]}</caption>
					<tbody>
						<tr className={"table-header"}><th>Su</th><th>M</th><th>Tu</th><th>W</th><th>Th</th><th>F</th><th>Sa</th></tr>
						{weeks}
					</tbody>
				</table>
			</Grid>
		);
	}
}


class Calendar extends React.Component {
	constructor (props) {
		super(props);

    	this.state = {
			year: 2018,
			yearInput: 2018,
		};
	}

	resetYear = () => {
	 	this.setState({
	      year: 2018,
	      yearInput: 2018,
	    });
	 };

	 handleYearChange = event => {
		let userInput = parseInt(event.target.value);	

	 	if ( userInput > 1900 && userInput < 3000 && userInput % 1 === 0) {
	    	this.setState({
				yearInput: userInput,
	      		year: userInput,
	      	});
		} else {
			this.setState({
				yearInput: userInput,
			});
		}
	 };


	render () {
		let months = [];
		for (let i = 10; i < 12; i++) {
			months.push(<Month year={this.state.year} month={i} /*key={i}*//>)
		}

		return (
			<Grid container justify="center" spacing={16}>
				<Grid item xs={12}>
					<Grid container justify="center" alignItems="flex-end">
						<TextField
				          id="year-picker"
				          label="Please select a Year:"
				          value={this.state.yearInput}
				          onChange={this.handleYearChange}
				          type="number"
				          //className={classes.textField}
				          InputLabelProps={{
				            shrink: true,
				          }}
				          margin="normal"
		        		/>
						<Button onClick={this.resetYear} size={"small"}>reset</Button>
					</Grid>
				</Grid>

				<Grid item xs={12} >
					<Grid container justify="space-around" spacing={16} key={this.state.year} >
						{months}				
					</Grid>
				</Grid>
			</Grid>
		);
	}
}


ReactDOM.render(<Calendar />, document.getElementById('root'));

