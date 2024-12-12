import React, { useEffect, useState } from "react";
import { Button, Modal, Offcanvas } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { manageBannerStyle as styles } from "../../Styles/JSXStyles";
import { apiUrl } from "../../Api-Service/apiConstants";
import { deleteData, getData, postData } from "../../Api-Service/apiHelper";
import axios from "axios";
function Pricing() {
  const [allPlanList, setAllPlanList] = useState([]);
  const [show, setShow] = useState(false);
  const [planName, setPlanName] = useState("");
  const [priceDescription, setPriceDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [searchCount, setSearchCount] = useState("");
  const [validPeriod, setValidPeriod] = useState("");
  const [noOfPeriod, setNoOfPeriod] = useState("");

  const handleOpenModal = () => {
    setShow(true);
  };

  const fetchData = async () => {
    try {
      const planRes = await axios.get(`${apiUrl.BASEURL}${apiUrl.GET_PLAN}`);
      if (planRes.status === 200) {
        console.log("planRes", planRes);
        setAllPlanList(planRes.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const AddPlan = async () => {
    try {
      // Validate required fields
      if (
        !planName ||
        !price ||
        !validPeriod ||
        !noOfPeriod ||
        !searchCount ||
        !imageUrl
      ) {
        alert("Please fill in all required fields.");
        return;
      }
      const data = {
        planName: planName,
        price: price,
        priceDescription: priceDescription,
        validPeriod: validPeriod,
        noOfPeriod: noOfPeriod,
        searchCount: searchCount,
        imagelink: imageUrl,
      };
      const response = await postData(apiUrl.ADD_PLAN, data);

      if (response) {
        alert("Plan Added Successfully");
        window.location.reload();
      } else {
        alert(`Failed to add plan: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error while adding plan:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleDeletObj = async (id) => {
    try {
      const response = await axios.post(
        `${apiUrl.BASEURL}${apiUrl.DELETE_PLAN}${id}`
      );
      if (response.status === 200) {
        alert("Plan Deleted Successfully");
        window.location.reload();
      } else {
        alert(`Failed to delete plan: Unknown error`);
      }
    } catch (error) {
      console.error("Error while deleting plan:", error);
    }
  };

  const columns = [
    {
      name: "Plan Name",
      selector: (row) => row.planName,
    },
    {
      name: "Description",
      selector: (row) => row.priceDescription,
    },
    {
      name: "Image",
      selector: (row) => (
        <img src={row.imagelink} alt="" class="iconImage-0-1-649" />
      ),
    },
    {
      name: "Amount",
      selector: (row) => row.price,
    },
    {
      name: "Period",
      selector: (row) => row.noOfPeriod + " " + row.validPeriod,
    },
    {
      name: "Search Count",
      selector: (row) => row.searchCount,
    },
    {
      name: "Action",
      selector: (row) => (
        <div style={{ margin: "5px" }}>
          <div
            style={{ cursor: "Pointer" }}
            onClick={() => handleDeletObj(row._id)}
          >
            <img
              src="https://classplusapp.com/diy/assets/trash-2-db8990c1..svg"
              alt=""
              class="iconImage-0-1-649"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        <Button className="px-5 py-2" variant="info" onClick={handleOpenModal}>
          Add
        </Button>
      </div>
      <br />
      <DataTable columns={columns} data={allPlanList} defaultSortFieldId={1} />
      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title> Add Plan</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <div style={{ fontSize: "15px" }}>
              <b>
                Plan Name <span style={{ color: "Red" }}>*</span>{" "}
              </b>
            </div>
            <input
              className="mt-2 mb-2"
              type="text"
              style={{
                border: "1px solid rgb(216, 224, 240)",
                borderRadius: "5px",
                outline: "none",
                padding: "6px",
                fontSize: "15px",
                width: "100%",
              }}
              onChange={(e) => setPlanName(e.target.value)}
            />
          </div>
          <div>
            <div style={{ fontSize: "15px" }}>
              <b>Plan Description</b>
            </div>
            <textarea
              className="mt-2 mb-2"
              type="text"
              style={{
                border: "1px solid rgb(216, 224, 240)",
                borderRadius: "5px",
                outline: "none",
                width: "100%",
                padding: "6px",
                fontSize: "15px",
              }}
              onChange={(e) => setPriceDescription(e.target.value)}
            />
          </div>
          <div>
            <div style={{ fontSize: "15px" }}>
              <b>
                Image URL <span style={{ color: "Red" }}>*</span>{" "}
              </b>
            </div>
            <input
              className="mt-2 mb-2"
              type="text"
              style={{
                border: "1px solid rgb(216, 224, 240)",
                borderRadius: "5px",
                outline: "none",
                padding: "6px",
                fontSize: "15px",
                width: "100%",
              }}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="row me-0" style={{ flexDirection: "row" }}>
            <div className="col-md-6">
              <div style={{ fontSize: "15px" }}>
                <b>
                  Price <span style={{ color: "Red" }}>*</span>{" "}
                </b>
              </div>
              <input
                className="mt-2 mb-2"
                type="number"
                min={1}
                style={{
                  border: "1px solid rgb(216, 224, 240)",
                  borderRadius: "5px",
                  outline: "none",
                  padding: "6px",
                  fontSize: "15px",
                  width: "100%",
                }}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <div style={{ fontSize: "15px" }}>
                <b>
                  Search Count <span style={{ color: "Red" }}>*</span>{" "}
                </b>
              </div>
              <input
                className="mt-2 mb-2"
                type="number"
                min={1}
                style={{
                  border: "1px solid rgb(216, 224, 240)",
                  borderRadius: "5px",
                  outline: "none",
                  padding: "6px",
                  fontSize: "15px",
                  width: "100%",
                }}
                onChange={(e) => setSearchCount(e.target.value)}
              />
            </div>
          </div>
          <div className="row me-0" style={{ flexDirection: "row" }}>
            <div className="col-md-6">
              <div style={{ fontSize: "15px" }}>
                <b>
                  Period <span style={{ color: "Red" }}>*</span>{" "}
                </b>
              </div>
              <select
                className="mt-2 mb-2"
                style={{
                  border: "1px solid rgb(216, 224, 240)",
                  borderRadius: "5px",
                  outline: "none",
                  padding: "6px",
                  fontSize: "15px",
                  width: "100%",
                }}
                onChange={(e) => setValidPeriod(e.target.value)}
              >
                <option value="">---Select---</option>
                <option value="Month">Monthly</option>
                <option value="Year">Yearly</option>
              </select>
            </div>
            {validPeriod !== "" && (
              <div className="col-md-6">
                <div style={{ fontSize: "15px" }}>
                  <b>
                    Number of {validPeriod}'s{" "}
                    <span style={{ color: "Red" }}>*</span>{" "}
                  </b>
                </div>
                <input
                  className="mt-2 mb-2"
                  type="number"
                  min={1}
                  style={{
                    border: "1px solid rgb(216, 224, 240)",
                    borderRadius: "5px",
                    outline: "none",
                    padding: "6px",
                    fontSize: "15px",
                    width: "100%",
                  }}
                  onChange={(e) => setNoOfPeriod(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="row me-0 mt-2" style={{ flexDirection: "row" }}>
            <div className="col-md-6">
              <Button className="px-2 py-1" variant="info" onClick={AddPlan}>
                Add Plan
              </Button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Pricing;
