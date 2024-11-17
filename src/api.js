import axios, { Axios } from "axios";
const api_url = "http://localhost:8180/api/report";

export async function getPlanName() {
  return await axios.get(`${api_url}/plan-name`);
}
export async function getPlanStatus() {
  return await axios.get(`${api_url}/plan-status`);
}

export async function getReport(searchRequest) {
  console.log("Request URL:", `${api_url}/search`);
  console.log("Request Params:", searchRequest);

  // Make the GET request using the params object
  const res = await axios.get(`${api_url}/search`, {
  //   planName: searchRequest.planName,
  //   planStatus: searchRequest.planStatus,
  //   gender: searchRequest.gender,
  //   startDate: searchRequest.startDate,
  //   endDate: searchRequest.endDate,
   params: searchRequest

  });
  return res.data;
}
export async function downloadExcel() {
  return await axios.get(`${api_url}/download`, {
    responseType: "blob", // Ensures the response is a Blob for file downloads
  });
}
