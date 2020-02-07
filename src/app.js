/* global chrome */

import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Components/calendar';
import axios from 'axios';

type Props = {||};

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
			const schedule = [];
			response.data.items.map((event) => {
				schedule.push({
					start: event.start.dateTime || event.start,
					end: event.end.dateTime || event.end,
					title: event.summary
				})
			})
			this.setState({
				events: schedule
			})
			console.log('events', this.state.events)
		}).catch(e => {
			console.error(e)
		}) 
	}

	componentDidMount = () => {
		this.auth()
	}

	render() {

		return (
      <Calendar events={this.state.events}/>
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
