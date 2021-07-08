import axios from "axios";

import {
  CAKE_LIST_SUCCESS,
  CAKE_LIST_ERROR,
  CAKE_LIST_REQUEST,
  CAKE_DETAILS_REQUEST,
  CAKE_DETAILS_SUCCESS,
  CAKE_DETAILS_ERROR,
  CAKE_DELETE_REQUEST,
  CAKE_DELETE_SUCCESS,
  CAKE_DELETE_FAIL,
  CAKE_CREATE_REQUEST,
  CAKE_CREATE_SUCCESS,
  CAKE_CREATE_FAIL,
  CAKE_UPDATE_REQUEST,
  CAKE_UPDATE_SUCCESS,
  CAKE_UPDATE_FAIL,
  // CAKE_UPDATE_RESET
} from "../constants/cakeConstants";


import { userLogoutAction } from '../actions/userActions'

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
      type: CAKE_DETAILS_REQUEST
    });

    const { data } = await axios.get(`/api/cakes/${id}`);

    dispatch({
      type: CAKE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAKE_DETAILS_ERROR,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const deleteCake = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAKE_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/cakes/${id}`, config)

    dispatch({
      type: CAKE_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(userLogoutAction())
    }
    dispatch({
      type: CAKE_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createCake = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAKE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/cakes`, {}, config)

    dispatch({
      type: CAKE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(userLogoutAction())
    }
    dispatch({
      type: CAKE_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateCake = (cake) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAKE_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/cakes/${cake._id}`,
      cake,
      config
    )

    dispatch({
      type: CAKE_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: CAKE_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(userLogoutAction())
    }
    dispatch({
      type: CAKE_UPDATE_FAIL,
      payload: message,
    })
  }
}

