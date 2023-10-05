import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import UserDetailModal from "../../components/UserDetailModal";
import axiosInstance from "../../config/axiosInstance";
import HomeLayout from "../../Layouts/HomeLayout";

const ListAllUsers = () => {
    const columns = [
        {
            name: 'User Id',
            selector: row => row._id,
            reorder: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            reorder: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            reorder: true,
        },
        {
            name: 'Status',
            selector: row => row.userStatus,
            reorder: true,
        },
        {
            name: 'Type',
            selector: row => row.userType,
            reorder: true,
            sortable: true,
        },
    ];

    const [userList, setUserList] = useState();

    const [userDisplay, setUserDisplay] = useState({
        name: "",
        email: "",
        userType: "",
        userStatus: "",
        clientName: "",
        id: ""
    });

    const customStyles = {
        
    };
    
    async function loadUsers(){
        const response = await axiosInstance.get("/users", {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        console.log(response);
        setUserList(response.data.result);
    }

    useEffect(() => {
        loadUsers();
    },[]);
  return (
    <HomeLayout>
        <h1 className="text-center font-bold text-5xl mb-4 text-yellow-500">
                    Users List
        </h1>
        <div className="min-h-[90vh] flex flex-col items-center justify-center">
           {userList && 
             <DataTable
               onRowClicked={(row)=>{
                setUserDisplay({
                    name: row.name,
                    userType: row.userType,
                    email: row.email,
                    userStatus: row.userStatus,
                    clientName: row.clientName,
                    id: row._id
                });
                document.getElementById('user_details_modal').showModal();
               }}
               columns={columns}
               data={userList}
               customStyles={customStyles}
             />
           }
        </div>
        <UserDetailModal key={userDisplay.email} user={userDisplay} resetUsers={loadUsers} />
    </HomeLayout>
  );
};

export default ListAllUsers;