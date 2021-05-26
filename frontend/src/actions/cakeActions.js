import axios from "axios";

import {
  CAKE_LIST_SUCCESS,
  CAKE_LIST_ERROR,
  CAKE_LIST_REQUEST,
  SINGLE_CAKE_SUCCESS,
  SINGLE_CAKE_ERROR,
  SINGLE_CAKE_REQUEST,
} from "../constants/productTypes";

export const fetchAllCakes = () => async (dispatch) => {
  try {
    dispatch({
      type: CAKE_LIST_REQUEST,
    });

    const res = await axios.get("/api/cakes");

    dispatch({
      type: CAKE_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CAKE_LIST_ERROR,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchACake = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SINGLE_CAKE_REQUEST,
    });

    const { data } = await axios.get(`/api/cakes/${id}`);

    dispatch({
      type: SINGLE_CAKE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_CAKE_ERROR,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
