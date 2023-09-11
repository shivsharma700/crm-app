import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

import {login} from "../../Redux/Slices/AuthSlice";

const Login = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [loginDetail, setLoginDetails] = useState({
    email: "",
    password: ""
  });

  function handleInpuChange(e){
    const {name, value} = e.target;
    setLoginDetails({
      ...loginDetail,
      [name]: value
    });
  }

  function resetLoginState(){
    setLoginDetails({
      email: "",
      password: ""
    });
  }

  async function onSubmit(){
    if(!loginDetail.email || !loginDetail.password) return;
    const response = await dispatch(login(loginDetail));
    if(response.payload) navigate("/");
    else{
      resetLoginState();
    }
  }
  
  return (
    <div className="flex justify-center items-center h-[90vh]">
        <div className="card w-96 bg-primary text-primary-content">
            <div className="card-body flex flex-col items-center">
               <h2 className="card-title text-4xl mb-4 text-white">Login</h2>
               <input
                  onChange={handleInpuChange}
                  name='email'
                  autoComplete='one-time-code'
                  type="text" placeholder="email..."
                  value={loginDetail.email}
                  className="input input-bordered input-primary text-white w-full max-w-xs"
               />
               <input
                  onChange={handleInpuChange}
                  name='password'
                  autoComplete='one-time-code'
                  type="password" placeholder="password"
                  value={loginDetail.password}
                  className="input input-bordered input-primary text-white w-full max-w-xs"
               />
               <div className="card-actions w-full mt-4">
                 <button onClick={onSubmit} className="btn btn-warning font-bold hover:bg-sky-200 text-xl w-full">Submit</button>
               </div>
               <p className="text-l text-white">
                   Donot have an account ? <Link className="text-yellow-200 font-semibold hover:text-yellow-400 " to="/signup">signup Instead</Link>
               </p>
            </div>
        </div>
    </div>
  );
};

export default Login;