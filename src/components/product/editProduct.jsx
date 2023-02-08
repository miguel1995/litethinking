import FormProduct from "../common/formProduct";


const EditCompany = (props) => {

    const saveValues = async(values) =>{

        props.toggle();
        const savedUserResponse = await fetch(
            "https://97nsdaz2xh.execute-api.us-east-1.amazonaws.com/products",
            {
                method: "PUT",
                body: values,
            }
        );

        const savedUser = await savedUserResponse.json();
        props.confirmSave();

    }

    return (
        <div>
            <FormProduct  handleSave={saveValues} product={props.product}/>
        </div>
    );
}

export default EditCompany;

