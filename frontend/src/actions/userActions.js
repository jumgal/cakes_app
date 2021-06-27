import axios from 'axios';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from '../constants/userConstants';
import {
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL, USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_PROFILE_FAIL


}

    from '../constants/userConstants'

const userLoginAction = (email, password) => async dispatch => {

    try {

        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            'Content-Type': 'application/json'
        }

        const { data } = await axios.post('/api/users/login', { email, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });

        console.log(error.response.data.message)
    }
}

const userLogoutAction = () => dispatch => {
    localStorage.removeItem('userInfo')

    dispatch({
        type: USER_LOGOUT
    })
}


const userRegisterAction = (name, email, password) => async dispatch => {

    try {

        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            'Content-Type': 'application/json'
        }

        const { data } = await axios.post('/api/users', { name, email, password }, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}


export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/users/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
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
            type: USER_DETAILS_FAIL,
            payload: message,
        })
    }
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
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

        const { data } = await axios.put(`/api/users/profile`, user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(userLogoutAction())
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        })
    }
}




export { userLoginAction, userLogoutAction, userRegisterAction }