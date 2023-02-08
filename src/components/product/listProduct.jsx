import { useEffect, useState } from "react";
import { BsCloudDownload, BsEnvelopeFill, BsFillEyeFill, BsPlusSquare, BsTrashFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Input, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import CreateProduct from "./createProduct";
import DeleteProduct from "./deleteProduct";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import DownloadPDF from "./downloadPdf";
import { useSelector } from "react-redux";




const ListProduct = (props) => {

    const [modal, setModal] = useState(false);
    const [modalCreate, setModalCreate] = useState(false);
    const [modalSend, setModalSend] = useState(false);

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    let { companyId } = useParams();
    const type = useSelector((state)=>state.user.type);
    const isAdministrator = (type=="ADMINISTRATOR")?true:false;



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
    const toggleSend = () => setModalSend(!modalSend);


    const [base64, setBase64] = useState("");
 
    const onChange = (e) => {
      const files = e.target.files;
      const file = files[0];
      getBase64(file);
    };
   
    const onLoad = (fileString) => {
      setBase64(fileString);
      console.log(base64);
    };
   
    const getBase64 = (file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(file);
        onLoad(reader.result);
        console.log(base64);
      };
    };
   
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(
        "https://97nsdaz2xh.execute-api.us-east-1.amazonaws.com/products/sendemail",
        {
        mode: "no-cors",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderName: "yiteni5897@bymercy.com",
            senderEmail: "yiteni5897@bymercy.com",
            message: "HELLO WORLD THIS IS FROM REACT APP P.S.",
            base64Data: base64,
            date: new Date(),
            fileName: "TEST_FILE_NAME",
          }),
        }
      );
    };






    return (
        <div>

            {/*<div className="App">
                <form>
                    <input type="file" accept="application/pdf" onChange={onChange} />
                </form>
                <button onClick={handleSubmit}>SEND TO LAMBDA</button>
                </div>*/}

            <Row>
                <Col md="2">
            {/*<!-- Button trigger modal -->*/}
            <Button color="primary" onClick={toggleCreate}>
                <BsPlusSquare/>  New Product
            </Button>
            </Col>
            <Col md="2">
                {/*<!-- Button Download PDF -->*/}
            <PDFDownloadLink document={<DownloadPDF products={products}/>}
            fileName="inventory.pdf"
            >
            <Button color="success">
                <BsCloudDownload/>  Download
            </Button>
            </PDFDownloadLink>
            </Col>
            <Col md="2">
            <Button color="success" onClick={toggleSend}>
                <BsEnvelopeFill/>  Send to Email
            </Button>
            </Col>
            </Row>

                {/*<!-- Modal Dialog to create product -->*/}
            <div>
                <Modal isOpen={modalCreate} toggle={toggleCreate} >
                    <ModalHeader toggle={toggleCreate}></ModalHeader>
                    <ModalBody>
                        <CreateProduct toggle={toggleCreate} confirmSave={loadProducts}/>
                    </ModalBody>
                </Modal>
            </div>

            {/*<!-- Modal Dialog to send email -->*/}
            <div>
                <Modal isOpen={modalSend} toggle={toggleSend} >
                    <ModalHeader toggle={toggleSend}></ModalHeader>
                    <ModalBody>
                        <p>Enter the recipient email</p>
                        <Input
                            type="email"
                        />
                        
                    <Button color="primary" onClick={()=>{console.log("Enviar Email")}}>
                    <BsEnvelopeFill/>  Send
                    </Button>
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
                                    { isAdministrator &&(
                                    <td>
                                        <div>
                                        <Modal isOpen={modal} toggle={toggle} >
                                            <ModalHeader toggle={toggle}></ModalHeader>
                                            <ModalBody>
                                                <DeleteProduct toggle={toggle} product={data} confirmDelete={loadProducts}/>
                                            </ModalBody>
                                        </Modal>
                                        </div>
                                    </td>)}
                                    
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