import React, { useEffect, useState } from "react";
import "../style/users.css";
import DataTable from "react-data-table-component";
import { Button, Modal, Offcanvas } from "react-bootstrap";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { getData } from "../../../Api-Service/apiHelper";
import { apiUrl } from "../../../Api-Service/apiConstants";
import moment from "moment";
import axios from "axios";

function Coupon() {
  const [show, setShow] = useState(false);
  const [couponcode, setcouponcode] = useState("");
  const [discount, setdiscount] = useState("");
  const [allcoupondata, setallcoupondata] = useState("");

  const createCoupon = async () => {
    if (!couponcode || !discount) {
      alert("Please fill all the fields");
      return; // Stop execution if fields are empty
    }

    try {
      const data = {
        couponCode: couponcode,
        discount: discount,
      };

      const res = await axios.post(
        "https://api.proleverageadmin.in/api/addplanCoupon",
        data
      );

      if (res.status === 200) {
        alert("Coupon Created");
        getAllcoupondata();
        setShow(false);
        setcouponcode("");
        setdiscount("");
        // window.location.reload("");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create coupon");
    }
  };

  useEffect(() => {
    getAllcoupondata();
  }, []);

  const getAllcoupondata = async () => {
    try {
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/getAllplanCoupon"
      );
      if (response.status === 200) {
        setallcoupondata(response.data.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  console.log("allcoupondata", allcoupondata);

  const handleClose = () => {
    setShow(false);
  };

  const handledelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://api.proleverageadmin.in/api/deleteplanCoupon/${id}`
      );

      if (res.status === 200) {
        console.log(res.data);
        alert("deleted");
        getAllcoupondata();
      }
    } catch (error) {
      console.log("Error", error);
      alert("Cannot perform the operation");
    }
  };

  const columns = [
    {
      name: "SI.NO",
      selector: (row, index) => index + 1,

      sortable: true,
    },
    {
      name: "Coupon Code",
      selector: (row) => row.couponCode,
      sortable: true,
    },
    {
      name: "Discount",
      selector: (row) => row.discount,
      sortable: true,
    },

    {
      name: " Action",
      selector: (row) => (
        <div className="d-flex">
          <i
            onClick={() => handledelete(row._id)}
            className="fa-solid fa-trash"
            style={{ color: "black", cursor: "pointer", fontSize: "17px" }}
          ></i>
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <div className="mt-3">
      <div className="d-flex mb-3" style={{ justifyContent: "end" }}>
        <button className="btn btn-success" onClick={() => setShow(true)}>
          Add Coupon
        </button>
      </div>

      {/* Table */}
      <div className="TableHeaderContainer-0-1-672" style={{ width: "100%" }}>
        <DataTable
          columns={columns}
          data={allcoupondata}
          // defaultSortFieldId={1}
        />
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="" style={{ fontSize: "18px" }}>
              Add Coupon
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-1" style={{ fontSize: "15px" }}>
            Coupon Code
          </div>
          <input
            type="text"
            className="mt-1 col-md-12"
            value={couponcode}
            onChange={(e) => setcouponcode(e.target.value)}
            placeholder="Coupon Code"
            style={{
              border: "1px solid lightgrey",
              paddingLeft: "15px",
              borderRadius: "5px",
              height: "35px",
              outline: "none",
              fontSize: "14px",
            }}
          />

          <div className="mb-1 mt-2" style={{ fontSize: "15px" }}>
            Discount
          </div>
          <input
            type="tel"
            className="mt-1 col-md-12"
            value={discount}
            onChange={(e) => setdiscount(e.target.value)}
            placeholder="Discount"
            style={{
              border: "1px solid lightgrey",
              paddingLeft: "15px",
              borderRadius: "5px",
              height: "35px",
              outline: "none",
              fontSize: "14px",
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={createCoupon}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Coupon;
