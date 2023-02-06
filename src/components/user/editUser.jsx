import FormUser from "../common/formUser";

const EditUser = (props) => {

    const saveValues = async(values) =>{

        props.toggle();
        const savedUserResponse = await fetch(
            "https://97nsdaz2xh.execute-api.us-east-1.amazonaws.com/users",
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
            <FormUser  handleSave={saveValues} user={props.user}/>
        </div>
    );
}

export default EditUser;

