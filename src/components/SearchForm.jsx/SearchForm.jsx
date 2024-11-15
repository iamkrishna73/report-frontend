import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fechData, getPlanName, getPlanStatus } from "../../api";

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      const saveData = await fechData(data);
      console.log("new data loaded")
      
    } catch (error) {
      
    }
    // Add further logic here, like an API call, based on form data
  };

  return (
    <> 
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <div className="container">
        <div className="row">
          {/* Dropdowns Section */}
          <div className="col-md-4 mb-3">
            <label>Plan Name: </label>
            <select className="form-control" {...register("planName")}>
              <option value="">Select a plan</option>
              {planNames.map((plan, index) => (
                <option key={index} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 mb-3">
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
          <div className="col-md-4 mb-3">
            <label>Gender:</label>
            <select className="form-control" {...register("gender")}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {/* Date Section */}
          <div className="col-md-6 mb-3">
            <label>Start Date:</label>
            <input
              type="date"
              className="form-control"
              {...register("startDate")}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>End Date:</label>
            <input
              type="date"
              className="form-control"
              {...register("endDate")}
            />
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
    <hr />
    </>
  );
};

export default SearchForm;
