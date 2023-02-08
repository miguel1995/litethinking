import FormCompany from "../common/formCompany";


const CreateCompany = (props) => {

    const saveValues = async(values) =>{
        
        const savedUserResponse = await fetch(
            "https://97nsdaz2xh.execute-api.us-east-1.amazonaws.com/companies",
            {
                method: "PUT",
                body: values,
            }
        );

        const savedUser = await savedUserResponse.json();
        props.toggle();
        props.confirmSave();

    }

    return (
        <div>
            <FormCompany  handleSave={saveValues}/>
        </div>
    );
}

export default CreateCompany;

