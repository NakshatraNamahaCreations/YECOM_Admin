import React, { useEffect, useState } from "react";
import "../style/users.css";
import DataTable from "react-data-table-component";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

function TryToBooking() {
  const [alltrytobookdata, setalltrytobookdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔹 State to track search input

  useEffect(() => {
    getalltrytobookdata();
  }, []);

  // ✅ Fetch all data
  const getalltrytobookdata = async () => {
    try {
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/getalltrytobook"
      );
      setalltrytobookdata(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  // 🔹 Filter data based on search term
  const filteredData = alltrytobookdata.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobilenumber.includes(searchTerm) ||
      item.planname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.price.toString().includes(searchTerm)
  );

  // ✅ Define Table Columns
  const columns = [
    {
      name: "User",
      selector: (row) => row.name,
    },
    {
      name: "Mobile Number",
      selector: (row) => <div>{row.mobilenumber}</div>,
    },
    {
      name: "Date",
      selector: (row) => moment(row.date).format("lll"),
    },
    {
      name: "Plan Name",
      selector: (row) => <div>{row.planname}</div>,
    },
    {
      name: "Price",
      selector: (row) => "₹" + row.price,
    },
  ];

  return (
    <div className="mt-3">
      {/* 🔹 Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by Name, Mobile, Plan, Price..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "300px",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* ✅ Table with Filtered Data */}
      <div className="TableHeaderContainer-0-1-672">
        <DataTable
          columns={columns}
          data={filteredData} // Use filtered data
          pagination
          highlightOnHover
          // defaultSortFieldId={1}
        />
      </div>
    </div>
  );
}

export default TryToBooking;
