import { Field, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state";
import md5 from "md5";
import CreateUser from "../../components/user/createUser";


const LoginPage = () => {
    
    const [isLogin, setIsLogin] = useState(true);
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logInUser = async(values) => {
        

          const loginUser = await fetch(
              "https://97nsdaz2xh.execute-api.us-east-1.amazonaws.com/users/login",
              {
                  method: "POST",
                  body: values,
              }
          );
  
          const responseLogin = await loginUser.json();

          if(responseLogin.status==='Ok'){
            dispatch(setLogin({
              user: responseLogin.user,
              //token: loggedIn.token
              token: "TOKEN"
          }));
            navigate("/home");
          }else{
            console.log("responseLogin -> ",responseLogin);
            alert("Usuario o contraseña incorrectos")
          }
      

        
    }

    return (
        <div className="container" style={{backgroundColor: "#FFFFFFC8"}}>
            {isLogin && (
                <>
                    <div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <h4>Welcome</h4>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }

                                if (!values.password) {
                                    errors.password = 'Required';
                                }

                                return errors;
                            }}
                            onSubmit={async (values, { setSubmitting }) => {

                              
                              values["password"] = md5(values.password);
                                logInUser(JSON.stringify(values, null, 2));

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
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder="Password" />
                                            <small id="emailHelp" className="form-text text-muted">{errors.password && touched.password && errors.password}</small>
                                        </div>
                                        <br/>
                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Log In</button>
                                        <br/>
                                        <a 
                                        className="alert-link"
                                        onClick={()=>{
                                            setIsLogin(false);                                        
                                            setIsRegister(true);                                    
                                        }}>You haven't registered yet, create a new account</a>
                                    </form>

                                </div>
                            )} 
                            
                        </Formik>
                    </div>
                </>
            )}

            {isRegister && (
                      <CreateUser/>
              
            )}
        </div>
    );
}

export default LoginPage;