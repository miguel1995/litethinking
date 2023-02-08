import FormProduct from "../common/formProduct";

const CreateProduct = (props) => {

    const saveValues = async(values) =>{

        alert(values);
        
        const savedUserResponse = await fetch(
            "https://97nsdaz2xh.execute-api.us-east-1.amazonaws.com/products",
            {
                method: "PUT",
                body: values,
            }
        );

        const savedUser = await savedUserResponse.json();
        console.log(savedUser);
        props.toggle();
        props.confirmSave();

    }

    return (
        <div>
            <FormProduct  handleSave={saveValues}/>
        </div>
    );
}

export default CreateProduct;

