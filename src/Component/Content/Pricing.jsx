import React, { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { apiUrl } from "../../Api-Service/apiConstants";

function Pricing() {
  const [allPlanList, setAllPlanList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // States for Plan Details
  const [planName, setPlanName] = useState("");
  const [priceDescription, setPriceDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [searchCount, setSearchCount] = useState("");
  const [validPeriod, setValidPeriod] = useState("");
  const [noOfPeriod, setNoOfPeriod] = useState("");
  const [searchvalue, setsearchvalue] = useState("");

  // Fetch all plans
  const fetchData = async () => {
    try {
      const planRes = await axios.get(`${apiUrl.BASEURL}${apiUrl.GET_PLAN}`);
      if (planRes.status === 200) {
        setAllPlanList(planRes.data.data);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  console.log("allPlanList", allPlanList);

  useEffect(() => {
    fetchData();
  }, []);

  const filterPlans = () => {
    return allPlanList.filter((plan) => {
      return (
        plan.planName.toLowerCase().includes(searchvalue.toLowerCase()) ||
        plan.price.toString().includes(searchvalue) ||
        plan.priceDescription
          .toLowerCase()
          .includes(searchvalue.toLowerCase()) ||
        plan.noOfPeriod.toString().includes(searchvalue) ||
        plan.validPeriod.toLowerCase().includes(searchvalue.toLowerCase()) ||
        plan.searchCount.toString().includes(searchvalue)
      );
    });
  };

  // Reset input fields
  const resetFields = () => {
    setPlanName("");
    setPriceDescription("");
    setImageUrl("");
    setPrice("");
    setSearchCount("");
    setValidPeriod("");
    setNoOfPeriod("");
  };

  // Open Add Plan Modal
  const handleOpenAddModal = () => {
    resetFields();
    setShowAddModal(true);
  };

  // Open Edit Plan Modal
  const handleOpenEditModal = (plan) => {
    setSelectedPlan(plan);
    setPlanName(plan.planName);
    setPriceDescription(plan.priceDescription);
    setImageUrl(plan.imagelink);
    setPrice(plan.price);
    setSearchCount(plan.searchCount);
    setValidPeriod(plan.validPeriod);
    setNoOfPeriod(plan.noOfPeriod);
    setShowEditModal(true);
  };

  // Add Plan
  const addPlan = async () => {
    try {
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
        planName,
        price,
        priceDescription,
        validPeriod,
        noOfPeriod,
        searchCount,
        imagelink: imageUrl,
      };

      const response = await axios.post(
        `${apiUrl.BASEURL}${apiUrl.ADD_PLAN}`,
        data
      );
      if (response.status === 200) {
        alert("Plan added successfully");
        fetchData(); // Refresh the table
        setShowAddModal(false); // Close modal
      }
    } catch (error) {
      console.error("Error adding plan:", error);
      alert("Failed to add plan.");
    }
  };

  // Edit Plan
  const editPlan = async () => {
    try {
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
        planName,
        price,
        priceDescription,
        validPeriod,
        noOfPeriod,
        searchCount,
        imagelink: imageUrl,
      };

      const response = await axios.put(
        `${apiUrl.BASEURL}/plans/updatedplan/${selectedPlan._id}`,
        data
      );

      if (response.status === 200) {
        alert("Plan updated successfully");
        fetchData(); // Refresh the table
        setShowEditModal(false); // Close modal
      }
    } catch (error) {
      console.error("Error updating plan:", error);
      alert("Failed to update plan.");
    }
  };

  // Delete Plan
  const deletePlan = async (id) => {
    try {
      const response = await axios.post(
        `${apiUrl.BASEURL}${apiUrl.DELETE_PLAN}${id}`
      );
      if (response.status === 200) {
        alert("Plan deleted successfully");
        fetchData(); // Refresh the table
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
      alert("Failed to delete plan.");
    }
  };

  // Table Columns
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
        <img
          src={row.imagelink}
          alt=""
          style={{ width: "50px", height: "50px" }}
        />
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
      name: "Actions",
      selector: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="warning"
            size="sm"
            onClick={() => handleOpenEditModal(row)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => deletePlan(row._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button variant="info" onClick={handleOpenAddModal} className="mb-4">
        Add Plan
      </Button>{" "}
      <br />
      <input
        type="text"
        className="mb-3"
        placeholder="search..."
        value={searchvalue}
        onChange={(e) => setsearchvalue(e.target.value)}
        style={{
          border: "1px solid grey",
          borderRadius: "5px",
          outline: "none",
          height: "35px",
          paddingLeft: "15px",
        }}
      />
      <DataTable
        columns={columns}
        data={filterPlans()}
        defaultSortFieldId={1}
      />
      {/* Add Plan Modal */}
      <Offcanvas
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Plan</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Add Plan Form */}
          <PlanForm
            planName={planName}
            setPlanName={setPlanName}
            priceDescription={priceDescription}
            setPriceDescription={setPriceDescription}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            price={price}
            setPrice={setPrice}
            searchCount={searchCount}
            setSearchCount={setSearchCount}
            validPeriod={validPeriod}
            setValidPeriod={setValidPeriod}
            noOfPeriod={noOfPeriod}
            setNoOfPeriod={setNoOfPeriod}
          />
          <Button variant="primary" className="mt-3" onClick={addPlan}>
            Add Plan
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
      {/* Edit Plan Modal */}
      <Offcanvas
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Plan</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Edit Plan Form */}
          <PlanForm
            planName={planName}
            setPlanName={setPlanName}
            priceDescription={priceDescription}
            setPriceDescription={setPriceDescription}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            price={price}
            setPrice={setPrice}
            searchCount={searchCount}
            setSearchCount={setSearchCount}
            validPeriod={validPeriod}
            setValidPeriod={setValidPeriod}
            noOfPeriod={noOfPeriod}
            setNoOfPeriod={setNoOfPeriod}
          />
          <Button variant="primary" className="mt-3" onClick={editPlan}>
            Update Plan
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

function PlanForm({
  planName,
  setPlanName,
  priceDescription,
  setPriceDescription,
  imageUrl,
  setImageUrl,
  price,
  setPrice,
  searchCount,
  setSearchCount,
  validPeriod,
  setValidPeriod,
  noOfPeriod,
  setNoOfPeriod,
}) {
  return (
    <div>
      <div>
        <label>Plan Name *</label>
        <input
          type="text"
          className="form-control"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
        />
      </div>
      <div>
        <label>Plan Description</label>
        <textarea
          className="form-control"
          value={priceDescription}
          onChange={(e) => setPriceDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Image URL *</label>
        <input
          type="text"
          className="form-control"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div>
        <label>Price *</label>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Search Count *</label>
        <input
          type="number"
          className="form-control"
          value={searchCount}
          onChange={(e) => setSearchCount(e.target.value)}
        />
      </div>
      <div>
        <label>Valid Period *</label>
        <select
          className="form-control"
          value={validPeriod}
          onChange={(e) => setValidPeriod(e.target.value)}
        >
          <option value="">--- Select ---</option>
          <option value="Month">Monthly</option>
          <option value="Year">Yearly</option>
        </select>
      </div>
      {validPeriod && (
        <div>
          <label>Number of {validPeriod} *</label>
          <input
            type="number"
            className="form-control"
            value={noOfPeriod}
            onChange={(e) => setNoOfPeriod(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default Pricing;
