import { Field, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state";
import md5 from "md5";


const CreateUser = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const createNewUser = async(values) =>{

      const savedUserResponse = await fetch(
          "https://97nsdaz2xh.execute-api.us-east-1.amazonaws.com/users",
          {
              method: "PUT",
              body: values,
          }
      );
      console.log(savedUserResponse);      
      const savedUser = await savedUserResponse.json();
      console.log(savedUser);      

      dispatch(setLogin({
        user: savedUser,
        //token: loggedIn.token
        token: "TOKEN"
    }));
      navigate("/home");
    
  }


    return (
        <div className="container">
          

            
                      <div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <h4>Create an account</h4>
                      <Formik
                        initialValues={{name:'', email:'', type:"ADMINISTRATOR", password:''}}
                        validate={values => {
                          const errors = {};
                          if(!values.name){
                            errors.name = 'Required';
                          }
                          if (!values.email) {
                            errors.email = 'Required';
                          } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                          ) {
                            errors.email = 'Invalid email address';
                          }
                          if(!values.type){
                            errors.type = 'Required';
                          }
                          if (!values.password) {
                            errors.password = 'Required';
                          }
              
                          return errors;
                        }}
                        
                        onSubmit={ (values, { setSubmitting }) => {
                            console.log("holaaaa");
                            //console.log(JSON.stringify(values, null, 2));
                          const currentDate = new Date();
                          const timestamp = currentDate.getTime();
                          values["id"]=timestamp.toString();
                          values["password"] = md5(values.password);
                          console.log(JSON.stringify(values, null, 2));
                          createNewUser(JSON.stringify(values, null, 2));
                          
                        }}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          /* and other goodies */
                        }) => (
                          <div>
                            <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                  type="name"
                                  name="name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.name}
                                  className="form-control"
                                  id="inputName"
                                  placeholder="Enter name" />
                              </div>
                              
                              <div className="form-group">
                                <label>Email address</label>
                                <input
                                  type="email"
                                  name="email"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.email}
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted">{errors.email && touched.email && errors.email}</small>
                              </div>
              
              
              
                                <div className="form-group">
                                 <label>Select option</label>
                                 <Field
                                 name="type" as="select"
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={values.type}
                                className="form-control" 
                                id="exampleFormControlSelect1">
                                <option value="ADMINISTRATOR">Administrator</option>
                                <option value="EXTERNAL">External</option>
                               </Field>
                             </div>
               
                              <div className="form-group">
                                <label>Password</label>
                                <input
                                  type="password"
                                  name="password"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.password}
                                  className="form-control"
                                  id="inputPassword1"
                                  placeholder="Password"/>
                              </div>
              
                              <button type="submit" className="btn btn-primary" >Sing in</button>
              
                            </form>
              
                          </div>
                        )}
                      </Formik>
                    </div>
              
            
        </div>
    );
}

export default CreateUser;