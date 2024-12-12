import React, { useEffect, useState } from "react";
import "./style/broadcasting.css";
import { Button } from "react-bootstrap";
import { deleteData, getData, postFormData } from "../../Api-Service/apiHelper";
import { apiUrl } from "../../Api-Service/apiConstants";
import DataTable from "react-data-table-component";

function BroadCating() {
  const formData = new FormData();
  const [message, setMessage] = useState(null);
  const [screenImage, setScreenImage] = useState(null);
  const [error, setError] = useState(null);
  const [allBroadcast, setAllBroadcast] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const userRes = await getData(apiUrl.GET_ALL_BROADCAST);
      setAllBroadcast(userRes.data);
      console.log("userRes.data", userRes.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    if (file) {
      const fileType = file.type;
      if (!fileType.startsWith("image/")) {
        setError("Please upload a valid image file (PNG or JPEG).");
        return;
      }
      const maxSize = 800 * 600;
      if (file.size > maxSize) {
        setError("Image size should be 800px x 600px or smaller.");
        return;
      }
      setError(null);
      setScreenImage(file);
    }
  };
  console.log("error", error);

  console.log("screenImage", screenImage);

  const Launch = async () => {
    if (!message || !screenImage) {
      alert("Fill all the fields");
      return;
    } else {
      formData.append("message", message);
      formData.append("image", screenImage);
      try {
        const res = await postFormData(apiUrl.CREATE_BROADCAST, formData);
        if (res) {
          alert("Added");
          console.log("res", res);
          // fetchData();
          // setScreenImage(null);
          // setMessage(null);
          window.location.reload();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleDeletObj = async (id) => {
    try {
      const res = await deleteData(`${apiUrl.DELETE_BROADCAST}${id}`);
      if (res) {
        alert("Deleted Sucessfull");
        fetchData();
        // window.location.reload();
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Broadcast Message",
      selector: (row, index) => (
        <div style={{ marginTop: "20px" }}>
          {index + 1}). {row.message}
        </div>
      ),
      // sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <div style={{ margin: "5px" }}>
          <img
            src={`${apiUrl.IMAGEURL}/Broadcast/${row.image}`}
            alt="image"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      ),
      sortable: true,
    },
    // {
    //   name: "App Downloads",
    //   selector: (row) => "",
    //   sortable: true,
    // },
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
      sortable: true,
    },
  ];

  return (
    <div>
      <div className="root-0-1-732 contentContainer-0-1-726">
        <div class="sections-0-1-727">
          <div class="leftSection-0-1-728">
            <div class="label-0-1-733">
              <div class="labelText-0-1-734">Broadcast Message</div>
              <div class="inputContainer-0-1-133 undefined ">
                <textarea
                  class="input-0-1-134 input-d21-0-1-1124 undefined"
                  placeholder="e.g. How to sell your products online on Amazon in India"
                  type="text"
                  style={{ width: "70%" }}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            <div class="label-0-1-733 d-flex" style={{ alignItems: "center" }}>
              <div class="labelText-0-1-734">Add Image</div>
              <div
                class="inputContainer-0-1-133 undefined"
                style={{ margin: "0px 50px" }}
              >
                <div
                  style={{
                    border: "1px dashed #25cff2",
                    borderRadius: 10,
                  }}
                >
                  <div
                    className="d-flex p-2"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#25cff2",
                    }}
                  >
                    <i class="fa-solid fa-circle-plus me-1"></i>{" "}
                    <input
                      accept="image/gif,image/jpeg,image/jpeg,image/png,image/webp,image/vnd.wap.wbmp,image/svg+xml,image/tiff"
                      style={{ display: "none" }}
                      id="icon-button-file"
                      type="file"
                      onChange={handleBannerImageChange}
                    />
                    <label htmlFor="icon-button-file">Upload Image</label>
                  </div>
                </div>
              </div>
            </div>
            {screenImage && (
              <div style={{ width: "200px", height: "150px" }}>
                <img
                  src={URL.createObjectURL(screenImage)}
                  alt={screenImage}
                  style={{
                    width: "50%",
                    height: "50%",
                    // marginTop: "20px",
                  }}
                />
              </div>
            )}
            <span
              style={{
                fontSize: "14px",
                fontStyle: "normal",
                fontFamily: "inherit",
                fontWeight: "600",
                lineHeight: "16px",
                paddingLeft: "11px",
                color: "rgb(239, 105, 30)",
              }}
            >
              {error && <div style={{ color: "red" }}>{error}</div>}
            </span>
            <Button variant="info" onClick={Launch}>
              Launch
            </Button>
          </div>
          <div
            class="leftSection-0-1-728"
            style={{ border: "1px #e0e0e0 solid", borderRadius: 10 }}
          >
            <div className="TableHeaderContainer-0-1-672">
              <DataTable
                columns={columns}
                data={allBroadcast}
                defaultSortFieldId={1}
              />
            </div>
          </div>
        </div>
        <br />
        {/* <div className="footerNavContainer-0-1-444 footerNavContainer-d0-0-1-457">
          <Button
            className="px-5 py-2"
            variant="outline-info"
            onClick={() => window.location.assign("/people/team-members")}
          >
            <i class="fa-solid fa-arrow-left-long"></i> &nbsp; Back
          </Button>
          <Button className="ms-2 px-5" variant="info" onClick={Launch}>
            Save & Proceed &nbsp; <i class="fa-solid fa-arrow-right-long"></i>
          </Button>
        </div> */}
      </div>
    </div>
  );
}

export default BroadCating;
