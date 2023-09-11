import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "../../Redux/Slices/AuthSlice";


const SignUp = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [signupDetail, setSignupDetails] = useState({
    email: "",
    password: "",
    name: "",
    userType: "",
    userStatus: "",
    clientName: ""
  });

  function handleInputChange(e){
    const {name, value} = e.target;
    setSignupDetails({
      ...signupDetail,
      [name]: value
    });
  }

  function resetSignupState(){
    setSignupDetails({
      email: "",
      password: "",
      name: "",
      userType: "",
      userStatus: "",
      clientName: ""
    });
  }

  async function onSubmit(){
    if(!signupDetail.email ||
       !signupDetail.password ||
       !signupDetail.name ||
       !signupDetail.userType ||
       !signupDetail.userStatus ||
       !signupDetail.clientName ) return;
    const response = await dispatch(signup(signupDetail));
    if(response.payload){
      // toast.success("succesfully signed up");
      navigate("/login");
    }
    else{
      // toast.error("something went wrong, please try again");
      resetSignupState();
    }
  }

  function handleUserType(e){
    const userTypeSelected = e.target.textContent;
    setSignupDetails({
      ...signupDetail,
      userType: userTypeSelected,
      userStatus: userTypeSelected == "customer" ? "approved" :  "suspended"  ,
    });
    const dropDown = document.getElementById(userTypeDropDown);
    dropDown.open = !dropDown.open;
  }
  
  return (
    <div className="flex justify-center items-center h-[90vh]">
        <div className="card w-96 bg-primary text-primary-content">
            <div className="card-body flex flex-col items-center">
               <h2 className="card-title text-4xl mb-4 text-white">SignUp</h2>
               <div className="w-full">
                        <input 
                            onChange={handleInputChange}
                            name="email"
                            autoComplete="one-time-code" 
                            type="text" 
                            placeholder="email ..."
                            value={signupDetail.email}
                            className="input text-white input-bordered input-primary w-full max-w-xs" 
                        />
                    </div>
                    <div className="w-full">
                        <input 
                            onChange={handleInputChange}
                            name="password"
                            autoComplete="one-time-code"  
                            type="password" 
                            placeholder="password" 
                            value={signupDetail.password}
                            className="input text-white input-bordered input-primary w-full max-w-xs" 
                        />
                    </div>
                    <div className="w-full">
                        <input 
                            onChange={handleInputChange}
                            name="name"
                            autoComplete="one-time-code"  
                            type="text" 
                            placeholder="name" 
                            value={signupDetail.name}
                            className="input text-white input-bordered input-primary w-full max-w-xs" 
                        />
                    </div>
                    <details className="dropdown mb-4 w-full" id="userTypeDropDown">
                        <summary className="btn">{(!signupDetail.userType) ? "User Type" : signupDetail.userType}</summary>
                        <ul onClick={handleUserType} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 text-white rounded-box w-52">
                            <li><a>customer</a></li>
                            <li><a>engineer</a></li>
                            <li><a>admin</a></li>
                        </ul>
                    </details>
                    
                    <div className="w-full">
                        <input 
                            onChange={handleInputChange}
                            name="clientName"
                            autoComplete="one-time-code"  
                            type="text" 
                            placeholder="client name" 
                            value={signupDetail.clientName}
                            className="input text-white input-bordered input-primary w-full max-w-xs" 
                        />
                    </div>
               <div className="card-actions w-full mt-4">
                 <button onClick={onSubmit} className="btn btn-warning font-bold hover:bg-sky-200 text-xl w-full">Submit</button>
               </div>
               <p className="text-l text-white">
                   Already have an account ? <Link className="text-yellow-200 font-semibold hover:text-yellow-400 " to="/login">Login Instead</Link>
               </p>
            </div>
        </div>
    </div>
  );
};

export default SignUp;