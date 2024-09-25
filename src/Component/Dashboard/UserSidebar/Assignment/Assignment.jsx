import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
const Assignment = () => {
  // for data
  const [data, setData] = useState();
  const [useinfo, setUserInfo] = useState();
  //  for fetch total assingment details in Dashboard
  const apiUrl = import.meta.env.VITE_APP_API_URL;

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
  const getUserdetails = async () => {
    try {
      // console.log(useremail, "ingetuser");
      const userdetails = await axios.post(`${apiUrl}/user/getuserbyid`, {
        userId: userID,
      });
      console.log(userdetails, "userdetails");
      setUserInfo(userdetails.data.User);
    } catch (error) {
      console.log(error);
    }
  }; // fetchDetails of assingment
  const fetchDetails = async () => {
    try {
      const id = sessionStorage.getItem("id");

      if (!id) {
        console.error("User ID is missing in sessionStorage");
        return;
      }

      const apiUrl = import.meta.env.VITE_APP_API_URL;
      const response = await axios.get(
        `${apiUrl}/user/get_totalAssignment/${id}`
      );
      const data = response.data;
      console.log(data);
      setData(data);
      // console.log(data?.total);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    // fetchDetails();
    getUserdetails();
  }, []);
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="center"
      gap={4}
    >
      {/* Total Assingment */}
      <Flex textAlign="center" width={{ base: "100%", md: "auto" }}>
        <Box
          backgroundColor="#ffe6ff"
          border="#ebe9eb"
          margin="20px"
          padding="40px"
          fontWeight="800"
          borderRadius="10px"
          width="150px"
          height="150px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          ml={{ base: "6rem" }}
        >
          <span
            style={{
              marginTop: "5px",
              marginBottom: "5px",
              height: "10px",
              fontSize: "20px",
              marginRight: "0%",
            }}
          >
            {data?.total}
          </span>
          <p
            style={{
              color: "gray",
              fontWeight: "600",
              flexDirection: "row",
              marginLeft: "0px",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Total Assingment {useinfo?.totalAssignmentLimit}
          </p>
        </Box>
      </Flex>

      {/* Submitted Assingment */}
      <Flex textAlign="center" width={{ base: "100%", md: "auto" }}>
        <Box
          backgroundColor="#EBE9EB"
          border="#ebe9eb"
          margin="20px"
          padding="40px"
          fontWeight="800"
          borderRadius="10px"
          width="150px"
          height="150px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          ml={{ base: "6rem" }}
        >
          <span
            style={{
              marginTop: "5px",
              marginBottom: "5px",
              height: "10px",
              fontSize: "20px",
              marginRight: "0%",
            }}
          >
            {data?.submitted}
          </span>
          <p
            style={{
              color: "gray",
              fontWeight: "600",
              flexDirection: "row",
              marginLeft: "0px",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Submitted Assingment {useinfo?.submittedAssignmentCount}
          </p>
        </Box>
      </Flex>

      {/* Pending Assingment */}
      <Flex textAlign="center" width={{ base: "100%", md: "auto" }}>
        <Box
          backgroundColor="#e6ffe6"
          border="#ebe9eb"
          margin="20px"
          padding="40px"
          fontWeight="800"
          borderRadius="10px"
          width="150px"
          height="150px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          ml={{ base: "6rem" }}
        >
          <span
            style={{
              marginTop: "5px",
              marginBottom: "5px",
              height: "10px",
              fontSize: "20px",
              marginRight: "0%",
            }}
          >
            {data?.pending}
          </span>
          <p
            style={{
              color: "gray",
              fontWeight: "600",
              flexDirection: "row",
              marginLeft: "0px",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Pending Assingment {useinfo?.pendingAssignmentCount}
          </p>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Assignment;
