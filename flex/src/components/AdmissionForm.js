// // src/components/AdmissionForm.js

// import React, { useState } from 'react';

// const AdmissionForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     batch: '',
//     cid: '', // Add 'cid' to the initial state
//     isNewUser: 'yes', // Default to assuming the user is new
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//         console.log(formData.isNewUser);
//       const apiData = formData.isNewUser === 'no'
//         ? { name: formData.name, age: formData.age, batch: formData.batch, cid: formData.cid }
//         : { name: formData.name, age: formData.age, batch: formData.batch };
  
//       const response = await fetch('http://localhost:8000/api/enroll/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(apiData),
//       });
  
//       if (response.ok) {
//         console.log('Enrollment successful');
//         // Proceed with any additional client-side logic if needed
//       } else if (response.status === 400) {
//         console.log('Validation error. Please check the form data.');
//         // Handle validation errors or display error messages to the user
//       } else {
//         console.error('Error:', response.statusText);
//         // Handle other error scenarios
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//       // Handle error, show a message to the user, etc.
//     }
//   };
  
  

//   return (
//     <div>
//       <h2>Yoga Class Admission Form</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
//         </label>
//         <br />
//         <label>
//           Age:
//           <input type="number" name="age" value={formData.age} onChange={handleInputChange} required />
//         </label>
//         <br />
//         <label>
//           Are you a new user?
//           <div>
//             <label>
//               <input type="radio" name="isNewUser" value="yes" checked={formData.isNewUser === 'yes'} onChange={handleInputChange} />
//               Yes
//             </label>
//             <label>
//               <input type="radio" name="isNewUser" value="no" checked={formData.isNewUser === 'no'} onChange={handleInputChange} />
//               No
//             </label>
//           </div>
//         </label>
//         <br />
//         {formData.isNewUser === 'no'&& ( // Check if the user is existing
//           <label>
//             CID (Existing User):
//             <input type="text" name="cid" value={formData.cid} onChange={handleInputChange} required />
//           </label>
//         )}
//         <br />
//         <label>
//           Preferred Batch:
//           <select name="batch" value={formData.batch} onChange={handleInputChange} required>
//             <option value="">Select Batch</option>
//             <option value="6-7AM">6-7AM</option>
//             <option value="7-8AM">7-8AM</option>
//             <option value="8-9AM">8-9AM</option>
//             <option value="5-6PM">5-6PM</option>
//           </select>
//         </label>
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AdmissionForm;
// src/components/AdmissionForm.js

 // src/components/AdmissionForm.js

import React, { useState } from 'react';
import './AdmissionForm.css'; // Import the CSS file for styling

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    batch: '',
    cid: '',
    isNewUser: 'yes',
    
    cardNumber: '', // New payment-related field
    expirationDate: '', // New payment-related field
    cvv: '', // New payment-related field
    amount: '',
  });

  const [errors, setErrors] = useState({}); // Added state for validation errors
  const [successMessage, setSuccessMessage] = useState(''); // Added state for success message

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiData = formData.isNewUser === 'no'
        ? { name: formData.name, age: formData.age, batch: formData.batch, cid: formData.cid }
        : { name: formData.name, age: formData.age, batch: formData.batch };
        
        const response = await fetch('http://127.0.0.1:8000/enroll/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Payment successful and you are enrolled successfully!'); // Set success message
        setFormData({
            name: '',
            age: '',
            batch: '',
            cid: '',
            isNewUser: 'yes',
            cardNumber: '',
          expirationDate: '',
          cvv: '',
          amount: '',
          });
          setErrors({});
        console.log('Enrollment successful');
        // Proceed with any additional client-side logic if needed
      } else if (response.status === 400) {
        if (data.non_field_errors) {
            setErrors({ nonFieldErrors: data.non_field_errors });
          } else {
            setErrors(data);
          }
          console.log(data, 'Validation error. Please check the form data.');
      
        
        // Handle validation errors or display error messages to the user
      } else {
        setErrors({ generalError: 'An unexpected error occurred. Please try again.' });
        
        console.error('Error:', response.statusText);
        // Handle other error scenarios
      }
    }
      // Rest of the code for API request and handling response...
    catch (error) {
        setErrors({ generalError: 'An unexpected error occurred. Please try again.' });
     
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="admission-form">
      <h2>Yoga Class Admission Form</h2>
       
      {successMessage && <p className="success-message">{successMessage}</p>}
     
      <form onSubmit={handleSubmit}>
      {Object.keys(errors).length > 0 && (
          <div className="error-message">
            {Object.values(errors).flat().join(', ')}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          {errors && errors.age && <span className="error">{errors.age}</span>}
       
        </div>

        {/* Add similar form groups for age, isNewUser, cid, batch */}
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="isNewUser">Are you a new user?</label>
          <div>
            <label>
              <input type="radio" id="yes" name="isNewUser" value="yes" checked={formData.isNewUser === 'yes'} onChange={handleInputChange} />
              Yes
            </label>
            <label>
              <input type="radio" id="no" name="isNewUser" value="no" checked={formData.isNewUser === 'no'} onChange={handleInputChange} />
              No
            </label>
          </div>
        </div>

        {formData.isNewUser === 'no' && (
          <div className="form-group">
            <label htmlFor="cid">CID (Existing User):</label>
            <input type="text" id="cid" name="cid" value={formData.cid} onChange={handleInputChange} required />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="batch">Preferred Batch:</label>
          <select id="batch" name="batch" value={formData.batch} onChange={handleInputChange} required>
            <option value="">Select Batch</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </div>

        <label>
          Card Number:
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Expiration Date:
          <input
            type="text"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          CVV:
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Amount:
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </label>
        
        <div className="form-group">
          <button type="submit">Complete payment</button>
        </div>
      </form>
    </div>
  );
};

export default AdmissionForm;
