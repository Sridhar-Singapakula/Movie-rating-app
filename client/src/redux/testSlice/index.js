import { createSlice } from "@reduxjs/toolkit";

export const testSlice = createSlice({
  name: "tests",
  initialState: {
    tests: [],
    createTestProgress: false,
    editTestProgress: false,
    getTestsProgress: false,
    getTestProgress: false,
    deleteTestProgress: false,
    error: false,
  },
  reducers: {
    createTestStart: (state) => {
      state.createTestProgress = true;
    },
    createTestSuccess: (state, action) => {
      state.tests.push(action.payload);
      state.createTestProgress = false;
    },
    createTestFailure: (state) => {
      state.error = true;
      state.createTestProgress = false;
    },
    editTestStart: (state) => {
      state.editTestProgress = true;
    },
    editTestSuccess: (state, action) => {
      const index = state.tests.findIndex((test) => test._id === action.payload._id);
      state.tests[index] = action.payload;
      state.editTestProgress = false;
    },
    editTestFailure: (state) => {
      state.error = true;
      state.editTestProgress = false;
    },
    getTestsStart: (state) => {
      state.getTestsProgress = true;
    },
    getTestsSuccess: (state, action) => {
      state.tests = action.payload;
      state.getTestsProgress = false;
    },
    getTestsFailure: (state) => {
      state.error = true;
      state.getTestsProgress = false;
    },
    getTestStart: (state) => {
      state.getTestProgress = true;
    },
    getTestSuccess: (state, action) => {
      // Update the specific test in the state or handle it as needed
      state.tests = action.payload;
      state.getTestProgress = false;
    },
    getTestFailure: (state) => {
      state.error = true;
      state.getTestProgress = false;
    },
    deleteTestStart: (state) => {
      state.deleteTestProgress = true;
    },
    deleteTestSuccess: (state, action) => {
      state.tests = state.tests.filter((test) => test._id !== action.payload);
      state.deleteTestProgress = false;
    },
    deleteTestFailure: (state) => {
      state.error = true;
      state.deleteTestProgress = false;
    },
  },
});

export const {
  createTestStart,
  createTestSuccess,
  createTestFailure,
  editTestStart,
  editTestSuccess,
  editTestFailure,
  getTestsStart,
  getTestsSuccess,
  getTestsFailure,
  getTestStart,
  getTestSuccess,
  getTestFailure,
  deleteTestStart,
  deleteTestSuccess,
  deleteTestFailure,
} = testSlice.actions;

export default testSlice.reducer;
