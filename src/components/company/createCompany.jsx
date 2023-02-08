import FormCompany from "../common/formCompany";


const CreateCompany = (props) => {

    const saveValues = async(values) =>{

        alert(values);
        
        const savedUserResponse = await fetch(
            "https://97nsdaz2xh.execute-api.us-east-1.amazonaws.com/companies",
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
            <FormCompany  handleSave={saveValues}/>
        </div>
    );
}

export default CreateCompany;

