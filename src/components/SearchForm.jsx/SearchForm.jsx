import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getPlanName,
  getPlanStatus,
  getReport,
  sendExcelByEmail,
  sendPdfByEmail,
} from "../../api";
import TableData from "./TableData";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [tableData, setTableData] = useState([]);
  const [planNames, setPlanNames] = useState([]);
  const [planStatus, setplanStatus] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanNames = async () => {
      try {
        const response = await getPlanName();
        setPlanNames(response.data);
      } catch (err) {
        setError("Failed to fetch plan names");
        console.error("Error:", err);
      }
    };

    fetchPlanNames();
  }, []);

  useEffect(() => {
    const fetchPlanStatus = async () => {
      try {
        const response = await getPlanStatus();
        setplanStatus(response.data);
      } catch (err) {
        setError("Failed to fetch plan status");
        console.error("Error:", err);
      }
    };

    fetchPlanStatus();
  }, []);

  if (error) return <p>{error}</p>;
  if (!planNames.length || !planStatus.length) return <p>Loading...</p>;

  const onSubmit = async (data) => {
    console.log("Search parameters:", data);
    try {
      const fetchData = await getReport(data); // Fetch report data based on input
      if (fetchData && fetchData.length > 0) {
        setTableData(fetchData); // Update table data only when data is returned
      } else {
        setTableData([]); // Show empty table if no results found
      }
    } catch (err) {
      setError("Failed to fetch Report");
      console.error("Error:", err);
    }
  };

  const handleReset = () => {
    reset(); // Reset the form fields
    setTableData([]); // Clear the table data
  };

  const getExcelData = async () => {
    try {
      await sendExcelByEmail();
      toast.success("Excel report sent successfully!"); // Success toast
    } catch (error) {
      toast.error(`Failed to send Excel report: ${error}`); // Error toast
    }
  };

  const getPdfData = async () => {
    try {
      await sendPdfByEmail();
      toast.success("PDF report sent successfully!"); // Success toast
    } catch (error) {
      toast.error(`Failed to send PDF report: ${error}`); // Error toast
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} className="container">
          <div className="container">
            <div className="row">
              {/* Dropdowns Section */}
              <div className="col-md-2 mb-3">
                <label>Plan Name:</label>
                <select className="form-control" {...register("planName")}>
                  <option value="">Select a plan</option>
                  {planNames.map((plan, index) => (
                    <option key={index} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2 mb-3">
                <label>Plan Status:</label>
                <select className="form-control" {...register("planStatus")}>
                  <option value="">Select a Status</option>
                  {planStatus.map((plan, index) => (
                    <option key={index} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2 mb-3">
                <label>Gender:</label>
                <select className="form-control" {...register("gender")}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              {/* Date Section */}
              <div className="col-md-3 mb-3">
                <label>Start Date:</label>
                <input
                  type="date"
                  className="form-control"
                  {...register("planStartDate")}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label>End Date:</label>
                <input
                  type="date"
                  className="form-control"
                  {...register("planEndDate")}
                />
              </div>
            </div>
          </div>

          {/* Left-aligned buttons */}
          <div>
            <button type="submit" className="btn btn-primary me-2">
              Search
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>

        {/* Right-aligned buttons */}
        <div className="d-flex justify-content-end">
          <button onClick={getExcelData} className="btn btn-success me-2">
            Send Excel via Email
          </button>
          <button onClick={getPdfData} className="btn btn-danger">
            Send PDF via Email
          </button>
        </div>

        <hr />
        {/* Table Data Section */}
        <TableData data={tableData} />
        <hr />
      </div>
    </>
  );
};

export default SearchForm;

