import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const { reducer, actions } = createSlice({
  name: 'reports',
  initialState: {
    groupIds: [],
    period: 'today',
    from: moment().subtract(1, 'day').startOf('day').locale('en')
      .format(moment.HTML5_FMT.DATETIME_LOCAL),
    to: moment().endOf('day').locale('en').format(moment.HTML5_FMT.DATETIME_LOCAL),
    selectedStopId: -1,
  },
  reducers: {
    updateGroupIds(state, action) {
      state.groupIds = action.payload;
    },
    updatePeriod(state, action) {
      state.period = action.payload;
    },
    updateFrom(state, action) {
      state.from = action.payload;
    },
    updateTo(state, action) {
      state.to = action.payload;
      // console.log(state.to);
    },
    selectedStopIndex(state, action) {
      state.selectedStopId = action.payload;
      // console.log(state.selectedStopId);
    },
  },
});

export { actions as reportsActions };
export { reducer as reportsReducer };
