import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";
import axios from "axios"
import * as actions from "./index";

const apiUrl = process.env.REACT_APP_API_URL;

export const getUser = async (payload, dispatch) => {
	dispatch(actions.getUserStart());
	try {
		const { data } = await axiosInstance.get(apiUrl + `/clients/${payload}`);
		dispatch(actions.getUserSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getUserFailure());
		return false;
	}
};
export const getUsers = async ( dispatch) => {
	dispatch(actions.getUsersStart());
	try {
		const { data } = await axiosInstance.get(apiUrl + `/clients`);
		dispatch(actions.getUsersSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getUsersFailure());
		return false;
	}
};

export const updateUser = async (payload, dispatch) => {
	dispatch(actions.updateUserStart());
	try {
		const url = apiUrl + `/clients/${payload.id}`;
		const { data } = await axiosInstance.put(url, payload.data);
		dispatch(actions.updateUserSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.getUserFailure());
		return false;
	}
};


export const Query = async (payload, dispatch) => {
	dispatch(actions.QueryStart());
	try {
		const url = apiUrl + `/queries`;
		const { data } = await axios.post(url, payload.data);
		dispatch(actions.QuerySuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.getUserFailure());
		return false;
	}
};
