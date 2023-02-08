import ListCompany from "../../components/company/listCompany";
import ShowUser from "../../components/user/showUser";
const UserPage = () => {

    const userId = 1;

    return (

        <div className="container">
            <ShowUser></ShowUser>
            <ListCompany/>
        </div>

        
    );
}

export default UserPage;