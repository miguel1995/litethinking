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
          initialValues={{name:'', address:'', NIT:'', phoneNumber:''}}
          validate={values => {
            const errors = {};
            if(!values.name){
              errors.name = 'Required';
            }
            if (!values.address) {
              errors.address = 'Required';
            }
            if(!values.NIT){
              errors.NIT = 'Required';
            }
            if (!values.phoneNumber) {
              errors.phoneNumber = 'Required';
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
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
              <div class="form-group">
                  <label>Name</label>
                  <input
                    type="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    class="form-control"
                    id="inputName1"
                    placeholder="Enter name" />
                </div>
                
                <div class="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    class="form-control"
                    id="InputAddress"
                    placeholder="123 Main St" />
                </div>


                <div class="form-group">
                  <label>NIT</label>
                  <input
                    type="text"
                    name="NIT"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.NIT}
                    class="form-control"
                    id="NIT"
                    placeholder="..."/>
                </div>
               
                <div class="form-group">
                  <label>Phone Number</label>
                  <input
                    type="number"
                    name="phoneNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                    class="form-control"
                    id="phoneNumber"
                    placeholder="000000"/>
                </div>


                <button type="submit" class="btn btn-primary" disabled={isSubmitting}>Sing in</button>

              </form>

            </div>
          )}
        </Formik>
      </div>

    );
}

export default FormCompany;