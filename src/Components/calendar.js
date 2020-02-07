import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import CalendarModal from './calendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

class CalendarWrapper extends React.Component {
  state = {
    openModal: false,
    clickedEvent: {},
    isNew: false,
  }

  onEventClick = (event, isNew = false) => {
    const eventObj = {
      openModal: true,
      clickedEvent: event,
      isNew: isNew
    };

    this.setState(eventObj)
  }

  handleCloseModal = () => {
    this.setState({
      openModal: false,
      clickedEvent: {}
    })
  }

  render() {
    const {
      openModal,
      clickedEvent,
      isNew,
    } = this.state

    return(
      <div>
        <Calendar
          selectable
          localizer={localizer}
          events={this.props.events}
          startAccessor="start"
          endAccessor="end"
          style={{height: 600, width: 600}}
          onSelectEvent={(event) => {this.onEventClick(event)}}
          onSelectSlot={(event) => {this.onEventClick(event, true)}}
        />
        <CalendarModal 
          open={openModal} 
          event={clickedEvent} 
          handleCloseModal={this.handleCloseModal}
          isNew={isNew}
        />
      </div>
    )
  }
}

module.exports = CalendarWrapper