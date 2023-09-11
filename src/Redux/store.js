import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/AuthSlice";
import TicketSliceReducer from "./Slices/TicketSlice";


const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        tickets: TicketSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
});

export default store;