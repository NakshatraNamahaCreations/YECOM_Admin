import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";

function Paymentkey() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    resetForm(); // Reset form on close
  };
  const handleShow = () => setShow(true);

  const [merchantkey, setmerchantkey] = useState("");
  const [saltkey, setsaltkey] = useState("");
  const [reazorpaykey_id, setreazorpaykey_id] = useState("");
  const [reazorpaykey_secret, setreazorpaykey_secret] = useState("");
  const [getallpaymetkey, setgetallpaymetkey] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [paymenttype, setpaymenttype] = useState("");

  // Reset form fields and edit mode
  const resetForm = () => {
    setIsEditMode(false);
    setCurrentEditId(null);
    setmerchantkey("");
    setsaltkey("");
    setreazorpaykey_id("");
    setreazorpaykey_secret("");
    setpaymenttype("");
  };

  useEffect(() => {
    getAllpayment();
  }, []);

  const getAllpayment = async () => {
    try {
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/paymentkey/getallitemgroups"
      );
      if (response.status === 200) {
        console.log("Account Group=====>", response.data);
        setgetallpaymetkey(response.data.allItems);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  console.log("getallpaymetkey", getallpaymetkey);

  const handleSubmit = async () => {
    const requestData = {
      merchantkey,
      saltkey,
      reazorpaykey_id,
      reazorpaykey_secret,
      paymenttype,
      itemgroupstatus: "Active",
    };

    try {
      if (isEditMode) {
        // Edit Mode: Send PUT request
        const res = await axios.put(
          `https://api.proleverageadmin.in/api/paymentkey/edititemgroups/${currentEditId}`,
          requestData,
          { headers: { "content-type": "application/json" } }
        );
        if (res.status === 200) {
          alert("Payment keys updated successfully");
        }
      } else {
        // Add Mode: Send POST request
        const res = await axios.post(
          "https://api.proleverageadmin.in/api/paymentkey/addpaymentkey",
          requestData,
          { headers: { "content-type": "application/json" } }
        );
        if (res.status === 200) {
          alert("Payment keys added successfully");
        }
      }
      getAllpayment(); // Refresh data
      handleClose(); // Close modal
    } catch (error) {
      console.log("Error in submission:", error);
      alert("Error in submission");
    }
  };

  const handlenavigation = () => {
    window.location.assign("/userrights");
  };

  const data = [
    {
      id: 1,
      liveketid: "Kiruthika Mani",
      livekeysecrete: "kiruthika@gmail.com",
      livewebhooksecret: 9943740866,
      accountno: "accountno",
    },
  ];

  const activeAccount = async (selectedAccountId) => {
    try {
      const config = {
        url: `/paymentkey/itemgroupstatus/${selectedAccountId}`,
        method: "put",
        baseURL: "https://api.proleverageadmin.in/api",
        headers: { "content-type": "application/json" },
        data: {
          itemgroupstatus: "Active",
        },
      };
      let response = await axios(config);
      if (response.status === 200) {
        console.log(response.data);
        alert("Account has been Activated");
        // window.location.reload();
        getAllpayment();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const inActiveAccount = async (selectedAccountId) => {
    try {
      const config = {
        url: `/paymentkey/itemgroupstatus/${selectedAccountId}`,
        method: "put",
        baseURL: "https://api.proleverageadmin.in/api",
        headers: { "content-type": "application/json" },
        data: {
          itemgroupstatus: "InActive",
        },
      };
      let response = await axios(config);
      if (response.status === 200) {
        console.log(response.data);
        alert("Account has been InActivated");

        getAllpayment();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const deletegroupitem = async (data) => {
    try {
      const res = await axios.delete(
        `https://api.proleverageadmin.in/api/paymentkey/deleteitemgroups/${data?._id}`
      );

      if (res.status === 200) {
        console.log(res.data);
        alert(res.data.message);
        getAllpayment();
      }
    } catch (error) {
      console.log("Error", error);
      alert("Cannot perform the operation");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "InActive" : "Active";
    try {
      const config = {
        url: `/paymentkey/itemgroupstatus/${id}`,
        method: "put",
        baseURL: "https://api.proleverageadmin.in/api",
        headers: { "content-type": "application/json" },
        data: { itemgroupstatus: newStatus },
      };
      const response = await axios(config);
      if (response.status === 200) {
        console.log(`Status updated to ${newStatus}`);
        alert(`Status updated to ${newStatus}`);
        getAllpayment(); // Refresh the list to reflect the latest status
      }
    } catch (error) {
      console.warn("Failed to update status:", error);
    }
  };

  const handleEdit = (item) => {
    setIsEditMode(true);
    setCurrentEditId(item._id);
    setmerchantkey(item.merchantkey);
    setsaltkey(item.saltkey);
    setreazorpaykey_id(item.reazorpaykey_id);
    setreazorpaykey_secret(item.reazorpaykey_id);
    setpaymenttype(item.paymenttype);
    setShow(true);
  };

  const columns = [
    {
      name: "SI NO",
      selector: (row, index) => (
        <span style={{ fontFamily: "Poppins, sans-serif" }}>{index + 1}</span>
      ),
      sortable: true,
    },
    {
      name: "Merchant Key",
      selector: (row) => (
        <span style={{ fontFamily: "Poppins, sans-serif" }}>
          {row.merchantkey}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Salt Key",
      selector: (row) => (
        <span style={{ fontFamily: "Poppins, sans-serif" }}>{row.saltkey}</span>
      ),
      sortable: true,
    },
    {
      name: "Reazorpay key_id",
      selector: (row) => (
        <span style={{ fontFamily: "Poppins, sans-serif" }}>
          {row.reazorpaykey_id}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Reazorpay secret_key",
      selector: (row) => (
        <span style={{ fontFamily: "Poppins, sans-serif" }}>
          {row.reazorpaykey_secret}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Payment Type",
      selector: (row) => (
        <span style={{ fontFamily: "Poppins, sans-serif" }}>
          {row.paymenttype}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <label className="switch">
          <input
            type="checkbox"
            checked={row.itemgroupstatus === "Active"}
            onChange={() => toggleStatus(row._id, row.itemgroupstatus)}
          />
          <span className="slider round"></span>
        </label>
      ),
      sortable: false,
    },
    {
      name: "Action",
      selector: (row) => (
        <div style={{ fontFamily: "Poppins, sans-serif" }}>
          <i
            className="fa-solid fa-trash-can"
            onClick={() => deletegroupitem(row)}
            style={{ color: "red", cursor: "pointer" }}
          ></i>
          <i
            title="Edit"
            className="fa-regular fa-pen-to-square ms-2"
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(row)}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="d-flex  mt-2" style={{ justifyContent: "space-between" }}>
        <div className="d-flex">
          <i
            className="fa-solid fa-arrow-left mt-1"
            style={{ fontSize: "18px" }}
          ></i>
          <div className="poppins-black mx-3">Payment Config</div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-12">
          <DataTable columns={columns} data={getallpaymetkey} pagination />
          <div className="row mt-4" style={{ justifyContent: "end" }}>
            <div className="col-md-3" onClick={handleShow}>
              <div className="poppins-regular strem_button">
                Add Payment Config
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div className="poppins-black" style={{ fontSize: "14px" }}>
                Payment Config
              </div>
              <div className="modal_close_icon" onClick={handleClose}>
                <i className="fa-solid fa-x"></i>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <div className="poppins-regular s_input_label">Merchant ID</div>
            <input
              type="text"
              className="col-md-12 s_input_value poppins-regular"
              value={merchantkey}
              onChange={(e) => setmerchantkey(e.target.value)}
            />
          </div>

          <div className="">
            <div className="poppins-regular s_input_label">Salt Key</div>
            <input
              type="text"
              className="col-md-12 s_input_value poppins-regular"
              value={saltkey}
              onChange={(e) => setsaltkey(e.target.value)}
            />
          </div>

          <div className="">
            <div className="poppins-regular s_input_label">
              Reazorpay key_id
            </div>
            <input
              type="text"
              className="col-md-12 s_input_value poppins-regular"
              value={reazorpaykey_id}
              onChange={(e) => setreazorpaykey_id(e.target.value)}
            />
          </div>

          <div className="">
            <div className="poppins-regular s_input_label">
              Reazorpay secret key
            </div>
            <input
              type="text"
              className="col-md-12 s_input_value poppins-regular"
              value={reazorpaykey_secret}
              onChange={(e) => setreazorpaykey_secret(e.target.value)}
            />
          </div>

          <div className="">
            <div className="poppins-regular s_input_label">Payment Type</div>
            {/* <input
              type="text"
              className="col-md-12 s_input_value poppins-regular"
              value={paymenttype}
              onChange={(e) => setpaymenttype(e.target.value)}
            /> */}
            <select
              className="col-md-12 s_input_value poppins-regular"
              value={paymenttype}
              onChange={(e) => setpaymenttype(e.target.value)}
            >
              <option>---select payment type---</option>
              <option>phonepe</option>
              <option>razorpay</option>
            </select>
          </div>

          <div
            className="row"
            // onClick={addpaymentkey}
            onClick={handleSubmit}
            style={{ justifyContent: "end" }}
          >
            <div className="col-md-4 mt-3">
              <div className="poppins-regular strem_button">
                {isEditMode ? "Update" : "Submit"}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Paymentkey;
