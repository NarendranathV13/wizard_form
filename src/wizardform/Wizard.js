import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'

export default class Wizard extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }
  static Page = ({ children }) => children

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      values: props.initialValues || {}
    }
  }
  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }))

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }))

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ]
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  handleSubmit = values => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;

    if (isLastPage) {
      // Store values in local storage
      localStorage.setItem('formValues', JSON.stringify(values));

      return onSubmit(values);
    } else {
      this.next(values);
    }
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;

    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            {activePage}
            <div className="buttons">
              {page > 0 && (
                <button type="button" onClick={this.previous}>
                  « Previous
                </button>
              )}
              {!isLastPage && <button type="submit">Next »</button>}
              {isLastPage && (
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
              )}
            </div>
          </form>
        )}
      </Form>
    );
  }
}

//below code is with formik 

// import React from 'react';
// import PropTypes from 'prop-types';
// import { FormikContext } from 'formik';

// export default class Wizard extends React.Component {
//   static propTypes = {
//     onSubmit: PropTypes.func.isRequired
//   };

//   static Page = ({ children }) => children;

//   constructor(props) {
//     super(props);
//     this.state = {
//       page: 0
//     };
//   }

//   next = () => {
//     this.setState(state => ({
//       page: Math.min(state.page + 1, this.props.children.length - 1)
//     }));
//   };

//   previous = () => {
//     this.setState(state => ({
//       page: Math.max(state.page - 1, 0)
//     }));
//   };

// handleSubmit = async (values, formikBag) => {
//   const { page } = this.state;
//   const isLastPage = page === React.Children.count(this.props.children) - 1;

//   // Validate the current page's fields
//   const activePage = React.Children.toArray(this.props.children)[page];
//   const errors = activePage.props.validate ? activePage.props.validate(values) : {};

//   // Check if there are any validation errors on the current page
//   const hasErrors = Object.keys(errors).length > 0;

//   if (!hasErrors) {
//     if (isLastPage) {
//       await this.props.onSubmit(values);
//     } else {
//       this.next();
//       formikBag.setTouched({}); // Reset touched state for the next page
//     }
//   } else {
//     // Set the touched state to display errors on the current page
//     formikBag.setTouched(errors);
//   }
// };

//   render() {
//     const { children } = this.props;
//     const { page } = this.state;
//     const activePage = React.Children.toArray(children)[page];
//     const isLastPage = page === React.Children.count(children) - 1;
  
//     return (
//       <FormikContext.Consumer>
//         {formikProps => (
//           <form>
//             {activePage}
//             <div className="buttons">
//               {page > 0 && (
//                 <button
//                   type="button"
//                   onClick={this.previous}
//                 >
//                   « Previous
//                 </button>
//               )}
//               {!isLastPage && (
//                 <button
//                   type="button" // Change to type="button"
//                   onClick={() => this.handleSubmit(formikProps.values, formikProps)}
//                 >
//                   Next »
//                 </button>
//               )}
//               {isLastPage && (
//                 <button
//                   type="button" // Change to type="button"
//                   onClick={() => this.handleSubmit(formikProps.values, formikProps)}
//                   disabled={formikProps.isSubmitting}
//                 >
//                   Submit
//                 </button>
//               )}
//             </div>
//           </form>
//         )}
//       </FormikContext.Consumer>
//     );
//   }
// }