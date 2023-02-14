import { useEffect, useState } from "react";
import { BsFillPencilFill, BsFillPinFill, BsFillTelephoneFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import EditCompany from "./editCompany";


const ShowCompany = () => {

    const [company, setCompany] = useState(null);
    const [modal, setModal] = useState(false);
    let { companyId } = useParams();
    const type = useSelector((state) => state.user.type);
    const isAdministrator = (type == "ADMINISTRATOR") ? true : false;


    const apiUrl = "https://97nsdaz2xh.execute-api.us-east-1.amazonaws.com"
    //Load Company Info from API Backend
    const loadCompany = async () => {
        const response = await fetch(`${apiUrl}/companies/${companyId}`, {
            method: "GET"
            //headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        setCompany(data);
    };

    useEffect(() => {
        loadCompany();
    }, []);

    if (!company) {
        return null;
    }


    const {
        name,
        nit,
        address,
        phone
    } = company;

    const toggle = () => setModal(!modal);

    return (
        <div>
            <div className="jumbotron">

                <div className="row">
                    <div className="col-md-4">
                        <h1 className="display-4">{name}</h1>
                        <p className="lead">{nit}</p>
                        <p><BsFillPinFill />{address}</p>
                        <p> <BsFillTelephoneFill /> {phone}</p>
                        <hr className="my-4" />
                    </div>
                    <div className="col-md-3">
                        <br />
                        <br />
                        <p className="lead">
                            {/*<!-- Button trigger modal -->*/}
                            {isAdministrator && (
                                <Button color="primary" onClick={toggle}>
                                    <BsFillPencilFill />  Edit
                                </Button>
                            )}

                        </p>
                    </div>
                </div>
            </div>

            <div>
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}></ModalHeader>
                    <ModalBody>
                        <EditCompany toggle={toggle} company={company} confirmSave={loadCompany} />
                    </ModalBody>
                </Modal>
            </div>

        </div>

    );
}

export default ShowCompany;