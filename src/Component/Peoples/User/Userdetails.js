import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import moment from "moment";

function Userdetails() {
  const [paymentdata, setPaymentData] = useState([]);
  const [allplans, setAllPlans] = useState([]);
  const location = useLocation();
  const userlist = location.state?.user;

  useEffect(() => {
    getAllPayment();
    getAllPlans();
  }, []);

  const getAllPayment = async () => {
    try {
      const response = await axios.get(
        `https://api.proleverageadmin.in/api/payment/find-user/${userlist?._id}`
      );
      if (response.status === 200) {
        setPaymentData(response.data.data);
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

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>User Payment Details</h2>
      {paymentdata?.map((data) => {
        const matchingPlan = allplans.find((plan) => plan?._id === data.planId);

        return (
          <div key={data._id} style={styles.paymentContainer}>
            {/* Payment Details Card */}
            <div style={{ ...styles.card, borderLeft: "5px solid #28a745" }}>
              <h4 style={styles.textPrimary}>Payment Details</h4>
              <p>
                <strong>Amount:</strong>{" "}
                <span style={styles.textSuccess}>
                  ₹{(data.amount / 100).toFixed(2)}
                </span>
              </p>
              <p>
                <strong>Expiry Date:</strong>{" "}
                {moment(data.expiryDate).format("DD-MMM-YYYY")}
              </p>
              <p>
                <strong>Order Id:</strong> {data.orderId}
              </p>
              <p>
                <strong>Payment Status:</strong>
                <span
                  style={
                    data.paymentStatus
                      ? styles.statusSuccess
                      : styles.statusFailed
                  }
                >
                  {data.paymentStatus ? "Success" : "Failed"}
                </span>
              </p>
            </div>

            {/* Plan Details Card */}
            {matchingPlan ? (
              <div style={{ ...styles.card, borderLeft: "5px solid #007bff" }}>
                <h4 style={styles.textPrimary}>Plan Details</h4>
                <p>
                  <strong>Plan Name:</strong> {matchingPlan.planName}
                </p>
                <p>
                  <strong>Valid Period:</strong> {matchingPlan.noOfPeriod}{" "}
                  {matchingPlan.validPeriod}
                </p>
                <p>
                  <strong>Price:</strong> ₹{matchingPlan.price}
                </p>
                <p>
                  <strong>Search Limit:</strong> {matchingPlan.searchCount}
                </p>
              </div>
            ) : (
              <div
                style={{
                  ...styles.card,
                  color: "red",
                  borderLeft: "5px solid red",
                }}
              >
                <h4>Plan details not found</h4>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Userdetails;

// Inline styles
const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  paymentContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "20px",
  },
  card: {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    background: "#fff",
    width: "48%",
  },
  textPrimary: {
    fontWeight: "bold",
    color: "#333",
  },
  textSuccess: {
    color: "#28a745",
    fontWeight: "bold",
  },
  statusSuccess: {
    color: "green",
    fontWeight: "bold",
  },
  statusFailed: {
    color: "red",
    fontWeight: "bold",
  },
  planImgContainer: {
    textAlign: "center",
    marginTop: "10px",
  },
  planImg: {
    width: "120px",
    borderRadius: "8px",
  },
};
