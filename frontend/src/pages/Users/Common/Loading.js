import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography } from "@mui/material";
import nstulogo from "../../images/logo.png";
const Loading = () => {
  return (
    <>
      <LinearProgress />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="99vh"
      >
        <div style={{ textAlign: "center" }}>
          <img src={nstulogo} alt="NSTU" width="80px" />
          <Typography variant="h6" marginBottom="0px" paddingBottom="0px">
            Complain NSTU
          </Typography>
        </div>
      </Box>
    </>
  );
};

export default Loading;
