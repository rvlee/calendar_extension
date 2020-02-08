import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import DatePicker from "react-datepicker";
import Switch from '@material-ui/core/Switch';

import FormFactory from './formFactory';
import getPath from '../utils/getPath';
import dataFormatter from '../utils/dataFormatter';
import {
  DATE,
  TEXT
} from '../constants/form';

import "react-datepicker/dist/react-datepicker.css";

const style = {
  paper: {
    position: 'absolute',
    width: 400,
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    backgroundColor: 'white',
    padding: '10px',
  },
}

class CalendarModal extends React.Component {
  state = {
    edit: this.props.isNew,
    info: dataFormatter(this.props)
  }


  _editView = (key, type) => {
    const value = getPath(this.state, `info.${key}`)
    return (
      <FormFactory 
        canEdit={this.state.edit} 
        type={type} 
        keyVal={key}
        value={value} 
        onChange={this._onInputChange} 
      />
    )
  }
  
  _onInputChange = (key, value) => {
    this.setState({
      info: {
        ...this.state.info,
        [key]: value
      }
    })
  }

  _createDeleteBtn = () => {
    return this.state.edit && !this.props.isNew ? (
      <button onClick={() => {this.props.onSubmit(this.state.info, null, true)}}>Delete</button>
    ) : null
  }

  _createSubmitBtn = () => {
    return this.state.edit ? (
      <button onClick={() => {this.props.onSubmit(this.state.info, this.props.isNew)}}>Submit</button>
    ) : null
  }

  render() {
    const {
      open,
      handleCloseModal,
      isNew
    } = this.props;

    const {
      info,
      edit
    } = this.state;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleCloseModal}
      >
        <div style={style.paper}>
          {
            !isNew ? 
              <Switch
                checked={edit}
                onChange={()=>{this.setState({edit: !edit})}}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />: null
          }
          <div>
            {this._editView('summary', TEXT)}
          </div>
          <div>
            {this._editView('start', DATE)}
          </div>
          <div>
            {this._editView('end', DATE)}
          </div>
          {this._createSubmitBtn()}
          {this._createDeleteBtn()}
        </div>
      </Modal>
    )
  }
}

module.exports = CalendarModal;