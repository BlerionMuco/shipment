import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const MuiSkeleton = () => {
  return (
    <div className="home-skeleton">
      <Box sx={{ width: 450 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    </div>
  );
};

export default MuiSkeleton;
