import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);


const Index = props => (
  <div>
    <Calendar
      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
      style={{height: 500, width: 400}}
    />
  </div>
)

module.exports = Index
