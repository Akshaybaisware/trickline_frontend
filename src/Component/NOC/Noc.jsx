import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Divider,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SIGN from "../../Images/advocatesign2.png";
import LOGO from "../../Images/Trickline_circle.svg";
function Noc() {
  const [userDetails, setUserDetails] = useState(null);
  const [email, setEmail] = useState("");
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const urlParts = window.location.pathname.split("/");
    const userId = urlParts[urlParts.length - 1];
    console.log(userId, "userId");

    const getUserDetailsById = async () => {
      try {
        const res = await axios.post(`${apiUrl}/user/getuserbyid`, {
          userId: userId,
        });
        setUserDetails(res.data.User);
      } catch (e) {
        console.log(e);
      }
    };

    getUserDetailsById();

    setTimeout(() => {
      window.print();
    }, 2000);
  }, []);

  const handleGetUserDetails = async () => {
    try {
      const res = await axios.post(`${apiUrl}/user/getuserdetailsbymail`, {
        email: email,
      });
      setUserDetails(res.data.response);
      console.log(res.data.response);
    } catch (e) {
      console.log(e);
    }
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  return (
    <Box
      fontFamily="Arial, sans-serif"
      p="40px"
      backgroundImage="repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 50px, transparent 50px, transparent 100px)"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundColor="#f8f9fa"
      minHeight="100vh"
      color="gray.800"
    >
      {/* Top Heading for NOC */}
      <Heading
        as="h2"
        size="xl"
        textAlign="center"
        color="blue.700"
        mb="40px"
        fontWeight="bold"
      >
        No Objection Certificate (NOC)
      </Heading>

      <Divider borderColor="blue.500" />

      <Stack spacing={6} fontSize="lg" mt="40px">
        <Text fontSize="1rem">
          <strong>Complainant Name:</strong> {userDetails?.name}
        </Text>
        <Text fontSize="1rem">
          <strong>Date of Issue:</strong> {formattedDate}
        </Text>
        <Text fontSize="1rem">
          <strong>Address:</strong> {userDetails?.address}
        </Text>
        <Text fontSize="1rem">
          This document certifies that there is no objection from Trickline
          Enterprises regarding the actions or conduct described herein. Kindly
          ensure adherence to all legal and administrative guidelines.
        </Text>
      </Stack>

      <Divider my="40px" borderColor="blue.500" />

      <Flex
        justifyContent="space-between"
        mt="40px"
        fontSize="md"
        borderTop="1px solid #000"
        pt="20px"
      >
        {/* <Text color="gray.600" textAlign="right">
          Seal/Stamp
        </Text> */}
        <Image src={LOGO} alt="Stamp" />
        <Image src={SIGN} alt="Stamp" />
      </Flex>
    </Box>
  );
}

export default Noc;
