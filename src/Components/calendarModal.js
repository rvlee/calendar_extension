import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import getPath from '../utils/getPath';
import dataFormatter from '../utils/dataFormatter';

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
    edit: true,
    info: dataFormatter(this.props)
  }


  editView = (key, type) => {
    const value = getPath(this.state, `info.${key}`)
    return this.state.edit ? (
      <input type={type} onChange={this.onInputChange.bind(this, key)} value={value} />
    ) : (
      <div>{value}</div>
    )
  }
  
  onInputChange = (key, event) => {
    this.setState({
      info: {
        ...this.state.info,
        [key]: event.target.value
      }
    })
  }

  render() {
    const {
      open,
      handleCloseModal,
      isNew
    } = this.props;

    const {
      info
    } = this.state;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleCloseModal}
      >
        <div style={style.paper}>
          <div>
            {this.editView('summary', 'text')}
          </div>
          <div>
            {this.editView('start', 'text')}
          </div>
          <div>
            {this.editView('end', 'text')}
          </div>
          <button onClick={() => {this.props.onSubmit(this.state.info, this.props.isNew)}}>Submit</button>
          {
            !isNew ? 
            <button onClick={() => {this.props.onSubmit(this.state.info, null, true)}}>Delete</button> : null
          }
        </div>
      </Modal>
    )
  }
}

module.exports = CalendarModal;