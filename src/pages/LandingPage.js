// import * as React from "react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
// import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
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
import { fetchBuildingData, fetchRentalData } from "../ApiRequests";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function LandingPage() {
  // Hooks
  const [address, setAddress] = useState("29 NE 11th St, Miami, FL 33132");
  const [addressHash, setAddressHash] = useState();
  const [buildingData, setBuildingData] = useState("Result");
  const [rentalData, setRentalData] = useState("");
  const [rentalStatement, setRentalStatement] = useState("");
  //   const [rentalData, setRentalData] = useState("");

  const saveAddress = () => {
    //   Input format
    //   29 NE 11th St, Miami, FL 33132
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

  const getRentalData = async (ad) => {
    const rd = await fetchRentalData(ad);
    setRentalData(rd["four_room_value"]);
    return rd;
  };

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
    // const result = await fetchBuildingData(adHash);
    // console.log("\x1b[36m%s\x1b[0m", "result:", "\n", result);
    // setBuildingData(result);
    const apartmentClass = "studio_value";

    // // Fetch Rental Data
    const rentalResult = await getRentalData(adHash);
    console.log("\x1b[36m%s\x1b[0m", "result:", "\n", rentalResult);
    setRentalData(rentalResult[apartmentClass]);

    //
    determineRevenue(rentalResult, apartmentClass);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* <CameraIcon sx={{ mr: 2 }} /> */}
          <Typography variant="h6" color="inherit" noWrap>
            ABUT
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
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
              paragraph
            >
              [DESCRIPTION]
            </Typography>
            <TextField
              id="outlined-basic"
              label="Your address"
              variant="outlined"
              onChange={(e) => setAddress(e.target.value)}
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
                onClick={() => getRentalData()}
                variant="contained"
              >
                airbnb rapid api
              </Button>
              <Button onClick={() => saveAddress()} variant="contained">
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
        </Box>
        <Box>
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
        </Box>
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
            }}
          >
            <CardMedia
              component="img"
              sx={{
                16: 9,
                height: "300px",
                // pt: "56.25%",
              }}
              image="https://source.unsplash.com/random"
              alt="random"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {address}
              </Typography>
              <Typography>
                You could earn up to {rentalStatement} USD in the first year!
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
