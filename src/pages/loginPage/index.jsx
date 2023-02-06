import { Field, Formik } from "formik";
import { useState } from "react";

const LoginPage = () => {
    
    const [isLogin, setIsLogin] = useState(true);
    const [isRegister, setIsRegister] = useState(false);
    
    const createNewUser = (values) => {
        //TODO:// LLAMAR AL API
    }

    const logInUser = (values) => {
        //TODO:// LLAMAR AL API AND REDIRECT
    }

    return (
        <div className="container">
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
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }, 400);

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
                      <div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <h4>Create an account</h4>
                      <Formik
                        initialValues={{name:'', email:'', type:'', password:''}}
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
                        onSubmit={(values, { setSubmitting }) => {
                          setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                          }, 400);
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
              
                              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Sing in</button>
              
                            </form>
              
                          </div>
                        )}
                      </Formik>
                    </div>
              
            )}
        </div>
    );
}

export default LoginPage;