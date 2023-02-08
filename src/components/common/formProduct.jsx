import { Formik, Field } from 'formik';
import { useEffect } from 'react';

const FormProduct = (props) => {

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
   console.log(props);
  }, []);   

    return (
        <div>

        <Formik
          initialValues={{name:props.product.name, code:props.product.code, quantity:props.product.quantity, price:props.product.price}}
          validate={values => {
            const errors = {};
            if(!values.name){
              errors.name = 'Required';
            }
            
            if (!values.code) {
              errors.code = 'Required';
            }
            if(!values.quantity){
              errors.quantity = 'Required';
            }
            if (!values.price) {
              errors.price = 'Required';
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            values["id"]=props.product.id;
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
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className="form-control"
                    id="inputName1"
                    placeholder="Enter name" />
                </div>
                
                <div className="form-group">
                  <label>Code</label>
                  <input
                    type="text"
                    name="code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.code}
                    className="form-control"
                    id="InputAddress"
                    placeholder="123 Main St" />
                </div>


                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.quantity}
                    className="form-control"
                    id="quantity"
                    placeholder="..."/>
                </div>
               
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    className="form-control"
                    id="price"
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

export default FormProduct;