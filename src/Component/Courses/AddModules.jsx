import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getData, postData, postFormData } from "../../Api-Service/apiHelper";
import { apiUrl } from "../../Api-Service/apiConstants";
import { MdDelete } from "react-icons/md";

function AddModules() {
  const { objectId, couserTitle } = useParams();
  const Navigate = useNavigate();
  const [moduleItems, setModuleItems] = useState([
    {
      moduleId: "",
      moduleTitle: "",
      description: "",
    },
  ]);
  const handleAddModule = () => {
    let newItemList = moduleItems;
    setModuleItems((prevModules) => [...prevModules, newItemList]);
  };

  const deleteRow = (index) => {
    setModuleItems(moduleItems.filter((_, i) => i !== index));
  };
  const handleModuleChange = (index, key, value) => {
    setModuleItems((prevModules) => {
      const updatedModules = [...prevModules];
      updatedModules[index][key] = value;
      return updatedModules;
    });
  };

  const addModules = async () => {
    if (!moduleItems || moduleItems.length === 0) {
      alert("Please add at least one module item.");
    }
    // Validate if any module title is empty
    const emptyModule = moduleItems.some((item) => !item.moduleTitle?.trim());
    if (emptyModule) {
      alert("Please fill in all Module Names before proceeding.");
      return;
    }

    try {
      const data = {
        moduleItems: moduleItems.map((item) => ({
          courseName: couserTitle,
          courseId: objectId,
          moduleTitle: item.moduleTitle,
          description: item.description,
        })),
      };
      const res = await postData(apiUrl.ADD_MODULES, data);
      if (res) {
        alert("Modules added successfully.");
        Navigate(
          `/courses/add-contents/${objectId}/${encodeURIComponent(couserTitle)}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const styles = {
    courseInput: {
      width: "100%",
      border: "1px solid rgb(216, 224, 240)",
      borderRadius: "16px",
      fontSize: "16px",
      backgroundColor: "white",
      outline: "none",
      backgroundPosition: "10px 10px",
      backgroundRepeat: "no-repeat",
      padding: "12px 18px 11px 13px",
      lineHeight: "24px",
      // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    },
    addModules: {
      width: "100%",
      border: "1px solid rgb(216, 224, 240)",
      borderRadius: "9px",
      fontSize: "16px",
      backgroundColor: "white",
      outline: "none",
      backgroundPosition: "10px 10px",
      backgroundRepeat: "no-repeat",
      padding: "10px",
      lineHeight: "24px",
      // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    },
    imgStateText: {
      fontSize: "14px",
      fontStyle: "normal",
      fontFamily: "inherit",
      fontWeight: "600",
      lineHeight: "16px",
      paddingLeft: "11px",
      color: "rgb(239, 105, 30)",
    },
    thumbnailImgCont: {
      width: "200px",
      height: "150px",
    },
    selectField: {
      width: "100%",
      border: "1px solid rgb(216, 224, 240)",
      borderRadius: "16px",
      fontSize: "16px",
      backgroundColor: "white",
      outline: "none",
      backgroundPosition: "10px 10px",
      backgroundRepeat: "no-repeat",
      padding: "12px 18px 11px 13px",
      lineHeight: "24px",
      // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    },
    errorText: {
      fontSize: "13px",
      color: "red",
      fontWeight: "500",
    },
  };
  return (
    <div>
      <div className="headerTitle-0-1-70">{couserTitle}</div>
      <div className="headerDesc-0-1-71">
        <div>Add Modules for your course</div>
      </div>
      <div className="addCourseMain-0-1-55" style={{ padding: "20px" }}>
        <Button className="mb-2" onClick={handleAddModule}>
          +
        </Button>
        {moduleItems.map((ele, index) => (
          <div className="row" key={index}>
            <h6 className="course-lable-title">
              <i class="fa-brands fa-modx"></i> {`Module ${index + 1}`}
            </h6>
            <div className="col-md-6">
              <label>
                <b>Module Name</b>
              </label>
              <br />
              <input
                className="mt-2"
                type="text"
                name="search"
                placeholder="Enter module name"
                style={styles.courseInput}
                onChange={(e) =>
                  handleModuleChange(index, "moduleTitle", e.target.value)
                }
              />
            </div>
            <div className="col-md-5">
              <label>
                <b>Module Description</b>
              </label>
              <br />
              <textarea
                className="mt-2 "
                type="text"
                name="search"
                placeholder="Enter module description here..."
                style={styles.courseInput}
                onChange={(e) =>
                  handleModuleChange(index, "description", e.target.value)
                }
              />
            </div>
            <div className="col-md-1">
              <MdDelete
                onClick={() => deleteRow(index)}
                style={{ cursor: "pointer", marginTop: "60px" }}
                color="red"
              />
            </div>
          </div>
        ))}
        <Button className="mt-2 mb-2" onClick={addModules}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default AddModules;
