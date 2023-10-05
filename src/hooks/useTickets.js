import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { filterTickets, getAllCreatedTicketsForTheUser, getAllTicketsForTheUser, resetTickets } from "../Redux/Slices/TicketSlice";

function useTickets() {
    const authState = useSelector((state) => state.auth);
    const ticketState = useSelector((state) => state.tickets);

    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();


    async function loadTickets() {
        if(ticketState.downloadedTickets.length == 0){
           if(authState.role == "customer"){
             console.log("calling tickets");
              await dispatch(getAllCreatedTicketsForTheUser());
           }else{
              await dispatch(getAllTicketsForTheUser());
           }
        }
        if(searchParams.get("status")){
            dispatch(filterTickets({status: searchParams.get("status")}));
        }else{
            dispatch(resetTickets());
        }
    }

    useEffect(() => {
            loadTickets();
    }, [authState.token,searchParams.get("status")]);
    return [ticketState];
}

export default useTickets;