import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";

const apiUrl = process.env.REACT_APP_API_URL + "/tests";




export const getTests = async (dispatch) => {
  dispatch(actions.getTestsStart());
  try {
    const { data } = await axiosInstance.get(apiUrl);
    dispatch(actions.getTestsSuccess(data.data));
    return true;
  } catch (error) {
    dispatch(actions.getTestsFailure());
    return false;
  }
};

