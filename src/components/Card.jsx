import { useNavigate } from "react-router-dom";

function Card({ children, fontColor="text-white", borderColor, dividerColor, background, titleText, status, quantity }) {

    const navigate = useNavigate();

    function onCardClick(){
        navigate(`/dashboard?status=${titleText}`);
    }

    const statusVal = status*100 + "";
    return (
        <div onClick={onCardClick} className={`hover:scale-110 hover:cursor-pointer transition-all ease-out duration-500 border-b-8 ${borderColor} w-64 h-44 ${background} rounded-md flex flex-col justify-center items-center py-2`}>
            
            <div className='text-primary-content text-2xl mb-2'>
                {children} <span>{titleText}</span>
            </div>

            <div className={`divider ${dividerColor} h-0.5 mx-4 rounded-sm`}></div> 
            
            <div className='flex justify-around gap-4 items-center mt-2'>
                <div className={`text-7xl ${fontColor}`}>
                    {quantity}
                </div>
                <div className={`radial-progress ${fontColor}`} style={{"--value": statusVal.substring(0,6)}}>{statusVal.substring(0,4)}%</div>
            </div>

        </div>
    );
}

export default Card;