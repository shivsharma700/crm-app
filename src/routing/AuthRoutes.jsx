import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function AuthRoutes({allowListRoles}){
    const {role} = useSelector((state) => state.auth);
    return(
        <>
          {allowListRoles.find((givenRole) => givenRole == role )? <Outlet/> : <div>denied</div>}
        </>
    );
}

export default AuthRoutes;