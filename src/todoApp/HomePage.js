import React, { useState, useEffect } from 'react';
// import { PlusLg } from 'react-bootstrap-icons';
import { connect } from 'react-redux';
import moment from 'moment';

import Items from './Component/Items';
import Modal from './Component/Modal';

import classes from './HomePage.module.css';

const HomePage = (props) => {
  const [fetchData, setFetchData] = useState();
  const [show, setShow] = useState(false);
  const [modalId, setModalId] = useState();

  const { todo } = props;
  useEffect(() => {
    setFetchData(todo);
  }, [todo]);

  const showModal = (e, id) => {
    e.preventDefault();
    setShow(true);
    setModalId(id);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setShow(false);
    setModalId(null);
  };

  let component = 'loading';
  if (!props.loading && fetchData) {
    component = (
      <div className={classes.Container}>
        <div
          className={classes.TodoCard}
          style={{ backgroundColor: 'rgb(115, 216, 247, 0.7)' }}
        >
          <h2>To Do List</h2>

          {fetchData
            .filter((todo) => todo.status === 0)
            .sort((a, b) => moment(a.createdAt) - moment(b.createdAt))
            .map((todo) => {
              return (
                <Items
                  Items={todo}
                  key={todo.id}
                  showModal={(e, id) => showModal(e, id)}
                />
              );
            })}
        </div>

        <div
          className={classes.TodoCard}
          style={{ backgroundColor: 'rgba(115, 247, 122, 0.7)' }}
        >
          <h2>Done</h2>
          {fetchData
            .filter((todo) => todo.status === 1)
            .sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
            .map((todo) => {
              return (
                <Items
                  Items={todo}
                  key={todo.id}
                  showModal={(e, id) => showModal(e, id)}
                />
              );
            })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Modal
        show={show}
        closeModal={(e) => closeModal(e)}
        items={
          modalId >= 0 ? fetchData.filter((data) => data.id === modalId) : null
        }
      />
      {component}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todo: state.todo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
