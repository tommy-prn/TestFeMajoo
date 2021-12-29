import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import HomePage from './todoApp/HomePage';

import './App.css';

function App(props) {
  const { patchList } = props;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        patchList(data);
        setData(data);
        setLoading(false);
      });
  }, [patchList]);

  return (
    <div className='App'>{!loading ? <HomePage data={data} /> : null}</div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    patchList: (data) => dispatch({ type: 'PATCH_LIST', data: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
