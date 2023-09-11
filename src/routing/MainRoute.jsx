import { Route, Routes } from "react-router-dom";

import Login from '../pages/auth/Login';
import Signup from '../Pages/Auth/SignUp';
import Home from "../Pages/homepage/Home";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
}

export default MainRoutes;