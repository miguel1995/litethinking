import FormCompany from "../common/formCompany";

const EditCompany = (props) => {

    const saveValues = async(values) =>{

        props.toggle();
        alert(values)

        const savedUserResponse = await fetch(
            "https://97nsdaz2xh.execute-api.us-east-1.amazonaws.com/companies",
            {
                method: "PUT",
                body: values,
            }
        );

        const savedUser = await savedUserResponse.json();
        console.log(savedUser);
        props.confirmSave();

    }

    return (
        <div>
            <FormCompany  handleSave={saveValues} company={props.company}/>
        </div>
    );
}

export default EditCompany;

