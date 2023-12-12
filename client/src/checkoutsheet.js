import React, { useState, useEffect } from "react";
import "./bookdetails.css"
export default function Checkoutsheet() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await fetch("http://localhost:3000/checkoutsheet");
      const data = await response.json();
      setDetails(data);
    }  catch (error) {
        console.error('Fetching errors:', error);
      }
  };

  return (
    <>
    <div className='app'>
    <div className="insidebody">
      <h1 className="h1">Checkoutsheet</h1>
      <table>
        <thead>
          <tr>
            <th>BookID</th>
            <th>Name</th>
            <th>Email</th>
            <th>PhoneNumber</th>
            <th>Pickupdate</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail, index) => (
            <tr key={index}>
              <td>{detail.bookId}</td>
              <td>{detail.userName}</td>
              <td>{detail.userEmail}</td>
              <td>{detail.userPhoneNumber}</td>
              <td>{detail.pickupDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </>
  );
}
