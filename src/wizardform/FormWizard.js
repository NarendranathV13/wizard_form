import React from 'react'
import '../wizardform/style.css'
import { Field } from 'react-final-form'
import Wizard from './Wizard'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}
const isValidEmail = value => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(value) ? undefined : 'Invalid email address';
}

const isValidPhoneNumber = value => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(value) ? undefined : 'Invalid phone number';
}

const isValidPinCode = value => {
  const pinRegex = /^[1-9][0-9]{5}$/;
  return pinRegex.test(value) ? undefined : 'Invalid pin code';
}

const required = value => (value ? undefined : 'Required')

const Error = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
)

const FormWizard = () => (
  <>
    <h1>React Final Form Example</h1>
    <h2>Wizard Form</h2>
    <Wizard
      onSubmit={onSubmit}
    >
      <Wizard.Page>
        <div>
          <label>First Name</label>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
            validate={required}
          />
          <Error name="firstName" />
        </div>
        <div>
          <label>Last Name</label>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
            validate={required}
          />
          <Error name="lastName" />
        </div>
      </Wizard.Page>
      <Wizard.Page
        validate={values => {
          const errors = {}
          if (!values.email) {
            errors.email = 'Required'
          } else {
            const emailError = isValidEmail(values.email);
            if (emailError) errors.email = emailError;
          }
          if (!values.phone) {
            errors.phone = 'Required'
          } else {
            const phoneError = isValidPhoneNumber(values.phone);
            if (phoneError) errors.phone = phoneError;
          }
          return errors
        }}
      >
        <div>
          <label>Email</label>
          <Field
            name="email"
            component="input"
            type="text"
            placeholder="Email"
          />
          <Error name="email" />
        </div>
        <div>
          <label>Phone</label>
          <Field
            name="phone"
            component="input"
            type="phone"
            placeholder="Phone"
          />
          <Error name="phone" />
        </div>
      </Wizard.Page>
      <Wizard.Page
        validate={values => {
          const errors = {}
          if (!values.pin) {
            errors.pin = 'Required'
          } else {
            const pinError = isValidPinCode(values.pin);
            if (pinError) errors.pin = pinError;
          }
          if (!values.Address) {
            errors.Address = 'Required'
          }
          return errors
        }}
      >
        <div>
          <label>Pin</label>
          <Field
            name="pin"
            component="input"
            type="number"
            placeholder="Pin code"
          />
          <Error name="pin" />
        </div>
        <div>
          <label>Address</label>
          <Field
            name="Address"
            component="input"
            type="text"
            placeholder="Address"
          />
          <Error name="Address" />
        </div>
      </Wizard.Page>
      <Wizard.Page
        validate={values => {
          const errors = {}
          if (!values.notes) {
            errors.notes = 'Required'
          }
          return errors
        }}
      >
        <div>
          <label>Gender</label>
          <div>
            <label>
              <Field
                name="gender"
                component="input"
                type="radio"
                value="Male"
              />
              Male
            </label>
            <label>
              <Field
                name="gender"
                component="input"
                type="radio"
                value="female"
              />
              Female
            </label>
          </div>
        </div>
        <div>
          <label>Notes</label>
          <Field name="notes" component="textarea" placeholder="Notes" />
          <Error name="notes" />
        </div>
      </Wizard.Page>
    </Wizard>
  </>
)
export default FormWizard


//below code is with formik 

// import React from 'react';
// import '../wizardform/style.css';
// import { Field, Form, Formik } from 'formik';
// import Wizard from './Wizard';
// import * as Yup from 'yup';

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// const onSubmit = async values => {
//   const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'pin', 'Address', 'gender', 'notes'];
  
//   // Check if any required field is empty
//   const isEmpty = requiredFields.some(field => !values[field]);

//   if (isEmpty) {
//     window.alert('Please fill out all required fields.');
//     return;
//   }

//   await sleep(300);

//   // Save values in local storage
//   localStorage.setItem('formValues', JSON.stringify(values));
//   window.alert(JSON.stringify(values, 0, 2));
// };
// const Error = ({ name }) => (
//   <Field
//     name={name}
//     render={({ form }) => (
//       <div className='text-danger'>{form.touched[name] && form.errors[name]}</div>
//     )}
//   />
// );

// const FormWizard = () => {
//   const initialValues = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     pin: '',
//     Address: '',
//     gender: '',
//     notes: ''
//   };

//   const validationSchema = Yup.object({
//     firstName: Yup.string().required('Required'),
//     lastName: Yup.string().required('Required'),
//     email: Yup.string().email('Invalid email address').required('Required'),
//     phone: Yup.string().required('Required'),
//     pin: Yup.string().required('Required').matches(/^\d{6}$/, 'Must be 6 digits'),
//     Address: Yup.string().required('Required'),
//     gender: Yup.string().required('Required'),
//     notes: Yup.string().required('Required')
//   });

//   return (
//     <>
//       <h1>React Final Form Example</h1>
//       <h2>Wizard Form</h2>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}
//       >
//         <Form>
//           <Wizard onSubmit={onSubmit}>
//             <Wizard.Page>
//               <div>
//                 <label>First Name</label>
//                 <Field
//                   name="firstName"
//                   component="input"
//                   type="text"
//                   placeholder="First Name"
//                 />
//                 <Error name="firstName" />
//               </div>
//               <div>
//                 <label>Last Name</label>
//                 <Field
//                   name="lastName"
//                   component="input"
//                   type="text"
//                   placeholder="Last Name"
//                 />
//                 <Error name="lastName" />
//               </div>
//             </Wizard.Page>
//             <Wizard.Page>
//               <div>
//                 <label>Email</label>
//                 <Field
//                   name="email"
//                   component="input"
//                   type="email"
//                   placeholder="Email"
//                 />
//                 <Error name="email" />
//               </div>
//               <div>
//                 <label>Phone</label>
//                 <Field
//                   name="phone"
//                   component="input"
//                   type="phone"
//                   placeholder="Phone"
//                 />
//                 <Error name="phone" />
//               </div>
//             </Wizard.Page>
//             <Wizard.Page>
//               <div>
//                 <label>Pin</label>
//                 <Field
//                   name="pin"
//                   component="input"
//                   type="number"
//                   placeholder="Pin code"
//                 />
//                 <Error name="pin" />
//               </div>
//               <div>
//                 <label>Address</label>
//                 <Field
//                   name="Address"
//                   component="input"
//                   type="text"
//                   placeholder="Address"
//                 />
//                 <Error name="Address" />
//               </div>
//             </Wizard.Page>
//             <Wizard.Page>
//               <div>
//                 <label>Gender</label>
//                 <div>
//                   <label>
//                     <Field
//                       name="gender"
//                       component="input"
//                       type="radio"
//                       value="Male"
//                     />
//                     Male
//                   </label>
//                   <label>
//                     <Field
//                       name="gender"
//                       component="input"
//                       type="radio"
//                       value="female"
//                     />
//                     Female
//                   </label>
//                 </div>
//               </div>
//               <div>
//                 <label>Notes</label>
//                 <Field name="notes" component="textarea" placeholder="Notes" />
//                 <Error name="notes" />
//               </div>
//             </Wizard.Page>
//           </Wizard>
//         </Form>
//       </Formik>
//     </>
//   );
// };

// export default FormWizard;
