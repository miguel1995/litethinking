import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EditCompany from "./editProduct";

const ShowProduct = () => {
    const [product, setProduct] = useState(null);
    const [modal, setModal] = useState(false);

    const apiUrl = "https://97nsdaz2xh.execute-api.us-east-1.amazonaws.com"
    let { productId } = useParams();
    const type = useSelector((state) => state.user.type);
    const isAdministrator = (type == "ADMINISTRATOR") ? true : false;

    //Load Product Info from API Backend
    const loadProduct = async () => {

        const response = await fetch(`${apiUrl}/products/${productId}`, {
            method: "GET",
            //headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setProduct(data);
    };

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        loadProduct();
    }, []);


    const toggle = () => setModal(!modal);

    return (

        <div>
            <div className="jumbotron">

                <div className="row">
                    <div className="col-md-4">
                        <h1 className="display-4">{(product != null)?product.name:""}</h1>
                        <p className="lead">{(product != null)?product.code:""}</p>
                        <p>${(product != null)?product.price:""}</p>
                        <p>{(product != null)?product.quantity:""} in stock</p>
                        <hr className="my-4" />
                    </div>
                    <div className="col-md-3">
                        <br />
                        <br />
                        <p className="lead">
                            {/*<!-- Button trigger modal -->*/}
                            {isAdministrator&&(
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
                        <EditCompany toggle={toggle} product={product} confirmSave={loadProduct}/>
                    </ModalBody>
                </Modal>
            </div>

        </div>

    );
}

export default ShowProduct;

