import { Formik, Field } from 'formik';
import { useEffect } from 'react';

const FormUser = (props) => {

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
   console.log(props);
  }, []);   

    return (
        <div>
            <Formik
                initialValues={{ name: props.user.name, email: props.user.email, type: props.user.type, password: props.user.password }}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Required';
                    }
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.type) {
                        errors.type = 'Required';
                    }
                    if (!values.password) {
                        errors.password = 'Required';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    values["id"]=props.user.id;
                    props.handleSave(JSON.stringify(values, null, 2));
                    setSubmitting(false);
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
                }) => (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    className="form-control"
                                    id="inputName"
                                    placeholder="Enter name" />
                            <small id="nameHelp" className="form-text text-muted">{errors.name && touched.name && errors.name}</small>

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
                                    placeholder="Password" />
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Save</button>

                        </form>

                    </div>
                )}
            </Formik>
        </div>

    );
}

export default FormUser;