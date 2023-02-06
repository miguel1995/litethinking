import { Button, Col, Row } from "reactstrap";

const DeleteCompany = (props) => {


    const apiUrl = "https://97nsdaz2xh.execute-api.us-east-1.amazonaws.com"
    const deleteCompany = async () => {
        const response = await fetch(`${apiUrl}/companies/${props.company.id}`, {
            method: "DELETE",
            //headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log(data);
        props.confirmDelete();
        props.toggle();
    };

    return (
        <div>
            <h4>Are you sure to delete the company ?</h4>
            <Row>
                <Col>
                    <Button
                        onClick={deleteCompany}
                        color="primary"
                    >Yes</Button>
                </Col>
                <Col>
                <Button
                    onClick={props.toggle}
                    color="primary"
                >No</Button>
            </Col>
            </Row>
            
        </div>
    );
}

export default DeleteCompany;