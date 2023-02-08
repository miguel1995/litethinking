import { useEffect, useState } from "react";
import { BsFillEyeFill, BsPlusSquare, BsTrashFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import CreateProduct from "./createProduct";
import DeleteProduct from "./deleteProduct";



const ListProduct = (props) => {

    const [modal, setModal] = useState(false);
    const [modalCreate, setModalCreate] = useState(false);

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    let { companyId } = useParams();


    const apiUrl = "https://97nsdaz2xh.execute-api.us-east-1.amazonaws.com"

    //Load Product List from API Backend
    const loadProducts = async () => {
        const response = await fetch(`${apiUrl}/products/company/${companyId}`, {
            method: "GET",
            //headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setProducts(data);
    };

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        loadProducts();
    },[]);

    const toggle = () => setModal(!modal);
    const toggleCreate = () => setModalCreate(!modalCreate);


    return (
        <div>
            {/*<!-- Button trigger modal -->*/}
            <Button color="primary" onClick={toggleCreate}>
                <BsPlusSquare/>  New Product
            </Button>

            <div>
                <Modal isOpen={modalCreate} toggle={toggleCreate} >
                    <ModalHeader toggle={toggleCreate}></ModalHeader>
                    <ModalBody>
                        <CreateProduct toggle={toggleCreate} confirmSave={loadProducts}/>
                    </ModalBody>
                </Modal>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quiantity</th>
                        <th>Actions</th>
                        <th></th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{data.code}</td>
                                    <td>{data.name}</td>
                                    <td>{data.price}</td>
                                    <td>{data.quantity}</td>
                                    <td>
                                        <Row>
                                            <Col>
                                                <Button
                                                    onClick={() => {
                                                        navigate("/product/" + data.id);
                                                    }}
                                                    color="info"
                                                >
                                                    <BsFillEyeFill />
                                                </Button></Col>
                                            <Col>
                                                <Button
                                                    onClick={toggle}
                                                    color="danger"
                                                >
                                                    <BsTrashFill />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </td>
                                    <td>
                                        <div>
                                        <Modal isOpen={modal} toggle={toggle} >
                                            <ModalHeader toggle={toggle}></ModalHeader>
                                            <ModalBody>
                                                <DeleteProduct toggle={toggle} product={data} confirmDelete={loadProducts}/>
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

export default ListProduct;