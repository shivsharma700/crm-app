import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import useTickets from '../../hooks/useTickets';
import HomeLayout from "../../Layouts/HomeLayout";
import { createTicket } from "../../Redux/Slices/TicketSlice";

const CreateTicket = () => {

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useTickets();

    const [ticket, setTicket] = useState({
        title: '',
        description: '',
        ticketPriority: 3,
        status: 'open',
        clientName: auth.data.clientName
    });

    function handleFormChange(e){
        const {name, value} = e.target;

        setTicket({
            ...ticket,
            [name] : value
        });
    }

    async function onformSubmit(e){
        e.preventDefault();
        if(!ticket.title || !ticket.description){
            toast.error("title and description is mandatory");
            return;
        }
        const response =  dispatch(createTicket(ticket));
        if(response?.payload?.status == 201){
            // ticket got created successfully
            setTicket({
                title: '',
                description: '',
                ticketPriority: 3,
                status: 'open',
                clientName: auth.data.clientName
            });
        }
    }

  return (
    <HomeLayout>
        <div className="min-h-[90vh] flex items-center justify-center ">
            
            <form
              onSubmit={onformSubmit}
              className=" min-w-[40rem] border p-20 border-sky-500 hover:bg-sky-900 rounded-lg transition-all ease-in-out duration-300 "
            >
                 
                <h1 className="text-3xl font-semibold text-white text-center">
                    create new ticket
                </h1>

                <div className="form-control w-full my-4">
                  <label className="label">
                    <span className="label-text text-white text-lg">What is title of the issue?</span>
                  </label>
                  <input
                      name = "title"
                      value={ticket.title}
                      onChange={handleFormChange}
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered
                      w-full  bg-white text-black"
                   />
                </div>

                <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text text-white text-lg">Please describe your issue?</span>
                        </label>
                        <textarea 
                            value={ticket.description}
                            onChange={handleFormChange}
                            name="description"
                            placeholder="Type here"
                            rows="8"
                            className="p-2 resize-none w-full rounded-md bg-white text-black" 
                        ></textarea>
                        
                </div>

                <button type="submit" className="w-full px-4 py-2 bg-green-500 text-lg font-semibold text-white rounded-md hover:bg-green-600 transition-all ease-in-out duration-300">
                        Submit
                </button>
                 
            </form>

        </div>
    </HomeLayout>
  );
};

export default CreateTicket;