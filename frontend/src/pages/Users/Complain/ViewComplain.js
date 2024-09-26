import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
  Container,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Header from "../Header/Header";
import { auth } from "../../../config";
import { complainStatus, formatedDate } from "../Common/Common";
import Loading from "../Common/Loading";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dangerous } from "@mui/icons-material";
import { toast } from "react-toastify";

export default function ViewComplain() {
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(true);
  const c_id = useParams().c_id;
  useEffect(() => {
    setLoading(true);
    fetchComplains();
    setLoading(false);
    console.log(complains);
  }, []);

  const navigate = useNavigate();

  const fetchComplains = async () => {
    const idtoken = await auth?.currentUser?.getIdToken();
    const response = await fetch(
      `http://localhost:8000/api/complain/detail/${c_id}`,
      {
        headers: {
          Authorization: `Bearer ${idtoken}`,
        },
      }
    );
    if (response.status !== 200) {
      toast.error("Complain not found", {
        toastId: "complain",
      });
      navigate("/");
    }
    const data = await response.json();
    setComplains(data.complains);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container maxWidth="md" sx={{ marginBottom: 2 }}>
            <Typography variant="h6" marginY={2} textAlign="left" gutterBottom>
              Your Complains
            </Typography>
            <Grid container spacing={2}>
              {complains?.length > 0 &&
                complains.map((complain) => (
                  <Grid item size={12}>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Typography
                            textAlign="left"
                            sx={{ color: "text.secondary", fontSize: "12px" }}
                          >
                            {formatedDate(complain.created_at)}
                          </Typography>
                          <Typography
                            textAlign="center"
                            sx={{
                              fontSize: "12px",
                              color: "white",
                              paddingX: "4px",
                            }}
                            backgroundColor={complainStatus(complain.status)}
                          >
                            {complain.status}
                          </Typography>
                        </Box>
                        <Typography variant="body2" textAlign="left">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: complain.details,
                            }}
                          ></div>
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          textAlign="left"
                          marginTop={2}
                        >
                          {complain?.docs && "Documents attached"}
                        </Typography>
                        {complain?.docs?.split(",").map((doc, id) => (
                          <Typography
                            variant="overline"
                            to={`http://localhost:8000/src/upload/complains/${doc}`}
                            target="_blank"
                            component={Link}
                            sx={{ display: "block" }}
                          >
                            {id + 1}.{doc.substr(0, 10)}...{doc.substr(-6)}
                          </Typography>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}
