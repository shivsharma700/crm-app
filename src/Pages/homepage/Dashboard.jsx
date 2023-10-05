
import { useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineDownload } from "react-icons/ai";
import { usePDF } from "react-to-pdf";

import TicketDetailModal from "../../components/TicketDetailModal";
import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../Layouts/HomeLayout";
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;


const Dashboard = () => {
    const [ticketState] = useTickets();
    const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

    const [selectedTicket, setSelectedTicket] = useState({});

    const columns = [
        {
            name: 'Ticket Id',
            selector: row => row._id,
            reorder: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            reorder: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            reorder: true,
        },
        {
            name: 'Reporter',
            selector: row => row.assignedTo,
            reorder: true,
        },
        {
            name: 'Priority',
            selector: row => row.ticketPriority,
            reorder: true,
            sortable: true,
        },
        {
            name: 'Assignee',
            selector: row => row.assignee,
            reorder: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            reorder: true,
            sortable: true,

        }
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
                fontSize: '18px'
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };
  return (
    <HomeLayout>
         <div className="min-h-[90vh] flex flex-col items-center justify-center gap-2">

              <div className="bg-yellow-500 w-full text-black text-center text-3xl py-4 font-bold hover:bg-yellow-400 transition-all ease-in-out duration-300">
                  Tickets Records <AiOutlineDownload className="cursor-pointer inline " onClick={() => toPDF()} />
              </div>
              
              {/* Table */}
              
              <div className="flex flex-col w-full" ref={targetRef} >
              
                  {/* Title row */}
                  <div className="flex text-white font-bold justify-between items-center gap-3 bg-purple-600 px-2 py-2 grid-cols-7">
                      <div className="table-title basis-[8%] justify-start">
                          Ticket Id
                      </div>
                      <div className="table-title basis-[12%]">
                          Title
                      </div>
                      <div className="table-title basis-[20%]">
                          Description
                      </div>
                      <div className="table-title basis-[20%]">
                          Reporter
                      </div>
                      <div className="table-title basis-[5%]">
                          Priority
                      </div>
                      <div className="table-title basis-[22%]">
                          Assignee
                      </div>
                      <div className="table-title basis-[13%] justify-end mr-4">
                          Status
                      </div>
                  </div>
              
                  {/* ticket details */}
                  {/* {ticketState && ticketState.ticketList.map(ticket => {
                      return (
                          <div key={ticket._id} className="my-4 py-2 font-normal text-sm flex justify-between items-center gap-3 bg-gray-100 hover:bg-gray-400 transition-all ease-in-out duration-300 text-black px-2 py-2 grid-cols-7">
                              <div className="table-title basis-[8%] justify-start">
                                  {ticket._id.substring(0, 5)+".."}
                              </div>
                              <div className="table-title basis-[12%]">
                                  {ticket.title}
                              </div>
                              <div className="table-title basis-[20%]">
                                  {ticket.description}
                              </div>
                              <div className="table-title basis-[20%]">
                                  {ticket.assignee}
                              </div>
                              <div className="table-title basis-[5%]">
                                  {ticket.ticketPriority}
                              </div>
                              <div className="table-title basis-[22%]">
                                  {ticket.assignedTo}
                              </div>
                              <div className="table-title basis-[13%] justify-end mr-4">
                                  {ticket.status}
                              </div>
                          </div>
                      );
                  })} */}

                <div ref={targetRef}>
                    {ticketState && 
                        <DataTable
                            onRowClicked={(row)=>{
                                setSelectedTicket(row);
                                document.getElementById("ticket_modal").showModal();
                            }}
                            columns={columns}
                            data={ticketState.ticketList}
                            expandableRows
                            expandableRowsComponent={ExpandedComponent}
                            customStyles={customStyles}
                        />
                    }
                    <TicketDetailModal ticket={selectedTicket} key={selectedTicket._id} />
                </div>
              </div>
         </div>  
    </HomeLayout>
  );
};

export default Dashboard;