import React, { useState } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ImageCard = ({ url, constAddress, rentalStatement }) => {
  return (
    <Container
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
      maxWidth="md"
    >
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
          }}
          image={url}
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
  );
};

export default ImageCard;
