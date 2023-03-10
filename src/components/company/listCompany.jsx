import { useEffect, useState } from "react";
import { BsCloudDownload, BsDownload, BsEnvelopeFill, BsFillEyeFill, BsPlusSquare, BsTrashFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import CreateCompany from "./createCompany";
import DeleteCompany from "./deleteCompany";


const ListCompany = () => {

    const [modal, setModal] = useState(false);
    const [modalCreate, setModalCreate] = useState(false);
    const [companies, setCompanies] = useState([]);
    const navigate = useNavigate();
    const type = useSelector((state)=>state.user.type);
    const isAdministrator = (type=="ADMINISTRATOR")?true:false;

    const apiUrl = "https://97nsdaz2xh.execute-api.us-east-1.amazonaws.com"
    
    //Load Companies List from API
    const loadCompanies = async () => {
        const response = await fetch(`${apiUrl}/companies`, {
            method: "GET",
            //headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log(data);
        setCompanies(data);
    };

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        loadCompanies();
    }, []);

    const toggle = () => setModal(!modal);
    const toggleCreate = () => setModalCreate(!modalCreate);

    return (
        <div>
            {/*<!-- Button trigger modal -->*/}
            {isAdministrator && (

            <Button color="primary" onClick={toggleCreate}>
                <BsPlusSquare/>  New Company
            </Button>)}
            
            <div>
                <Modal isOpen={modalCreate} toggle={toggleCreate} >
                    <ModalHeader toggle={toggleCreate}></ModalHeader>
                    <ModalBody>
                        <CreateCompany toggle={toggleCreate} confirmSave={loadCompanies}/>
                    </ModalBody>
                </Modal>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>NIT</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Actions</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {
                        companies.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{data.nit}</td>
                                    <td>{data.name}</td>
                                    <td>{data.phone}</td>
                                    <td>{data.address}</td>
                                    <td>
                                        <Row>
                                            <Col>
                                                <Button
                                                    onClick={() => {
                                                        navigate("/company/" + data.id);
                                                    }}
                                                    color="info"
                                                >
                                                    <BsFillEyeFill />
                                                </Button></Col>
                                                {isAdministrator&&(
                                                    <Col>
                                                    <Button
                                                        onClick={toggle}
                                                        color="danger"
                                                    >
                                                        <BsTrashFill />
                                                    </Button>
                                                </Col>
                                                )}
                                            
                                        </Row>
                                    </td>
                                    <td>
                                        <div>
                                        <Modal isOpen={modal} toggle={toggle} >
                                            <ModalHeader toggle={toggle}></ModalHeader>
                                            <ModalBody>
                                                <DeleteCompany toggle={toggle} company={data} confirmDelete={loadCompanies}/>
                                            </ModalBody>
                                        </Modal>
                                        </div>
                                    </td>
                                </tr>



                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default ListCompany;