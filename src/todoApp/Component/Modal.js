import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Modal.module.css';

const Modal = (props) => {
  const [form, setForm] = useState({});
  const { updateList } = props;

  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const updateClick = (e, id, data) => {
    e.preventDefault();
    updateList(id, data);
    setForm({});
    props.closeModal(e);
  };

  if (!props.show) {
    return null;
  }

  return (
    <div className={classes.ModalContainer}>
      <div className={classes.ModalContent}>
        <div className={classes.ModalHeader}>
          <h2>{props.items[0].title}</h2>
          <input
            id='title'
            className={classes.Input}
            placeholder={props.items[0].title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={classes.ModalBody}>
          <div className={classes.Wrap}>
            <p>Status: </p>
            <input
              id='status'
              className={classes.Input}
              type='number'
              min={0}
              max={1}
              placeholder={props.items[0].status}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className={classes.Wrap}>
            <p>Description: </p>
            <input
              id='description'
              className={classes.Input}
              placeholder={props.items[0].description}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className={classes.ModalFooter}>
          <div className={classes.Wrap}>
            <div
              className={classes.Button}
              onClick={(e) => props.closeModal(e)}
              style={{ backgroundColor: 'rgb(253, 68, 68)' }}
            >
              Close
            </div>

            <div
              className={classes.Button}
              onClick={(e) => updateClick(e, props.items[0].id, form)}
            >
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateList: (id, data) =>
      dispatch({ type: 'UPDATE_LIST', id: id, data: data }),
  };
};

export default connect(null, mapDispatchToProps)(Modal);
