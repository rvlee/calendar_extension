import React from 'react';
import {
  DATE,
  TEXT
} from '../constants/form';
import DatePicker from "react-datepicker";
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import '../css/formFactory.css';

export default ({canEdit, config: { type, keyVal, label }, value, onChange}) => {
  let cp = (<div>{String(value)}</div>)
  //if (canEdit) {
    switch (type) {
      case DATE:
        cp = (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label={`${label} Date`}
              value={value}
              onChange={(val) => { onChange(keyVal, val)}}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label={`${label} Time`}
              value={value}
              onChange={(val) => { onChange(keyVal, val)}}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        )
        break;
      case TEXT:
        cp = (
          <TextField
            id="filled-secondary"
            label={label}
            variant="standard"
            onChange={(e) => { onChange(keyVal, e.target.value) }} 
            value={value}
            fullWidth
            disabled={!canEdit}
          />
        )
        break;
      default:
        break;
    }
  //}
  return cp
}