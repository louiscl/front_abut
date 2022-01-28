// comment to push cli

// const port = "5001";
// const base_link = `${api_address}${port}`;
const base_link = "http://3.92.189.123:8000";

let requestHeaders = new Headers();
requestHeaders.append("Accept", "application/json");
requestHeaders.append("Content-Type", "application/json");

// const fetchBuildingData = async (address) => {
//   //   link defaults to proxy defined in package.json
//   const listRequestOptions = {
//     method: "GET",
//     headers: requestHeaders,
//     // body: JSON.stringify({ address: addressHash }),
//   };
//   const ad = address.replace(/,/g, "").replace(/\s/g, "%20");

//   const r = await fetch(
//     `${base_link}/predict/${ad}`,
//     // `${base_link}`,
//     listRequestOptions
//   );
//   //   const d = await r.json();
//   const res = await fetch(
//     //   api address:
//     `${base_link}/location/${ad}`,
//     // `${base_link}`,
//     listRequestOptions
//   );
// };

const fetchBuildingData = async (address) => {
  //   link defaults to proxy defined in package.json
  const listRequestOptions = {
    method: "GET",
    headers: requestHeaders,
    // body: JSON.stringify({ address: addressHash }),
  };
  const ad = address.replace(/,/g, "").replace(/\s/g, "%20");

  const r = await fetch(
    `${base_link}/predict/${ad}`,
    // `${base_link}`,
    listRequestOptions
  );
  //   const d = await r.json();
  const res = await fetch(
    //   api address:
    `${base_link}/overlay/${ad}`,
    // `${base_link}`,
    listRequestOptions
  );
  //   const data = await res.json();
  //   console.log("\x1b[36m%s\x1b[0m", "data:", "\n", data);
  //   return { data: data };
};

// AirDNA

const normalizeAddress = async (address) => {
  const listRequestOptions = {
    method: "GET",
    headers: requestHeaders,
  };

  const res = await fetch(
    `${base_link}/fix_add/${address}`,
    listRequestOptions
  );

  const data = await res.json();
  return data;
};

const fetchRentalData = async (addressHash) => {
  // link defaults to proxy defined in package.json
  const state = addressHash["state"];
  const city = addressHash["city"];
  const zip = addressHash["zip"];
  console.log(`city${city}`);
  const requestOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-host": "mashvisor-api.p.rapidapi.com",
      "x-rapidapi-key": "300e4f46f4msh89c6351d2a97527p1e17f0jsne39ffd46bb3d",
    },
  };
  //   const res = await fetch(
  //     `https://mashvisor-api.p.rapidapi.com/rental-rates?state=${state}&source=airbnb&city=${city}&zip_code=${zip}`,
  //     requestOptions
  //   );
  //   console.log(
  //     `https://mashvisor-api.p.rapidapi.com/rental-rates?state=${state}&source=airbnb&city=${city}&zip_code=${zip}`
  //   );
  const res = await fetch(
    `https://mashvisor-api.p.rapidapi.com/rental-rates?state=${state}&source=airbnb&zip_code=${zip}`,
    requestOptions
  );
  console.log(
    `https://mashvisor-api.p.rapidapi.com/rental-rates?state=${state}&source=airbnb&zip_code=${zip}`
  );
  const data = await res.json();
  console.log("\x1b[36m%s\x1b[0m", "data:", "\n");
  console.log(data["content"]["retnal_rates"]);
  //   No typo - misspelled in API!!
  return data["content"]["retnal_rates"];
};

export { fetchBuildingData, fetchRentalData, normalizeAddress };
