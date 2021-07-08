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
  CAKE_CREATE_RESET,
  CAKE_UPDATE_REQUEST,
  CAKE_UPDATE_SUCCESS,
  CAKE_UPDATE_FAIL,
  CAKE_UPDATE_RESET

} from "../constants/cakeConstants";

const initialState = {
  cakes: [],
};

export const cakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_LIST_REQUEST:
      return {
        loading: true,
        cakes: [],
      };
    case CAKE_LIST_SUCCESS:
      return {
        loading: false,
        cakes: action.payload,
      };
    case CAKE_LIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const cakeDetailsReducer = (
  state = { cake: {}, reviews: [] },
  action
) => {
  switch (action.type) {
    case CAKE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case CAKE_DETAILS_SUCCESS:
      return {
        loading: false,
        cake: action.payload,
      };
    case CAKE_DETAILS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const cakeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CAKE_DELETE_REQUEST:
      return { loading: true }
    case CAKE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CAKE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const cakeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CAKE_CREATE_REQUEST:
      return { loading: true }
    case CAKE_CREATE_SUCCESS:
      return { loading: false, success: true, cake: action.payload }
    case CAKE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CAKE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const cakeUpdateReducer = (state = { cake: {} }, action) => {
  switch (action.type) {
    case CAKE_UPDATE_REQUEST:
      return { loading: true }
    case CAKE_UPDATE_SUCCESS:
      return { loading: false, success: true, cake: action.payload }
    case CAKE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case CAKE_UPDATE_RESET:
      return { cake: {} }
    default:
      return state
  }
}


