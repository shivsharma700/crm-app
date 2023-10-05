import { Route, Routes } from "react-router-dom";

import Login from '../pages/auth/Login';
import Signup from '../Pages/Auth/SignUp';
import Dashboard from "../Pages/homepage/Dashboard";
import Home from "../Pages/homepage/Home";
import CreateTicket  from "../Pages/tickets/createTicket";
import ListAllUsers from "../Pages/users/ListAllUsers";
import AuthRoutes from "./AuthRoutes";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/signup" element={<Signup />} />
            <Route path="/ticket/create" element={<CreateTicket/>} />
            <Route element={<AuthRoutes allowListRoles={["admin","engineer"]} />}>
                <Route path="/users" element={<ListAllUsers/>} />
            </Route>
            <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
    );
}

export default MainRoutes;