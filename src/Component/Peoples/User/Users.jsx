import React, { useEffect, useState } from "react";
import "../style/users.css";
import DataTable from "react-data-table-component";
import { Button, Modal, Offcanvas } from "react-bootstrap";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { getData } from "../../../Api-Service/apiHelper";
import { apiUrl } from "../../../Api-Service/apiConstants";
import moment from "moment";
import axios from "axios";

function Users() {
  const [openCanvas, setOpenCanvas] = useState({});
  const [showUsers, setShowUser] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [searchLimit, setsearchLimit] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchvalue, setsearchvalue] = useState("");
  const [paymentdata, setPaymentData] = useState([]);
  const [allplans, setAllPlans] = useState([]);

  const handleClose = () => {
    setShow(false);
    setsearchLimit("");
    setSelectedUserId(null); // Clear selected user
  };
  const handleShow = (userId) => {
    setSelectedUserId(userId);
    setShow(true);
  };
  const handleOpeningCanvas = (row) => {
    setOpenCanvas(row);
    setShowUser(true);
  };

  const updateSearchCount = async () => {
    if (!searchLimit) {
      alert("Please enter a valid search count.");
      return;
    }

    try {
      const data = { searchLimit: Number(searchLimit) }; // Ensure it's a number

      const response = await axios.put(
        `https://api.proleverageadmin.in/api/users/updateUsersearchcount/${selectedUserId}`,
        data
      );

      if (response.status === 200) {
        alert("Search count updated successfully.");
        fetchData(); // Refresh the data
        handleClose(); // Close the modal
      } else {
        alert("Failed to update search count. Please try again.");
      }
    } catch (error) {
      console.error("Error updating search count:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleClosingCanvas = () => setShowUser(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const userRes = await getData(apiUrl.GET_ALL_USER);
      setAllUsers(userRes.data);
      console.log("userRes.data", userRes.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filterusers = () => {
    return allUsers.filter((data) => {
      return (
        (data.username &&
          data.username.toLowerCase().includes(searchvalue.toLowerCase())) ||
        (data.phoneNumber &&
          data.phoneNumber.toString().includes(searchvalue)) ||
        (data.email &&
          data.email.toLowerCase().includes(searchvalue.toLowerCase()))
      );
    });
  };

  const navigate = useNavigate();

  const handleUserDetails = (row) => {
    navigate("/people/usersdetails", { state: { user: row } });
  };

  const handledelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://api.proleverageadmin.in/api/users/deleteuser/${id}`
      );

      if (response.status === 200) {
        alert("delete successfully.");
        fetchData(); // Refresh the data
      } else {
        alert("Failed to update search count. Please try again.");
      }
    } catch (error) {
      console.error("Error updating search count:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const user = JSON.parse(localStorage.getItem("ecomAdmin"));
  console.log("user in navbar", user);

  const canDelete = () => {
    const user = JSON.parse(localStorage.getItem("ecomAdmin")) || {}; // Get user from localStorage

    const requiredKeys = [
      "Courses",
      "userapp",
      "tryToBook",
      "People",
      "Payments",
      "Chat",
      "Pricing",
      "Marketing",
      "Paymentkey",
      "Coupon",
    ];

    console.log("User Data:", user);

    // Debugging: Log each key's value
    requiredKeys.forEach((key) => {
      console.log(`${key}:`, user[key]); // Log each key-value pair
    });

    // Ensure all properties exist in user and are true
    const allTrue = requiredKeys.every((key) => user[key] === true);

    console.log("Final canDelete result:", allTrue);
    return allTrue;
  };

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.username,

      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: "Date of Joining",
      selector: (row) => moment(row.createdAt).format("DD-MMM-YY"),
      sortable: true,
    },

    {
      name: " Action",
      selector: (row) => (
        <div className="d-flex">
          <i
            onClick={() => handleShow(row._id)}
            className="fa-solid fa-pen-to-square"
            style={{ color: "black", cursor: "pointer", fontSize: "17px" }}
          ></i>
          <i
            onClick={() => handleUserDetails(row)}
            className="fa-solid fa-eye mx-2"
            style={{ color: "black", cursor: "pointer", fontSize: "17px" }}
          ></i>
          {canDelete(row) && (
            <i
              onClick={() => handledelete(row._id)}
              className="fa-solid fa-trash"
              style={{ color: "black", cursor: "pointer", fontSize: "17px" }}
            ></i>
          )}
          {/* <i
            onClick={() => handledelete(row._id)}
            className="fa-solid fa-trash"
            style={{ color: "black", cursor: "pointer", fontSize: "17px" }}
          ></i> */}
        </div>
      ),
      sortable: true,
    },
  ];

  const styles = {
    inputStyle: {
      width: "20em",
      border: "1px solid rgb(216, 224, 240)",
      borderRadius: "16px",
      fontSize: "16px",
      backgroundColor: "white",
      outline: "none",
      backgroundPosition: "10px 10px",
      backgroundRepeat: "no-repeat",
      padding: "12px 18px 11px 44px",
      lineHeight: "24px",
    },
    createCourseBtn: {
      padding: "12px 20px",
      borderRadius: "16px",
      fontWeight: "600",
      fontSize: "18px",
      lineHeight: "24px",
      cursor: "pointer",
      border: "none",
      color: "00007c",
      backgroundColor: "#9797ff61",
    },
    userProfilePic: {
      width: "44px",
      height: "44px",
      borderRadius: "12px",
      marginRight: "12px",
    },
  };

  useEffect(() => {
    getAllPayment();
    getAllPlans();
  }, []);

  const getAllPayment = async () => {
    try {
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/payment/alluser"
      );
      if (response.status === 200) {
        setPaymentData(response.data.allUsers);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const getAllPlans = async () => {
    try {
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/plans/getallplan"
      );
      if (response.status === 200) {
        setAllPlans(response.data.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  console.log("allplans", allplans);
  console.log("paymentdata", paymentdata);

  console.log("openCanvas", openCanvas);
  console.log("allUsers", allUsers);

  const generatePaymentReport = () => {
    const mergedData = allUsers.map((user) => {
      // Find matching payments for the user
      const userPayments = paymentdata.filter(
        (payment) => payment.userId === user._id
      );

      // If no payment, return user details with "No Payment" status
      if (userPayments.length === 0) {
        return {
          username: user.username || "N/A",
          email: user.email || "N/A",
          phoneNumber: user.phoneNumber || "N/A",
          orderId: "No Payment",
          amount: "N/A",
          currency: "N/A",
          paymentStatus: "No Payment",
          planName: "No Plan",
          planPrice: "N/A",
          searchCount: "N/A",
          validPeriod: "N/A",
          createdAt: moment(user.createdAt).format("DD-MMM-YYYY"),
        };
      }

      // If user has multiple payments, return each payment as a separate entry
      return userPayments.map((payment) => {
        // Find the corresponding plan for the payment
        const plan = allplans.find((p) => p._id === payment.planId);

        return {
          username: user.username || "N/A",
          email: user.email || "N/A",
          phoneNumber: user.phoneNumber || "N/A",
          orderId: payment.orderId || "N/A",
          amount: payment.amount || "N/A",
          currency: payment.currency || "N/A",
          paymentStatus: payment.paymentStatus ? "Success" : "Failure",
          planName: plan ? plan.planName : "No Plan",
          planPrice: plan ? plan.price : "N/A",
          searchCount: plan ? plan.searchCount : "N/A",
          validPeriod: plan ? `${plan.noOfPeriod} ${plan.validPeriod}` : "N/A",
          createdAt: moment(payment.createdAt).format("DD-MMM-YYYY"),
        };
      });
    });

    // Flatten the array (handle users with multiple payments)
    const flattenedData = mergedData.flat();

    if (flattenedData.length === 0) {
      alert("No data available.");
      return;
    }

    // Convert data to CSV format
    const headers = [
      "User Name",
      "Email",
      "Phone Number",
      "Order ID",
      "Amount",
      "Currency",
      "Payment Status",
      "Plan Name",
      "Plan Price",
      "Search Count",
      "Validity",
      "Date of Payment",
    ];
    const rows = flattenedData.map((item) => Object.values(item));

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Trigger file download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "User_Payment_Report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between mt-3">
        <div>
          <i
            className="fa-solid fa-magnifying-glass"
            style={{
              position: "absolute",
              margin: "16px",
              color: "#7d8592",
            }}
          ></i>
          <input
            type="text"
            name="search"
            placeholder="Search.."
            value={searchvalue}
            onChange={(e) => setsearchvalue(e.target.value)}
            style={styles.inputStyle}
          />
        </div>
      </div>

      <div className="d-flex mb-3" style={{ justifyContent: "end" }}>
        <button
          className="btn btn-success"
          // onClick={() => downloadCSV(allUsers)}
          onClick={generatePaymentReport}
        >
          Download
        </button>
      </div>

      {/* Table */}
      <div className="TableHeaderContainer-0-1-672" style={{ width: "100%" }}>
        <DataTable
          columns={columns}
          data={filterusers()}
          // defaultSortFieldId={1}
        />
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Search Count</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">Search Cout</div>
          <input
            type="tel"
            className="mt-1"
            value={searchLimit}
            onChange={(e) => setsearchLimit(e.target.value)}
            style={{
              border: "1px solid lightgrey",
              paddingLeft: "15px",
              borderRadius: "5px",
              height: "35px",
              outline: "none",
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={updateSearchCount}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Users;
