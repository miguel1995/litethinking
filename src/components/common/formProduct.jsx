import {  Formik} from 'formik';
import { useParams } from 'react-router-dom';

const FormProduct = (props) => {

  let { companyId } = useParams();

  const {
    name,
    code,
    quantity,
    price
    } =props.product || "";


    return (
        <div>

        <Formik
          initialValues={{name:name, code:code, quantity:quantity, price:price}}
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
            const currentDate = new Date();
            const timestamp = currentDate.getTime();
            values["id"]=(props.product)?props.product.id:timestamp.toString();
            values["idCompany"]=parseInt(companyId);
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
                    placeholder="COD123" />
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