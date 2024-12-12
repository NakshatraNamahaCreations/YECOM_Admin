import React, { useEffect, useState } from "react";
import "../style/users.css";
import DataTable from "react-data-table-component";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getData } from "../../../Api-Service/apiHelper";
import { apiUrl } from "../../../Api-Service/apiConstants";
import moment from "moment";
import { CiFilter } from "react-icons/ci";
import * as XLSX from "xlsx";

function Payments() {
  const [openCanvas, setOpenCanvas] = useState({});
  const [showUsers, setShowUser] = useState(false);
  const [showFilteraOption, setShowFilteraOption] = useState(false);
  const [allPayments, setAllPayments] = useState([]);
  // const [allUsers, setAllUsers] = useState([]);
  const [paymentDate, setPaymentDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [filterResults, setFilterResults] = useState([]);

  const handleClosingCanvas = () => setShowUser(false);

  const fetchData = async () => {
    try {
      const paymentRes = await getData(apiUrl.USER_PAYMENTS);
      setAllPayments(paymentRes.allUsers);
      setFilterResults(paymentRes.allUsers);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log("handlingPaymentData", handlingPaymentData);

  const handleShowFilter = () => {
    setShowFilteraOption(!showFilteraOption);
  };

  const handleFilters = () => {
    const filteredData = allPayments.filter((item) => {
      const isPaymentDateMatch =
        paymentDate &&
        moment(item.paymentdate).format("YYYY-MM-DD") ===
          moment(paymentDate).format("YYYY-MM-DD");

      const isExpiryDateMatch =
        expiryDate &&
        moment(item.expiryDate).format("YYYY-MM-DD") ===
          moment(expiryDate).format("YYYY-MM-DD");

      const isPaymentStatusMatch =
        paymentStatus === "all" || item.paymentStatus === paymentStatus;

      return isPaymentDateMatch || isExpiryDateMatch || isPaymentStatusMatch;
    });
    // console.log("Filtered Results:", filteredData);
    setFilterResults(filteredData);
  };

  // console.log("filterResults", filterResults);

  const downloadDataset = () => {
    const dataToDownload = filterResults.map((item) => ({
      User: item.userName,
      Transaction_ID: item.paymentId,
      Payment_Date: moment(item.paymentdate).format("lll"),
      Expiry_Date: moment(item.expiryDate).format("lll"),
      Paid_Amount: item.amount,
      Payment_Status: item.paymentStatus === true ? "Success" : "Pending",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToDownload);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payment History");
    XLSX.writeFile(workbook, "payment-history.xlsx");
  };

  const columns = [
    {
      name: "User",
      selector: (row) => row.userName,
    },
    // {
    //   name: "Payment ID",
    //   selector: (row) => (
    //     <div style={{ fontSize: "11px" }}>{row.paymentId}</div>
    //   ),
    // },
    {
      name: "Transaction ID",
      selector: (row) => <div>{row.paymentId}</div>,
    },
    {
      name: "Payment Date",
      selector: (row) => moment(row.paymentdate).format("lll"),
    },
    {
      name: "Expiry Date",
      selector: (row) => moment(row.expiryDate).format("lll"),
    },
    {
      name: "Paid Amount",
      selector: (row) => "₹" + row.amount,
    },
    {
      name: "Payment Status",
      selector: (row) => (
        <div
          style={{ color: row.paymentStatus === true ? "#198754" : "#ffc107" }}
        >
          {row.paymentStatus === true ? "Success" : "Pending"}
        </div>
      ),
    },
  ];

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between mt-3">
        <div>
          {/* <input
            type="text"
            name="search"
            placeholder="Search.."
            style={styles.inputStyle}
          /> */}
        </div>
        <div className="">
          <button style={styles.createCourseBtn} onClick={downloadDataset}>
            Download
          </button>
          <button
            className="ms-2"
            style={styles.createCourseBtn}
            onClick={handleShowFilter}
          >
            Filter
          </button>
        </div>
      </div>
      {showFilteraOption && (
        <div
          className="mt-2 row p-2"
          style={{ backgroundColor: "white", margin: 0 }}
        >
          <div className="col-md-3">
            <div className="ms-1">Payment Date</div>&nbsp;
            <input
              className="mt-2"
              type="date"
              style={{
                border: "1px solid rgb(216, 224, 240)",
                borderRadius: "5px",
                padding: "3px 6px",
              }}
              value={paymentDate}
              // onChange={handleFilterChange}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <div className="ms-1"> Expiry Date</div>&nbsp;
            <input
              className="mt-2"
              type="date"
              style={{
                border: "1px solid rgb(216, 224, 240)",
                borderRadius: "5px",
                padding: "3px 6px",
              }}
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              // onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <div className="ms-1">Payment Status</div>&nbsp;
            <select
              className="mt-2"
              style={{
                border: "1px solid rgb(216, 224, 240)",
                borderRadius: "5px",
                padding: "3px 6px",
              }}
              value={paymentStatus}
              onChange={(e) =>
                setPaymentStatus(
                  e.target.value === "true"
                    ? true
                    : e.target.value === "false"
                    ? false
                    : "all"
                )
              }
            >
              <option value="all">All</option>
              <option value={false}>Pending</option>
              <option value={true}>Success</option>
            </select>
          </div>
          <div className="col-md-3">
            <div className="ms-1"> </div>&nbsp;
            <div
              className="mt-2"
              onClick={handleFilters}
              style={{
                backgroundColor: "aqua",
                width: "fit-content",
                padding: "3px 6px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Submit
            </div>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="TableHeaderContainer-0-1-672">
        <DataTable
          columns={columns}
          data={filterResults}
          defaultSortFieldId={1}
        />
      </div>
      {/* open canvas */}
      <Offcanvas show={showUsers} onHide={handleClosingCanvas} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{openCanvas.name} </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div
            class="bodyContainer-0-1-581 undefined"
            id="bodyContainerSideDrawer"
          >
            <div class="container-0-1-1442">
              <div class="subHeader-0-1-1443">Basic Information</div>
              <div class="basicInfoContainer-0-1-1444">
                <div class="infoRow-0-1-1445">
                  <img
                    src="https://ali-cdn-cp-assets-public.classplus.co/CampaignManager/e9296b40d1307ae14b192d251cf4d635"
                    width="16px"
                    height="16px"
                    alt=""
                  />
                  <div class="label-0-1-1446">Name : </div>
                  <div class="info-0-1-1447">{openCanvas.name} </div>
                </div>
                <div class="infoRow-0-1-1445">
                  <img
                    src="https://ali-cdn-cp-assets-public.classplus.co/CampaignManager/0df743398951317bb08ae0dfb8b85c98"
                    width="16px"
                    height="16px"
                    alt=""
                  />
                  <div class="label-0-1-1446">Mobile Number : </div>
                  <div class="info-0-1-1447">{openCanvas.phoneNumber}</div>
                </div>
                <div class="infoRow-0-1-1445">
                  <img
                    src="https://ali-cdn-cp-assets-public.classplus.co/CampaignManager/f05a83406b93ac4f6a2e5e039d0b565f"
                    width="16px"
                    height="16px"
                    alt=""
                  />
                  <div class="label-0-1-1446">Email : </div>
                  <div class="info-0-1-1447">{openCanvas.email} </div>
                </div>
              </div>
              <div class="subHeader-0-1-1443">Courses</div>
              <div class="courseSnapshotContainer-0-1-1448">
                {openCanvas.courseDetails?.length === 0 ? (
                  <div class="label-0-1-1446">No Courses Purchased Yet</div>
                ) : (
                  <ul>
                    {openCanvas.courseDetails?.map((item, index) => (
                      <li className="label-0-1-801" key={index}>
                        {" "}
                        {item.courseName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* <div class="subHeader-0-1-1443">Login Devices</div>
              <div class="testsContainer-0-1-1457">
                <div class="container-0-1-1461">
                  <div class="left-0-1-1462">
                    <div class="deviceName-0-1-1465">
                      <img src="/diy/assets/mobile-d5f06a76..svg" alt="" />
                    </div>
                    <div class="middle-0-1-1467">
                      <div class="device-0-1-1466">Mobile-Android</div>
                      <div class="loginTime-0-1-1468">
                        Last Login : 3:15 pm, Mar 23
                      </div>
                    </div>
                  </div>
                  <div class="right-0-1-1463">
                    <button class="button-0-1-134 button-d195-0-1-1470 reportButton-0-1-1469 secondary-0-1-136 secondary-d197-0-1-1472  ">
                      Remove
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div class="footerContainer-0-1-639">
            <Link
              userid="118146927"
              class="button-0-1-146 button-d35-0-1-724  primary-0-1-147 primary-d36-0-1-725"
              style={{ textDecoration: "none", color: "white" }}
              to={`/people/users-profile?${openCanvas._id}`}
            >
              View Full Profile
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

const styles = {
  inputStyle: {
    width: "20em",
    border: "1px solid rgb(216, 224, 240)",
    borderRadius: "16px",
    backgroundColor: "white",
    backgroundPosition: "10px 10px",
    backgroundRepeat: "no-repeat",
    padding: "7px 18px",
  },
  createCourseBtn: {
    padding: "3px 14px",
    borderRadius: "8px",
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

export default Payments;
