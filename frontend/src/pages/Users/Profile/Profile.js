import React, { useEffect, useState } from "react";
import Loading from "../Common/Loading";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { auth } from "../../../config";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { toast } from "react-toastify";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [roll, setRoll] = useState("");
  const [mobile, setMobile] = useState("");
  const email = auth.currentUser.email.split("@")[0].match(/(\d{2})(\d{2})$/);
  useEffect(() => {
    setLoading(true);
    checkProfile();
    setLoading(false);
  }, []);

  const checkProfile = async () => {
    const idtoken = await auth?.currentUser?.getIdToken();
    const response = await axios.get("http://localhost:8000/api/user/check", {
      headers: {
        Authorization: `Bearer ${await auth?.currentUser?.getIdToken()}`,
      },
    });
    if (response?.data?.user[0]?.uid === auth.currentUser.uid) {
      setRoll(response?.data?.user[0]?.roll);
      setMobile(response?.data?.user[0]?.mobile);
    }
  };
  const rollReg = /^[a-zA-Z]{3}\d{7}$/;
  const mobileReg = /^(\+88)?01[0-9]{9}$/;
  const handleProfile = async () => {
    if (!rollReg.test(roll) || !mobileReg.test(mobile)) {
      toast.error(
        "Roll type should be ASH2101008M and Mobile type should be +8801800000",
        {
          toastId: "profile",
        }
      );
      return;
    }
    const res = await axios.post(
      "http://localhost:8000/api/user/",
      {
        roll: roll,
        mobile: mobile,
      },
      {
        headers: {
          Authorization: `Bearer ${await auth?.currentUser?.getIdToken()}`,
        },
      }
    );
    if (res.status === 201 || res.status === 200) {
      toast.success("Profile Updated Successfully", {
        toastId: "profile_success",
      });
    } else {
      toast.error("Profile Update Failed", {
        toastId: "profile_failed",
      });
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container maxWidth="md" sx={{ marginBottom: 2 }}>
            <Typography variant="h6" marginY={2} textAlign="left" gutterBottom>
              Profile
            </Typography>
            <form>
              <Box width="100%" sx={{ marginY: 2 }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Name"
                  defaultValue={auth.currentUser.displayName}
                  disabled
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box width="100%" sx={{ marginY: 2 }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Roll"
                  value={roll}
                  placeholder="ASH2101008M"
                  onChange={(e) => setRoll(e.target.value)}
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box width="100%" sx={{ marginY: 2 }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Mobile"
                  value={mobile}
                  placeholder="+8801800000"
                  onChange={(e) => setMobile(e.target.value)}
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box width="100%" sx={{ marginY: 2 }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  defaultValue={auth.currentUser.email}
                  disabled
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box width="100%" sx={{ marginY: 2, textAlign: "right" }}>
                <Button
                  onClick={handleProfile}
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Send
                </Button>
              </Box>
            </form>
          </Container>
        </>
      )}
    </>
  );
}
