import React, { useEffect } from 'react';
import { PencilFill, XLg } from 'react-bootstrap-icons';
import { connect } from 'react-redux';

import classes from './Items.module.css';

function Items(props) {
  const items = props.Items;

  const { deleteList } = props;

  const deleteClick = (e, id) => {
    e.preventDefault();
    deleteList(id);
  };

  return (
    <div className={classes.TodoItems}>
      <div className={classes.ItemsHeader}>
        <div>{items.title}</div>
        <div className={classes.RightHeader}>
          <span style={{ marginRight: '10px' }}>{items.createdAt}</span>{' '}
          <button
            className={classes.Button}
            onClick={(e) => deleteClick(e, items.id)}
          >
            <XLg size={15} color='red' />
          </button>
        </div>
      </div>

      <div className={classes.TodoSubHeader}>Descriptions</div>
      <div className={classes.ItemsContent}>
        <div className={classes.TodoDesc}>{items.description}</div>
        <button
          className={classes.Button}
          onClick={(e) => props.showModal(e, items.id)}
        >
          <PencilFill size={15} />
        </button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteList: (id) => dispatch({ type: 'DELETE_LIST', id: id }),
  };
};

export default connect(null, mapDispatchToProps)(Items);
