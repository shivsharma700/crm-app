import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosInstance";

const UserDetailModal = ({user, resetUsers}) => {

    const [userDisplay, setUserDisplay] = useState(user);

    async function handleUserChange(e){
       try {
        let ul = e.target.parentNode.parentNode;
        let name = ul.getAttribute("name");
        let dropdown = document.getElementById(`${name}Dropdown`);
        dropdown.open = !dropdown.open;
        toast("updating the user...");
        const response = await axiosInstance.patch("user/updateUser", {
            userId: userDisplay.id,
            updates: {
                ...userDisplay,
                [name]: e.target.textContent
            }
        },{
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        if(response?.data?.result){
            toast.success("succesfully updated");
            const user = response?.data?.result;
            setUserDisplay({
                ...userDisplay,
                name: user.name,
                email: user.email,
                userStatus: user.userStatus,
                userType: user.userType,
                clientName: user.clientName,
            });
            resetUsers();
        }
       } catch (error) {
        toast.error("something went wrong");
       }
    }
   
  return (
    <div>
        <dialog id="user_details_modal" className="modal">
          <div className="modal-box cursor-pointer">
            <h3 className="font-bold text-lg">User Details</h3>
            <p className="py-4">Name: <span className="text-yellow-500"> {userDisplay.name} </span></p>
            <p className="py-4">Email <span className="text-yellow-500">{userDisplay.email} </span></p>
            <p className="py-4">Status:
                <span className="text-black">
                   <details className="dropdown ml-2" id="userStatusDropdown">
                       <summary className="m-1 btn">{userDisplay.userStatus}</summary>
                       <ul name="userStatus" onClick={handleUserChange} className="p-2 shadow menu dropdown-content z-[1] bg-gray-100 rounded-box w-52">
                           <li><a>approved</a></li>
                           <li><a>suspended</a></li>
                           <li><a>rejected</a></li>
                       </ul>
                   </details>  
                </span>
            </p>
            <p className="py-4">Type:
                <span className="text-black">
                    <details className="dropdown ml-2" id="userTypeDropdown">
                       <summary className="m-1 btn">{userDisplay.userType}</summary>
                       <ul name="userType" onClick={handleUserChange} className="p-2 shadow menu dropdown-content z-[1] bg-gray-100  rounded-box w-52">
                           <li><a>customer</a></li>
                           <li><a>admin</a></li>
                           <li><a>engineer</a></li>
                       </ul>
                   </details>  
                </span>
            </p>
            <p className="py-4">Client Name: <span className="text-yellow-500"> {userDisplay.clientName} </span> </p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
    </div>
  );
};

export default UserDetailModal;