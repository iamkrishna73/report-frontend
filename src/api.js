import axios, { Axios } from "axios";
const api_url = "http://localhost:8180/api/report";

export async function getPlanName() {
  return await axios.get(`${api_url}/plan-name`);
}
export async function getPlanStatus() {
  return await axios.get(`${api_url}/plan-status`);
}

export async function getReport(searchRequest) {
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
export const sendExcelByEmail = async () => {
  try {
    await axios.get(`${api_url}/send-excel`);// Return the success message
  } catch (error) {
    throw error.response ? error.response.data : "An error occurred.";
  }
};


// Define the function to download the PDF
export const sendPdfByEmail = async () => {
  try {
    await axios.get(`${api_url}/send-pdf`);// Return the success message
  } catch (error) {
    throw error.response ? error.response.data : "An error occurred.";
  }
};
