import React from 'react';
import {
  DATE,
  TEXT
} from '../constants/form';
import DatePicker from "react-datepicker";

export default ({canEdit, type, keyVal, value, onChange}) => {
  let cp = (<div>{String(value)}</div>)
  if (canEdit) {
    switch (type) {
      case DATE:
        cp = <DatePicker
          selected={new Date(value)}
          onChange={(date) => {onChange(keyVal, date)}}
          showTimeSelect
          dateFormat="MM/dd/yyyy HH:mm:ss"
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
        />
        break;
      case TEXT:
        cp = (
          <input 
            type={type} 
            onChange={(e) => { onChange(keyVal, e.target.value) }} 
            value={value} 
          />
        )
        break;
      default:
        break;
    }
  }
  return cp
}