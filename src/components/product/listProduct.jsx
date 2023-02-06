import { useEffect, useState } from "react";
import { BsFillEyeFill, BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import DeleteProduct from "./deleteProduct";



const ListProduct = () => {

    const [modal, setModal] = useState(false);

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const apiUrl = "https://97nsdaz2xh.execute-api.us-east-1.amazonaws.com"

    const loadProducts = async () => {
        const response = await fetch(`${apiUrl}/products`, {
            method: "GET",
            //headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log(data);
        setProducts(data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const toggle = () => setModal(!modal);

    return (
        <div>
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