import ShowCompany from "../../components/company/showCompany";
import ListProduct from "../../components/product/listProduct";

const CompanyPage = () => {

    return (
        <div className="container" style={{backgroundColor: "#FFFFFFE6"}}>
            <ShowCompany></ShowCompany>
            <ListProduct></ListProduct>
        </div>
    );
}

export default CompanyPage;