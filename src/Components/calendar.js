import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);


const calendar = props => (
  <div>
    <Calendar
      localizer={localizer}
      events={props.events}
      startAccessor="start"
      endAccessor="end"
      style={{height: 600, width: 600}}
    />
  </div>
)

module.exports = calendar
