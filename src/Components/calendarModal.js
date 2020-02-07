import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { getPath, setPath } from '../utils/getPath';

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
    edit: false,
    info: {}
  }

  static getDerivedStateFromProps(props, state) {
    const propsId = getPath(props, 'event.eventData.id');
    const stateId = getPath(state, 'info.eventData.id');

    if (propsId !== stateId) {
      return {
        ...state,
        edit: true,
        info: props.event
      }
    } else if (props.isNew) {
      console.log(props);
      return {
        ...state,
        edit: props.isNew,
        info: {}
      }
    }
    return state;
  }

  editView = (key, data) => {
    return this.state.edit ? (
      <input onChange={this.onInputChange.bind(this, key)} value={data} />
    ) : (
      <div>{data}</div>
    )
  }
  
  onInputChange = (path, event) => {
    const newState =  setPath(this.state, event.target.value, `info.${path}`);
    this.setState(newState)
  }

  render() {
    const {
      open,
      handleCloseModal
    } = this.props;

    const {
      info: {
        start,
        end,
        eventData: {
          summary
        } = {}
      }
    } = this.state;

    console.log(this.state.info);

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleCloseModal}
      >
        <div style={style.paper}>
          {this.editView('eventData.summary', summary)}
        </div>
      </Modal>
    )
  }
}

module.exports = CalendarModal;