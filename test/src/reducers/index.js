import { combineReducers } from "redux";

const dataReducers = (state = {}, action) => {
  if (action.type === 'GET_DATA') {
    return action.payload;
  }

  return state;
}

const selectedDataReducers = (state = {}, action) => {
  if (action.type === 'SELECTED_DATA') {
    return action.payload;
  }

  return state;
}

const pieDataReducers = (state = [], action) => {
  if (action.type === 'SET_PIE_DATA') {
    return action.payload;
  }

  return state;
}

const chartDataReducers = (state = [], action) => {
  if (action.type === 'SET_CHART_DATA') {
    return action.payload;
  }

  return state;
}

const noticeModalReducers = (state = { show: false, message: ''}, action) => {
  switch (action.type) {
    case 'DISPLAY_MODAL':
      return ({
        show: true,
        message: action.payload,
      });

    case 'HIDE_MODAL':
      return ({
        show: false,
        message: '',
      });

    default:
      return state;
  }
}

export default combineReducers({
  data: dataReducers,
  noticeModal: noticeModalReducers,
  pieData: pieDataReducers,
  chartData: chartDataReducers
});