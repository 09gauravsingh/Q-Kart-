import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  const history = useHistory();
  const [formData, setFormdata] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const [key, value] = [e.target.name, e.target.value];
    setFormdata((nextFormData) => ({ ...nextFormData, [key]: value }));
  };
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    
    if (!validateInput(formData)) return;
    try {
      setLoading(true);
      await axios.post(`${config.endpoint}/auth/register`, {
        username: formData.username,
        password: formData.password,
      });
      setLoading(false);
      setFormdata({
        username: "",
        password: "",
        confirmPassword: "",
      });
      enqueueSnackbar("Registered Successfully", { variant: "success" });

      history.push("/login");
    
    } catch (e) {
      setLoading(false);
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong, check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }

  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic

  /**
   *
   * @returns {boolean}
   *    Whet  her validation hs passed or not
   *  
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {

    if (!data.username) {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    }
    if (data.username.length < 6) {
      enqueueSnackbar("Username must be atleast 6 characters", {
        variant: "warning",
      });
      return false;
    }
    if (!data.password) {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    }
    if (data.password.length < 6) {
      enqueueSnackbar("Password should be atleast more than 6 characters",
        {
          variant: "warning",
        });
      return false;
    }
    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Password do not match", { variant: "warning" });
      return false;
    }
    return true;
    
  };

  
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   */

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={1} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={formData.username}
            onChange={handleInput}
            
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={formData.password}
            onChange={handleInput}
            
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth

            placeholder="Re-enter your password to confirm"
            value={formData.confirmPassword}
            onChange={handleInput}
          />
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress size={25} color="primary" />
            </Box>
          ) : (
            <Button
              className="button"
              variant="contained"
              onClick={() => register(formData)}
            >
              REGISTER NOW
            </Button>
          )}
          
          <p className="secondary-action">
            Already have an account?{" "}
            <Link className="link" to="/login">Login here</Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
