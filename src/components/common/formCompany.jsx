import { Formik, Field } from 'formik';
import { useEffect } from 'react';

const FormCompany = (props) => {

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
   console.log(props);
  }, []);   

    return (
        <div>

        <Formik
          initialValues={{name:props.company.name, address:props.company.address, nit:props.company.nit, phone:props.company.phone}}
          validate={values => {
            const errors = {};
            if(!values.name){
              errors.name = 'Required';
            }
            
            if (!values.address) {
              errors.address = 'Required';
            }
            if(!values.nit){
              errors.nit = 'Required';
            }
            if (!values.phone) {
              errors.phone = 'Required';
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            values["id"]=props.company.id;
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
                    id="inputName1"
                    placeholder="Enter name" />
                </div>
                
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    className="form-control"
                    id="InputAddress"
                    placeholder="123 Main St" />
                </div>


                <div className="form-group">
                  <label>NIT</label>
                  <input
                    type="text"
                    name="nit"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nit}
                    className="form-control"
                    id="nit"
                    placeholder="..."/>
                </div>
               
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    className="form-control"
                    id="phone"
                    placeholder=""/>
                </div>

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Save</button>

              </form>

            </div>
          )}
        </Formik>
      </div>

    );
}

export default FormCompany;