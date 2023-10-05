import { useEffect } from 'react';
import {Bar, Line,Pie } from 'react-chartjs-2';
import { BsFillPencilFill } from "react-icons/bs";
import { MdCancel,MdOutlineDoneAll, MdPending } from 'react-icons/md';
import { TbProgressBolt } from 'react-icons/tb';

import useCharts from '../../hooks/useCharts.';
import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../Layouts/HomeLayout";
import Card from '..//../components/Card';

const Home = () => {

  const [ticketsState] = useTickets();
  const [pieChartData, lineChartData, barChartData] = useCharts();

  return (
     <HomeLayout>
            <div>
            {ticketsState && (
              <div className="flex flex-row justify-center items-center gap-5 mt-8 flex-wrap">
              <Card 
                  titleText="open"
                   status={ticketsState.ticketDistribution.open / ticketsState.downloadedTickets.length}
                   quantity={ticketsState.ticketDistribution.open}
                   background='bg-yellow-300'
                   borderColor='border-green-300'
                   fontColor='text-black'
                   dividerColor='bg-black'>
                  <BsFillPencilFill className='inline mr-2' />
              </Card>
  
              <Card 
                  titleText="inProgress"
                   status={ticketsState.ticketDistribution.inProgress / ticketsState.downloadedTickets.length}
                   quantity={ticketsState.ticketDistribution.inProgress}
                   background='bg-orange-300'
                   borderColor='border-red-300'
                   fontColor='text-black'
                   dividerColor='bg-black'>
                  <TbProgressBolt className='inline mr-2' />
              </Card>

              <Card 
                  titleText="resolved"
                   status={ticketsState.ticketDistribution.resolved / ticketsState.downloadedTickets.length}
                   quantity={ticketsState.ticketDistribution.resolved}
                   background='bg-purple-300'
                   borderColor='border-blue-700'
                   fontColor='text-black'
                   dividerColor='bg-black'>
                  <MdOutlineDoneAll className='inline mr-2' />
              </Card>

              <Card 
                  titleText="onHold"
                   status={ticketsState.ticketDistribution.onHold / ticketsState.downloadedTickets.length}
                   quantity={ticketsState.ticketDistribution.onHold}
                   background='bg-gray-300'
                   borderColor='border-gray-800'
                   fontColor='text-black'
                   dividerColor='bg-black'>
                  <MdPending className='inline mr-2' />
              </Card>

              <Card 
                  titleText="cancelled"
                   status={ticketsState.ticketDistribution.cancelled / ticketsState.downloadedTickets.length}
                   quantity={ticketsState.ticketDistribution.cancelled}
                   background='bg-blue-300'
                   borderColor='border-violet-300'
                   fontColor='text-black'
                   dividerColor='bg-black'>
                   <MdCancel className='inline mr-2' />
              </Card>
          </div>
            )}
            
            </div>

            <div className="mt-10 flex justify-center items-center gap-10">
               <div className="w-80 h-80 ">
               <Pie data={pieChartData}/>
               </div>
            </div>

            <div className="mt-10 mb-10 flex justify-center items-center gap-10">
                <div className="w-[50rem] bg-[wheat]">
                    <Line data={lineChartData}/>
                </div>
            </div>
            <div className="mt-10 mb-10 flex justify-center items-center gap-10">
                <div className="w-[50rem] bg-[wheat]">
                    <Bar data={barChartData}/>
                </div>
            </div>
     </HomeLayout>
  );
};

export default Home;