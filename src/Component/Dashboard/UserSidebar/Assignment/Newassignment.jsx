import React, { useEffect, useState, useRef } from "react";
import {
  useToast,
  Box,
  Flex,
  Text,
  Input,
  Button,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import { BiRefresh } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import ChatBot from "react-simple-chatbot";
// import { Segment } from "semantic-ui-react";
import styled, { keyframes } from "styled-components";
// import "semantic-ui-css/semantic.min.css";
import "./contentvalidation.css";
import { ContactsOutlined } from "@mui/icons-material";
// import ChatbotImage from "../assets/chatbot.webp"; // Replace with the correct path to your image
// import image from "../assets/chatbot.webp";
// Define the blinking keyframes for the logo
// import chatbotimage from "../../assets/chatbot.webp";
const blink = keyframes`
  50% {
    opacity: 0;
  }
`;

// Create a styled component for the blinking logo
const BlinkingImage = styled.img`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  animation: ${blink} 1s step-end infinite;
`;

const BlinkingLogo = ({ onClick }) => {
  return (
    <BlinkingImage
      src={chatbotimage} // Example logo
      alt="Chatbot"
      onClick={onClick}
    />
  );
};

function ContentValidationfrom() {
  const toast = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const userId = localStorage.getItem("userId");
  const token = sessionStorage.getItem("token"); // Replace 'token' with your actual cookie name
  console.log(token, "dasdasd");
  let userID;
  // Check if token exists
  if (token) {
    // Parse the token if it's a JSON object or JWT
    const parsedToken = JSON.parse(token);
    userID = parsedToken._id;
    console.log(userID, "1234456");
  } else {
    console.log("Token not found");
  }

  const [apidata, setapidata] = useState();
  const [randomIndex, setRandomIndex] = useState(null); // State to store the random index
  const [submittedAssignmentCount, setSubmittedAssignmentCount] = useState();
  const name = useRef();
  const mobile = useRef();
  const address = useRef();
  const annualRevenue = useRef();
  const jobFunctional = useRef();
  const pinCode = useRef();
  const [userdata, setUserData] = useState();

  const refreshAssignment = async () => {
    try {
      await getdatafrom(); // Fetch new assignment data
      setRandomIndex(Math.floor(Math.random() * 510)); // Set new random index
    } catch (error) {
      console.log(error);
    }
  };

  const getdatafrom = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/assignment/getallassignments`
      );
      console.log(response, "res");
      setapidata(response?.data?.assignments);
      setRandomIndex(Math.floor(Math.random() * 520));

      console.log(randomIndex, "randomIndex");
    } catch (error) {
      toast({
        title: "Error ",
        // description: "Error",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      console.log(error.message);
    }
  };

  const getUserdetails = async () => {
    try {
      // console.log(useremail, "ingetuser");
      const userdetails = await axios.post(`${apiUrl}/user/getuserbyid`, {
        userId: userID,
      });
      console.log(userdetails, "userdetails");
      setUserData(userdetails.data.User);
      setSubmittedAssignmentCount(
        userdetails?.data?.User?.submittedAssignmentCount
      );
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async () => {
    try {
      const response = await axios.post(`${apiUrl}/assignment/addassignment`, {
        userId: userID,
      });
      console.log(response, "mkninmiopn");
      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Form submitted successfully",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        refreshAssignment();
        navigate("/assignment");
        // Refresh the assignment data after submission
      }
    } catch (error) {
      toast({
        title: "Error ",
        description: `error: ${error.message}`,
        status: "error",
        duration: 10000,
        position: "top",
        isClosable: true,
      });
      console.log(error.message);
    }
  };

  // Fetch data on component mount and update every 10 minutes

  const showQc = () => {
    if (userdata?.submittedAssignmentCount == 540) {
      navigate(
        "/qccheck"
        //    {
        //   state: response.data
        // }
      );
    }
  };

  useEffect(() => {
    getdatafrom();
    getUserdetails();
    showQc();
  }, []);

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Whisper&display=swap')
      </style>

      {/* <Flex
        mt={["3rem", "5rem"]}
        justifyContent={"center"}
        gap={"2rem"}
        flexDirection={["column", "column"]}
        className="content"
      >
        <Box>
          <Grid
            templateColumns="repeat(3, 1fr)" // Three columns layout for the first row
            gap={4} // Spacing between items
          >

            <GridItem>
              <Text fontSize="1.5rem">
                {submittedAssignmentCount}/ {apidata?.length}
              </Text>
            </GridItem>
          </Grid>
        </Box>
        <Box
          marginLeft={["-1rem", "10rem"]}
          justifyContent={"center"}
          p="3"
          maxW="600px"
        >

          <Flex fontFamily="'Dancing Script', cursive" direction="column" p={4}>
            <Grid
              templateColumns="repeat(3, 1fr)" // Three columns layout for the first row
              gap={4} // Spacing between items
            >

              <GridItem>
                <Text fontSize="1.5rem">
                  {apidata?.[randomIndex]?.firstname}
                </Text>
              </GridItem>
              <GridItem>
                <Text fontSize="1.5rem">
                  {apidata?.[randomIndex]?.lastname}
                </Text>
              </GridItem>

              <GridItem>
                <Text fontSize="1.5rem">{apidata?.[randomIndex]?.email}</Text>
              </GridItem>

              <GridItem>
                <Text fontSize="1.5rem">
                  {apidata?.[randomIndex]?.phonenumber}
                </Text>
              </GridItem>

              <GridItem>
                <Text fontSize="1.5rem">
                  {apidata?.[randomIndex]?.licencenumber}
                </Text>
              </GridItem>

              <GridItem>
                <Text fontSize="1.5rem">{apidata?.[randomIndex]?.ip}</Text>
              </GridItem>


              <GridItem colSpan={3}>
                <Text fontSize="1.5rem">{apidata?.[randomIndex]?.zipcode}</Text>
              </GridItem>
            </Grid>
          </Flex>
        </Box>

        <Box
          border="2px solid green"
          marginLeft={["0rem", "10rem"]}
          p="4"
          maxW="1000px"
        >
          <Flex
            fontFamily="'Dancing Script', cursive" // Set the input font family
            width={["330px", "600px"]}
            direction="column"
          >
            <Text>Name:</Text>
            <Input
              fontFamily="'Dancing Script', cursive" // Set the input font family
              ref={name}
            />
            <Text>Mobile:</Text>
            <Input
              fontFamily="'Dancing Script', cursive" // Set the input font family
              ref={mobile}
            />
            <Text>Email:</Text>
            <Input
              fontFamily="'Dancing Script', cursive" // Set the input font family
              ref={address}
            />
            <Text>Annual Revenue:</Text>
            <Input
              fontFamily="'Dancing Script', cursive" // Set the input font family
              ref={annualRevenue}
            />
            <Text>Address:</Text>
            <Input
              fontFamily="'Dancing Script', cursive" // Set the input font family
              ref={jobFunctional}
            />
            <Text>IP:</Text>
            <Input
              fontFamily="'Dancing Script', cursive" // Set the input font family
              ref={pinCode}
            />

            <Button
              mt={"1rem"}
              mb={"1rem"}
              onClick={submitForm}
              color={"white"}
              bg="green" // Change to the desired color scheme
            >
              Submit
            </Button>
          </Flex>
        </Box>
      </Flex> */}
      <Box
      mt={"1rem"}
       fontFamily="'Dancing Script', cursive"
       className="content">
        <Flex

          justify="center" // Center horizontally
          align="center" // Center vertically
          // height="100vh"   // Full height to demonstrate vertical centering
        >
          <Box>
            <Center>
              <Button
              color={"white"}
              bg={"#4b7f6a"}>
                {submittedAssignmentCount}/ {apidata?.length}
              </Button>
            </Center>
          </Box>
        </Flex>
        <Box
        mt={"1rem"}
        border={"1px solid #33ffad"}>
        <Box

// fontWeight={"700"}
        width={"100%"} fontSize={"1.3rem"}>
          {apidata?.[randomIndex]?.firstname} {apidata?.[randomIndex]?.lastname}{" "}
          {apidata?.[randomIndex]?.email}
        </Box >
        <Box
      fontWeight={"700"}
        mt={"1rem"}
        width={"100%"} fontSize={"0.9rem"}>
         <Box fontWeight={"700"}>
          {apidata?.[randomIndex]?.phonenumber}{""}   {apidata?.[randomIndex]?.zipcode} {apidata?.[randomIndex]?.ip}
          </Box>
        </Box>
        <Box
       fontWeight="700"
          mt={"1.1rem"}
        width={"100%"} fontSize={"0.9rem"}>
          <Box fontWeight={"700"}>
        {apidata?.[randomIndex]?.licencenumber}
        </Box>
        </Box>
        </Box>
        <Text
        fontWeight={"700"}
        fontFamily="sans-serif" mt={"1rem"} mb={"1rem"}>
          Fill Your Assignment Here
        </Text>
        <Text mt={"0.5rem"} fontFamily="sans-serif">First Name:</Text>
            <Input
              fontFamily="'Dancing Script', cursive" // Set the input font family
              ref={name}
            />
            <Text mt={"0.5rem"} fontFamily="sans-serif">Last Name:</Text>
            <Input
              fontFamily="'Dancing Script', cursive" // Set the input font family
              ref={mobile}
            />
            <Text mt={"0.5rem"} fontFamily="sans-serif">Email:</Text>
            <Input
              fontFamily="'Dancing Script', cursive" // Set the input font family
              ref={address}
            />
             <Text mt={"0.5rem"} fontFamily="sans-serif">Mobile:</Text>
            <Input
              fontFamily="'Dancing Script', cursive" // Set the input font family
              ref={annualRevenue}
            />
           <Text mt={"0.5rem"} fontFamily="sans-serif">Zipcode:</Text>
            <Input
              fontFamily="'Dancing Script', cursive" // Set the input font family
              ref={jobFunctional}
            />
              <Text mt={"0.5rem"} fontFamily="sans-serif">IP:</Text>
            <Input
              fontFamily="'Dancing Script', cursive" // Set the input font family
              ref={jobFunctional}
            />
          <Text mt={"0.5rem"} fontFamily="sans-serif">LICENSE:</Text>
            <Input
              fontFamily="'Dancing Script', cursive" // Set the input font family
              ref={pinCode}
            />

<Button
 fontFamily="sans-serif"
              mt={"1rem"}
              mb={"1rem"}
              onClick={submitForm}
              color={"white"}
              bg="blue " // Change to the desired color scheme
            >
              Submit
            </Button>
      </Box>
    </>
  );
}

export default ContentValidationfrom;
