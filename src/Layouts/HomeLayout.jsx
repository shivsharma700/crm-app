import { useEffect } from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../Redux/Slices/AuthSlice";

function HomeLayout({children}){
    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onLogout(){
        dispatch(logout());
        navigate("/login");
    }

    useEffect(()=>{
        if(!authState.isLoggedIn){
            navigate("/login");
        }
    },[]);
    return (
        <div className="min-h-[90vh]">
           <div className="drawer absolute left-0 right-0 cursor-pointer mt-4 ml-4">
               <input id="my-drawer" type="checkbox" className="drawer-toggle" />
               <div className="drawer-content">
                  <label htmlFor="my-drawer" >
                     <BsFillMenuButtonWideFill 
                        size={'32px'} 
                        className="cursor-pointer"
                     />
                  </label>
               </div> 
               <div className="drawer-side">
                  <label htmlFor="my-drawer" className="drawer-overlay"></label>
                  <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                     <li><Link to={"/"}>Home</Link></li>
                     <li><Link to={"/dashboard"}>Dashboard</Link></li>
                     <li><Link to={"/ticket/create"}>Rise Ticket</Link></li>
                     {authState.role == "admin" || authState.role == "engineer" && <li><Link to={"/users"} >All Users</Link></li>}
                     <li className="w-3/4  absolute bottom-8 ">
                        <div className="flex">
                            {
                                !authState.isLoggedIn ? (
                                    <>
                                     <Link to={'/login'} className="btn-primary px-2 py-1 rounded-md font-semibold text-center w-full">login</Link>
                                     <Link to={'/signup'} className="btn-secondary px-2 py-1 rounded-md font-semibold text-center w-full">signup</Link>
                                    </>
                                ):(
                                    <>
                                     <button onClick={onLogout} className="btn-primary px-2 py-1 rounded-md font-semibold text-center w-full">logout</button>
                                     <Link className="btn-secondary px-2 py-1 rounded-md font-semibold text-center w-full">profile</Link>
                                    </>
                                )
                            }
                        </div>
                     </li>
                  </ul>
               </div>
           </div>

           <div className="flex items-start justify-center">
             <div className="w-3/4">
               {children}
             </div>
           </div>
        </div>
    );
}

export default HomeLayout;