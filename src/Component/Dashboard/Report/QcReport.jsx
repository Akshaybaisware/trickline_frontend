import React, { useState, useEffect } from "react";
import "./QcReport.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

function QcReport() {
  const location = useLocation();
  console.log(location, "location");
  const state = location.state;
  console.log(state, "statedata");
  const [data, setData] = useState([]);
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  useEffect(() => {
    const getrandomassignment = async () => {
      try {
        const apidata = await axios.get(
          `${apiUrl}/assignment/getrandomassignment`
        );
        console.log(apidata, "123456");
        setData(apidata.data.assignments);
      } catch (error) {
        console.log(error);
      }
    };
    getrandomassignment();
  }, []);

  const [randomFields, setRandomFields] = useState([]);

  useEffect(() => {
    // Randomly select one field (either 'licencenumber' or 'ip') for each object to be highlighted
    const fields = ["licencenumber", "ip"]; // Fields to choose from
    const randomFieldsArray = data.map(() => {
      const randomIndex = Math.floor(Math.random() * fields.length); // Random field index
      return fields[randomIndex]; // Set the selected field for red border
    });
    setRandomFields(randomFieldsArray); // Set the selected fields for red border
  }, [data]);

  const hasError = (fieldKey, objectIndex) => {
    // Highlight the field if it matches the random field for the current object
    return fieldKey === randomFields[objectIndex] ? "error" : "";
  };

  return (
    <>
      <div>Name : {state.name}</div>
      <div>Mobile : {state.mobile}</div>
      <div>Address : {state.address}</div>
      <div>Correct form: {state?.correctform}</div>
      <div>Incorrect form : {state?.incorrectform}</div>
      <div>
        {data.map((item, index) => (
          <div key={index} className="form-container">
            <div className={`form-group ${hasError("firstname", index)}`}>
              <label>First Name:</label>
              <input type="text" value={item.firstname} readOnly />
            </div>

            <div className={`form-group ${hasError("lastname", index)}`}>
              <label>Last Name:</label>
              <input type="text" value={item.lastname} readOnly />
            </div>

            <div className={`form-group ${hasError("email", index)}`}>
              <label>Email:</label>
              <input type="text" value={item.email} readOnly />
            </div>

            <div className={`form-group ${hasError("phonenumber", index)}`}>
              <label>Phone Number:</label>
              <input type="text" value={item.phonenumber} readOnly />
            </div>

            <div className={`form-group ${hasError("licencenumber", index)}`}>
              <label>License Number:</label>
              <input type="text" value={item.licencenumber} readOnly />
            </div>

            <div className={`form-group ${hasError("ip", index)}`}>
              <label>IP:</label>
              <input type="text" value={item.ip} readOnly />
            </div>

            <div className={`form-group ${hasError("zipcode", index)}`}>
              <label>Zip Code:</label>
              <input type="text" value={item.zipcode} readOnly />
            </div>

            <div className={`form-group ${hasError("userId", index)}`}>
              <label>User ID:</label>
              <input type="text" value={item.userId} readOnly />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default QcReport;
