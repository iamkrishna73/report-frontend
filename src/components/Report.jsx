import React, { useEffect, useState } from "react";
import { getPlanName, getPlanStatus } from "../api";

const Report = () => {
  const [planStatus, setplanStatus] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPlanStatus = async () => {
      try {
        const response = await getPlanStatus();
        setplanStatus(response.data); // Set the state to the array of plan names
      } catch (err) {
        setError("Failed to fetch plan status");
        console.error("Error:", err);
      }
    };

    fetchPlanStatus();
  }, []);

  if (error) return <p>{error}</p>;
  if (!planStatus.length) return <p>Loading...</p>;

  return (
    <div>
      <h1>Select a Plan:</h1>
      <select>
        <option value="">Select a Status</option>
        {planStatus.map((plan, index) => (
          <option key={index} value={plan}>
            {plan}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Report;
