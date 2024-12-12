import React, { useEffect, useState } from "react";
import { getData } from "../Api-Service/apiHelper";
import { apiUrl } from "../Api-Service/apiConstants";

function Dashboard() {
  const [allPayments, setAllPayments] = useState([]);

  const fetchData = async () => {
    try {
      const paymentRes = await getData(apiUrl.USER_PAYMENTS);
      const paymentData = paymentRes.allUsers?.filter(
        (item) => item.paymentStatus === true
      );
      setAllPayments(paymentData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalRevenue = allPayments?.reduce(
    (acc, value) => acc + value.amount,
    1
  );
  console.log("totalRevenue", totalRevenue);

  return (
    <div className="mt-3">
      <div class="row">
        <div class="col-lg-4">
          <div class="card card-border-1 border-left-3 border-left-accent text-center mb-lg-0">
            <div class="card-body">
              <h4 class="h2 mb-0">₹{totalRevenue?.toFixed(2)}</h4>
              <div>Revenue</div>
            </div>
          </div>
        </div>
        {/* <div class="col-lg-4">
          <div class="card card-border-1 text-center mb-lg-0">
            <div class="card-body">
              <h4 class="h2 mb-0">$3,917.80</h4>
              <div>Account Balance</div>
            </div>
          </div>
        </div> */}
        <div class="col-lg-4">
          <div class="card card-border-1 text-center mb-lg-0">
            <div class="card-body">
              <h4 class="h2 mb-0">0</h4>
              <div>Total User</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
