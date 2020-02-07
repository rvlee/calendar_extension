/* global chrome */

import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Components/calendar';
import axios from 'axios';
import test from './test';

const calendarAPIUrl = 'https://www.googleapis.com/calendar/v3/calendars/primary/events'

class App extends React.Component<Props> {
	state = {
		authToken: '',
		events: []
	}

	auth = () => {
		chrome.identity.getAuthToken({interactive: true}, (token) => {
			this.setState({
				authToken: token
			})
			this.getCalendar()
		})
	}

	getTime = (year) => {
		const date = new Date()
		date.setYear(date.getFullYear() + year)
		return date.toISOString();
	}

	getCalendar = () => {
		const timeMax = this.getTime(1)
		const timeMin = this.getTime(-1)

		axios.get(`${calendarAPIUrl}?
			access_token=${this.state.authToken}&
			orderBy=starttime&
			singleEvents=true&
			timeMax=${timeMax}&
			timeMin=${timeMin}
			`
		).then(response => {
			this.setState({
				events: this.createEvents(response.data.items)
			})
		}).catch(e => {
			console.error(e)
		}) 
	}

	createEvents = (events) => {
		return events.map((event) => {
			return {
				start: new Date(event.start.dateTime),
				end: new Date(event.end.dateTime),
				title: event.summary,
				eventData: event,
			}
		})
	}

	testingPurpose = () => {
		this.setState({
			events: this.createEvents(test.items)
		})
	}

	componentDidMount = () => {
		//this.auth()
		this.testingPurpose();
	}

	render() {
		return (
      <Calendar
				events={this.state.events}
			/>
		)
	}
}

const dom = document.getElementById('App')
if (dom === null) {
	//Error
	console.error("dom does not exist")
} else {
	ReactDOM.render(<App />, dom);
}
