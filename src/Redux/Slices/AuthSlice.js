import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from '../../config/axiosInstance';

const initialState = {
    role : localStorage.getItem("role") || "",
    data : JSON.parse(localStorage.getItem("data")) || {},
    token : localStorage.getItem("token") || "",
    isLoggedIn: localStorage.getItem("isLoggedIn") || false
};

export const login = createAsyncThunk('auth/login', async (data) => {
    try {
        const response =  axiosInstance.post("auth/signin", data);
        toast.promise(response, {
            loading: "submitting form",
            success: "succesfully signed in",
            error: "something went wrong, please try agian"
        });
        return await response;
    } catch (error) {
        console.log("printing error",error);
    }
});

export const signup = createAsyncThunk('auth/signup', async (data) => {
    try {
        const response =  axiosInstance.post("auth/signup", data);
        toast.promise(response, {
            loading: "submitting form",
            success: "succesfully signed up",
            error: "something went wrong, please try agian"
        });
        return await response;
    } catch (error) {
        console.log("printing error",error);
    }
});

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.clear();
            state.role = '';
            state.isLoggedIn = false;
            state.data = undefined;
            state.token = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            // console.log(action);
            if(!action.payload) return;
            state.isLoggedIn = (action.payload?.data?.token != undefined);
            state.data = action.payload?.data?.userData;
            state.token = action.payload?.data?.token;
            state.role = action.payload?.data?.userData?.userType;
            localStorage.setItem("role", action.payload?.data?.userData?.userType);
            localStorage.setItem("isLoggedIn", (action.payload?.data?.token != undefined));
            localStorage.setItem("data", JSON.stringify(action.payload?.data?.userData));
            localStorage.setItem("token", action.payload?.data?.token);
        });
    }
});


export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;