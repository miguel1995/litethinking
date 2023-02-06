import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EditUser from "./editUser";

const ShowUser = () => {

    const [user, setUser] = useState(null);
    const [modal, setModal] = useState(false);

    const apiUrl = "https://97nsdaz2xh.execute-api.us-east-1.amazonaws.com"
    const userId = 4;
    const loadUser = async () => {
        const response = await fetch(`${apiUrl}/users/${userId}`, {
            method: "GET",
            //headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log(data);
        setUser(data);
    };

    useEffect(() => {
        loadUser();
    }, []);

    if (!user) {
        return null;
    }


    const {
        name,
        email,
        type
    } = user;

    const toggle = () => setModal(!modal);

    return (
        <div>
            <div className="jumbotron">

                <div className="row">
                    <div className="col-md-4">
                        <h1 className="display-4">{name}</h1>
                        <p className="lead">{type}</p>
                        <p>{email}</p>
                        <hr className="my-4" />
                    </div>
                    <div className="col-md-3">
                        <br />
                        <br />
                        <p className="lead">
                            {/*<!-- Button trigger modal -->*/}
                            <Button color="primary" onClick={toggle}>
                                <BsFillPencilFill />  Edit
                            </Button>
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}></ModalHeader>
                    <ModalBody>
                        <EditUser toggle={toggle} user={user} confirmSave={loadUser}/>
                    </ModalBody>
                </Modal>
            </div>

        </div>

    );
}

export default ShowUser;

