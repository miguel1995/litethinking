import { BsArrowBarLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import ListCompany from "../../components/company/listCompany";
import ShowUser from "../../components/user/showUser";
import { setLogout } from "../../state";
const UserPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (

        <div className="container" style={{backgroundColor: "#FFFFFFE6"}}>
            <br/>
            <br/>
            <br/>
            <Button onClick={()=>{
            dispatch(setLogout());
            navigate("/");
            }
            
            }><BsArrowBarLeft/> Log  Out</Button>
            <br/>
            <br/>
            <br/>
            <ShowUser></ShowUser>
            <ListCompany/>
        </div>

        
    );
}

export default UserPage;