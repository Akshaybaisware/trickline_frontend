

import React, { useState } from "react";
import logo from "../../Images/logo.svg";
import { NavLink } from "react-router-dom";
import { Box, Button, Image } from "@chakra-ui/react";
// Admin Login

const Login = () => {
  return (
    <>
    <Box
    bg={"#0F0623"}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh" // Center content vertically on the page
    >
      <Box p={4} borderRadius="md">
        {/* Adjusted the Image component */}
        <Image width={"23rem"} height="auto" src={logo} alt="Logo Image" />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        maxWidth="400px" // Set a maximum width for responsiveness
        width="100%" // Take up full width on smaller screens
      >
        <NavLink to="/admin" style={{ textDecoration: "none", width: "100%" }}>
          <Button
            height={"3rem"}
            width="100%"
            borderRadius="25px"
            border="2px solid black"
            color="#47108f"
            background="gray"
            fontWeight={700}
            fontFamily='"Poppins", sans-serif'
            mt="20px"
            _hover={{ background: "FloralWhite", color: "black" }}
          >
            Login as Admin
          </Button>
        </NavLink>
        <NavLink
          to="/userlogin"
          style={{ textDecoration: "none", width: "100%" }}
        >
          <Button
            height={"3rem"}
            width="100%"
            borderRadius="25px"
            border="2px solid black"
             color="#47108f"
            background="gray"
            fontWeight={700}
            fontFamily='"Poppins", sans-serif'
            mt="20px"
            _hover={{ background: "FloralWhite", color: "black" }}
          >
            Login as User
          </Button>
        </NavLink>
      </Box>
      
    <Box
    width={'400px'}
    display={"flex"}
    justifyContent={"flex-end"}
    fontWeight={"700"}
    color={"#901810"}
    marginTop={"1rem"}
    textAlign={"right"}
  >
    
  </Box>
    </Box>
  </>
  );
};

export default Login;
