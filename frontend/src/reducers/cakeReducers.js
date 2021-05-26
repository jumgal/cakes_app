import {
  CAKE_LIST_SUCCESS,
  CAKE_LIST_ERROR,
  CAKE_LIST_REQUEST,
  SINGLE_CAKE_REQUEST,
  SINGLE_CAKE_SUCCESS,
  SINGLE_CAKE_ERROR,
} from "../constants/productTypes";

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

export const singleCakeReducer = (
  state = { cake: {}, reviews: [] },
  action
) => {
  switch (action.type) {
    case SINGLE_CAKE_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case SINGLE_CAKE_SUCCESS:
      return {
        loading: false,
        cake: action.payload,
      };
    case SINGLE_CAKE_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
