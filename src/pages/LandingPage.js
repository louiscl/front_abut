// import * as React from "react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// added MUI
import TextField from "@mui/material/TextField";
// API
import {
  fetchBuildingData,
  fetchRentalData,
  normalizeAddress,
} from "../ApiRequests";
// image
import Image from "../img/abstract_wave.jpeg";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
  },
};

const theme = createTheme();

export default function LandingPage() {
  // Hooks
  const [address, setAddress] = useState("10 NE 11th St, Miami, FL 33132");
  const [addressHash, setAddressHash] = useState();
  const [buildingData, setBuildingData] = useState("Result");
  const [rentalData, setRentalData] = useState("");
  const [rentalStatement, setRentalStatement] = useState("");
  const [constAddress, setConstAddress] = useState("");

  //   const [rentalData, setRentalData] = useState("");
  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth" });

  const saveAddress = () => {
    //   Input format
    //   29 NE 11th St, Miami, FL 33132
    setConstAddress(address);
    let arr = address.split(",");
    let st = arr[2].split(" ")[1];
    let z = arr[2].split(" ")[2];
    let hash = {
      street: arr[0],
      city: arr[1].replace(/\s/g, ""),
      state: st,
      zip: z,
    };
    setAddressHash(hash);
    console.log(addressHash);
    return hash;
  };

  const convertAddress = () => {
    const ad = constAddress.replace(/,/g, "").replace(/\s/g, "%20");
    return ad;
  };

  const getRentalData = async (ad) => {
    const rd = await fetchRentalData(ad);
    setRentalData(rd["four_room_value"]);
    return rd;
  };

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const determineRevenue = (rentalResult, apartmentClass) => {
    console.log("\x1b[36m%s\x1b[0m", "rentalResult:", "\n", rentalResult);
    console.log("\x1b[36m%s\x1b[0m", "apartmentClass:", "\n", apartmentClass);
    console.log(rentalResult[apartmentClass]);

    const monthlyRent = rentalResult[apartmentClass];
    const targetRent = monthlyRent * 12;

    const price = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(targetRent);
    console.log("\x1b[36m%s\x1b[0m", "price:", "\n", price);
    const statement = price;
    setRentalStatement(statement);
  };

  const searchForAddress = async () => {
    // Convert address
    const adHash = saveAddress();
    console.log(adHash);

    // Fetch Building data
    const result = await fetchBuildingData(address);
    console.log("\x1b[36m%s\x1b[0m", "result:", "\n", result);
    // setBuildingData(result);
    const apartmentClass = "studio_value";
    console.log("reached");

    // // Fetch Rental Data
    const rentalResult = await getRentalData(adHash);
    console.log("\x1b[36m%s\x1b[0m", "result:", "\n", rentalResult);
    setRentalData(rentalResult[apartmentClass]);

    //
    determineRevenue(rentalResult, apartmentClass);
    delay(400).then(() => executeScroll());
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            ABUT
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Paper style={styles.paperContainer}>
        {/* Hero unit */}
        <Box
          sx={{
            // bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container
            maxWidth="sm"
            sx={{
              bgcolor: "background.paper",
              pb: 8,
              borderRadius: 16,
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              ABUT
            </Typography>

            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              sx={{
                mb: 4,
              }}
              paragraph
            >
              Find out how much you could earn by becoming a Tiny House AirBnb
              host
            </Typography>
            <TextField
              id="outlined-basic"
              label="Your address"
              variant="outlined"
              onChange={(e) => setAddress(e.target.value)}
              sx={{
                width: "80%",
              }}
            />
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button onClick={() => searchForAddress()} variant="contained">
                Search for Address
              </Button>
              {/* <Button
                // onClick={() => fetchRentalData(addressHash)}
                onClick={() =>
                  console.log(
                    normalizeAddress("610 SW 24th Rd, Miami, FL 33129")
                  )
                }
                variant="contained"
              >
                API
              </Button> */}
              {/* <Button onClick={() => saveAddress()} variant="contained">
                save address
              </Button>
              <Button
                onClick={() => console.log(rentalData)}
                variant="contained"
              >
                rd
              </Button> */}
              {/* <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
          <div ref={myRef}></div>
        </Box>
        {/* <Box>
          {rentalData == "" ? (
            <></>
          ) : (
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              You could earn up to {rentalStatement} USD in the first year!
            </Typography>
          )}
        </Box> */}
        {rentalData == "" ? (
          <Container
            sx={{
              height: "500px",
            }}
          ></Container>
        ) : (
          <Container
            sx={{
              py: 4,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
            maxWidth="md"
          >
            {/* End hero unit */}
            <Card
              sx={{
                height: "500px",
                width: "400px",
                display: "flex",
                flexDirection: "column",
                borderRadius: 6,
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  16: 9,
                  height: "300px",
                  // pt: "56.25%",
                }}
                // image={`http://3.92.189.123:8000/location/${convertAddress()}`}
                image={`http://3.92.189.123:8000/overlay/${convertAddress()}`}
                alt="random"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {constAddress}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  You could earn up to {rentalStatement} USD in the first year!
                </Typography>
              </CardContent>
            </Card>
          </Container>
        )}
      </Paper>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        {/* <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography> */}
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          (‿ˠ‿)
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
