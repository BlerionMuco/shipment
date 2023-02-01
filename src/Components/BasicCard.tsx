import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IBasicCard } from "../Model/BasicCardModel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import "./style/CardStyle.css";

export default function BasicCard({ shipment }: IBasicCard) {
  return (
    <Card className="card">
      <CardContent>
        <div className="card-content">
          <LocalShippingIcon />
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Company: {shipment.companyName}
          </Typography>
        </div>

        <Typography variant="h6" component="div">
          Area: {shipment.areaId}
        </Typography>
      </CardContent>
    </Card>
  );
}
