import axios, { Axios } from "axios";
const api_url = "http://localhost:8180/api/report";

export async function getPlanName() {
  return await axios.get(`${api_url}/plan-name`);
}
export async function getPlanStatus() {
  return await axios.get(`${api_url}/plan-status`);
}

// export async function fechData(searchRequest) {
//   console.log('searchrequest', searchRequest);

//   const { planName, planStatus, gender, startDate, endDate } = searchRequest;

//   // Construct the query string
//   const queryString = `planName=${encodeURIComponent(planName)}&planStatus=${encodeURIComponent(planStatus)}&gender=${encodeURIComponent(gender)}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`;

//   // Make the GET request
//   return await axios.get(`${api_url}/search?${queryString}`);
// }
export async function fechData(searchRequest) {
  console.log('searchrequest', searchRequest);

  // Make the GET request using the params object
  return await axios.get(`${api_url}/search`, {
    params: searchRequest,
  });
}



// export async function fechData(searchRequest) {
//   console.log('searchrequest', searchRequest);
//   return await axios.get(`${api_url}/search?endDate=${}`, searchRequest);
// }