import { ArcElement, BarElement,CategoryScale,Chart as ChartJS, Legend,LinearScale,LineElement,PointElement,Title,Tooltip } from "chart.js";
ChartJS.register(ArcElement, Legend, Title, Tooltip, CategoryScale,LinearScale,PointElement,LineElement, BarElement);

import { useEffect, useState } from "react";

import useTickets from "./useTickets";

function useCharts(){
    const [ticketsState] = useTickets();
    const [ticketsChartData, setTicketsChartData] = useState({
      openTickets: [],
      inProgressTickets: [],
      resolvedTickets: [],
      openTicketsByMonth: [],
      resolvedTicketsByMonth: [],
      inProgressTicketsByMonth: []
    });
  
    const pieChartData = {
      labels: Object.keys(ticketsState.ticketDistribution),
      fontColor: "white",
      datasets: [
          {
              label: "Tickets data",
              data: Object.values(ticketsState.ticketDistribution),
              backgroundColor: ["yellow", "red", "green", "blue", "purple", ],
              borderColor: ["yellow", "red", "green", "blue", "purple",],
              borderWidth: 1,
          }
      ]
    };
  
    const lineChartData = {
        labels: Object.keys(ticketsChartData.openTickets),
        fontColor: "white",
        datasets: [
            {
                label: "Open Tickets data",
                data: Object.values(ticketsChartData.openTickets),
                borderColor: 'rgb(255, 99, 132)',
            },
            {
                label: "In Progress Tickets data",
                data: Object.values(ticketsChartData.inProgressTickets),
                borderColor: 'rgb(53, 162, 235)',
            },
            {
                label: "Resolved Tickets data",
                data: Object.values(ticketsChartData.resolvedTickets),
                borderColor: 'rgb(245, 205, 95)',
                borderWidth: 4
            }
        ]
    };

    const barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'open',
            data: Object.values(ticketsChartData.openTicketsByMonth),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'inProgress',
            data: Object.values(ticketsChartData.inProgressTicketsByMonth),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'resolved',
            data: Object.values(ticketsChartData.resolvedTicketsByMonth),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
  
    function processTickets(){
      // fetch the current data
      let currentDate = new Date();
      // calculate tenthDate from today
      let tenthDayfromToday = new Date();
      tenthDayfromToday.setDate(currentDate.getDate() - 10);
  
      if(ticketsState.ticketList.length > 0){
          let openTicketsData = {};
          let inProgressTicketsData = {};
          let resolvedTicketsData = {};

          let openTicketsByMonth = {'January': 0, 'February': 0, 'March': 0, 'April': 0, 'May': 0, 'June': 0, 'July': 0, 'August': 0, 'September': 0, 'October': 0, 'November': 0, 'December': 0};
          let inProgressTicketsByMonth = {'January': 0, 'February': 0, 'March': 0, 'April': 0, 'May': 0, 'June': 0, 'July': 0, 'August': 0, 'September': 0, 'October': 0, 'November': 0, 'December': 0};
          let resolvedTicketsByMonth = {'January': 0, 'February': 0, 'March': 0, 'April': 0, 'May': 0, 'June': 0, 'July': 0, 'August': 0, 'September': 0, 'October': 0, 'November': 0, 'December': 0};
  
          // initilze the frequency maps with default value 0 for 10 days
          for(let i = 0; i < 10; i++){
              const dateObject = new Date();
              dateObject.setDate(currentDate.getDate() - i);
              
              openTicketsData[dateObject.toISOString().split('T')[0]] = 0;
              inProgressTicketsData[dateObject.toISOString().split('T')[0]] = 0;
              resolvedTicketsData[dateObject.toISOString().split('T')[0]] = 0;
          }
  
          // process all the tickets one by one
  
          ticketsState.ticketList.forEach(ticket => {
              const date = ticket.createdAt.split("T")[0];
              const ticketDate = new Date(ticket.createdAt);
  
              if(ticket.status == "open" && ticketDate >= tenthDayfromToday){
                  openTicketsData[date] = openTicketsData[date] + 1;
              }
  
              if(ticket.status == "inProgress" && ticketDate >= tenthDayfromToday){
                  inProgressTicketsData[date] = inProgressTicketsData[date] + 1;
              }
  
              if(ticket.status == "resolved" && ticketDate >= tenthDayfromToday){
                  resolvedTicketsData[date] = resolvedTicketsData[date] + 1;
              }

              // month wise data
              let month = ticketDate.toLocaleString('default', { month: 'long' });

              if(ticket.status == "open"){
                openTicketsByMonth[month] += 1;
              }

              if(ticket.status == "inProgress"){
                inProgressTicketsByMonth[month] += 1;
              }

              if(ticket.status == "resolved"){
                resolvedTicketsByMonth[month] += 1;
              }
              
          });
          setTicketsChartData({
              openTickets: openTicketsData,
              inProgressTickets: inProgressTicketsData,
              resolvedTickets: resolvedTicketsData,
              openTicketsByMonth: openTicketsByMonth,
              inProgressTicketsByMonth: inProgressTicketsByMonth,
              resolvedTicketsByMonth: resolvedTicketsByMonth
          });
      }
  
    }
  
    useEffect(() => {
      processTickets();
    },[ticketsState.ticketList]);

    return [pieChartData, lineChartData, barChartData];
}

export default useCharts;