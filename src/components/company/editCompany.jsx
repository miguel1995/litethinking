import FormCompany from "../common/formCompany";

const EditCompany = (props) => {

    const saveValues = async(values) =>{

        props.toggle();
        
        const savedUserResponse = await fetch(
            "https://97nsdaz2xh.execute-api.us-east-1.amazonaws.com/companies",
            {
                method: "PUT",
                body: values,
            }
        );

        const savedUser = await savedUserResponse.json();
        console.log(savedUser);
    }

    return (
        <div>
            <FormCompany  handleSave={saveValues} user={props.company}/>
        </div>
    );
}

export default EditCompany;

