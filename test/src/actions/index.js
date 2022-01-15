import api from "../apis/apis"

export const hideModal = () => dispatch => dispatch({ type: 'HIDE_MODAL' });

export const getData = () => async dispatch => {
  const response = await api.get('/hiring');

  const { hiringTest } = response.data.value;

  dispatch ({type: 'GET_DATA', payload: hiringTest });

  let availableCount = 0;
  let fullCount = 0;

  hiringTest.map((item) => {
    if (item.availability === 'Full') {
      fullCount += 1;
    } else {
      availableCount += 1;
    }
  });

  dispatch({type: 'SET_PIE_DATA', payload: [
    { name: 'Available', value: availableCount },
    { name: 'Full', value: fullCount },
  ]});

  let category1Count = 0;
  let category2Count = 0;
  let category3Count = 0;
  let category4Count = 0;

  hiringTest.map((item) => {
    if (item.category === 'Category 1') {
      category1Count += 1;
    }
    else if (item.category === 'Category 2') {
      category2Count += 1;
    }
    else if (item.category === 'Category 3') {
      category3Count += 1;
    }
    else if (item.category === 'Category 4') {
      category4Count += 1;
    }
  }); 
  dispatch({type: 'SET_CHART_DATA', payload: [
    { name: 'Category 1', uv: 10, pv: category1Count, amt: 10 },
    { name: 'Category 2', uv: 10, pv: category2Count, amt: 10 },
    { name: 'Category 3', uv: 10, pv: category3Count, amt: 10 },
    { name: 'Category 4', uv: 10, pv: category4Count, amt: 10 },
  ]});

  
}

export const addData = (name, category, availability) => async dispatch => {
  try {
    await api.post('/hiring', {
      name: name,
      category: category,
      availability: availability
    });

    await dispatch(getData());

    dispatch({ type: 'DISPLAY_MODAL', payload: 'Pertambahan data berhasil!' });
  } catch(e) {
    dispatch({ type: 'DISPLAY_MODAL', payload: 'Terdapat kesalahan, mohon coba kembali!' });
  }
}

export const deleteData = (ids) => async (dispatch, getState) => {
  const {data} = getState();
  for (let i = 0; i < ids.length; i++) {
    if (ids[i] === true) {
      const response = await api.delete(`/hiring/${data[i]._id}`);
    }
  }
  dispatch(getData());
}

export const markArrived = (id, arrival) => async dispatch => {
  const response = await api.put(`/hiring/${id}/mark-as-arrived`, {
    id: id,
    arrival: arrival
  });

  await dispatch(getData());
} 
