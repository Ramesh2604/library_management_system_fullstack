import React, { useState, useEffect } from "react";
import "./bookdetails.css";
import { Search } from "react-bootstrap-icons";

export default function Bookdetails() {
  const [details, setDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await fetch("http://localhost:3000/bookdetails");
      const data = await response.json();
      setDetails(data);
      setSearchResults(data); // Set search results initially to all details
    } catch (error) {
      console.error('Fetching errors:', error);
    }
  };

  const handleSearch = () => {
    const filteredResults = details.filter((detail) =>
      detail.bookname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <>
      <div className='app'>
        <div className="insidebody">
          <h1 className="h1">Book Details</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by book name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}><Search color='black' size={15} /></button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Author</th>
                <th>Book ID</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.bookname}</td>
                  <td>{detail.authorname}</td>
                  <td>{detail.bookid}</td>
                  <td>{detail.available ? 'Available' : 'Unavailable'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
