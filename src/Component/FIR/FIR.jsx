import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Stack,
  Divider,
  Flex,
} from "@chakra-ui/react";

// Import the sample images
import policeHQImage from "../../Images/jodhpur police stamp.jpg";
import map from "../../Images/indianmapyellow.webp";
import satyamev from "../../Images/satyamev jayate.jpg";
import advocte from "../../Images/advocatestamp.png";
import advocatesign from "../../Images/advocatesign2.png";
import { useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function FIR() {
  const [userDetails, setUserdetails] = useState();
  useEffect(() => {
    setTimeout(() => {
      window.print();
    }, 2000);
  }, []);
  const userEmail = useLocation().state.email;

  const handleGetUserDetails = async () => {
    try {
      console.log(userEmail);
      const res = await axios.post(`${apiUrl}/user/getuserdetailsbymail`, {
        email: userEmail,
      });
      setUserdetails(res.data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetUserDetails();
  }, []);
  return (
    <Box
      fontFamily="Arial, sans-serif"
      p="40px"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      minHeight="100vh"
    >
      {/* Horizontal Satyamev Jayate */}
      <Heading
        as="h2"
        size="lg"
        textAlign="center"
        color="purple.700"
        mb="20px"
        borderBottom="1px solid black"
      >
        सत्यमेव जयते
      </Heading>

      {/* Top Bar with Flex layout for Police HQ Image */}
      <Flex justify="center" align="center" mb="40px">
        <Image
          src={policeHQImage}
          alt="Police Headquarters"
          boxSize="120px"
          objectFit="contain"
        />
      </Flex>

      <Divider />

      <Heading color={"red"} size="1.5rem" textAlign="center" mb="20px">
        First Information Report (FIR)
      </Heading>
      <Text textAlign="center" fontSize="0.9rem" fontWeight="bold" mb="30px">
        Breach of Agreement - Contract Violation
      </Text>

      <Stack spacing={6} fontSize="lg">
        <Text fontSize={"0.9rem"}>
          <strong>Complainant Name:</strong> {userDetails?.name}
        </Text>
        <Text fontSize={"0.9rem"}>
          <strong>Complaint Date:</strong> {Date.now()}
        </Text>
        <Text fontSize={"0.9rem"}>
          <strong>Email:</strong> {userDetails?.email}
        </Text>
        <Text fontSize={"0.9rem"}>
          <strong>Address:</strong> {userDetails?.address}
        </Text>
        <Text fontSize={"0.8rem"}>
          This Is a Letter Including Your Details on Behalf Of{" "}
          <Text as="span" color="red.500">
            Trickline Enterprises
          </Text>
          . Kindly Note the Details And Make Arrangement For Your Legal
          Proceedings. Kindly Note The Details Given Details Are Being Sent At
          Delhi Consumer Court For Further Legal Proceedings And You Need To Be
          Present On Delhi Consumer Court And The Case Is To Be Filled Under ICA
          Section 73,74 With The Challan Amount Of{" "}
          <Text as="span" color="red.500">
            78,980/- INR
          </Text>
          .
        </Text>
        <Text>
          <strong>Case Type:</strong>{" "}
          <Text as="span" color="red.500">
            Breach of Agreement
          </Text>
        </Text>

        <Text>
          <strong>F.I.R Number:</strong>{" "}
          <Text as="span" color="red.500">
            AG562/87987
          </Text>
        </Text>
        <Text>
          <strong>Approval Status:</strong>{" "}
          <Text as="span" color="red.500">
            Pending By District Court
          </Text>
        </Text>
      </Stack>

      <Divider my="30px" />

      <Heading as="h3" size="lg" textAlign="center" mb="20px" color="red">
        शांति सेवा न्याय
      </Heading>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        mt="40px"
        textAlign="center"
        fontSize="sm"
        borderTop="1px solid #000"
        pt="20px"
      >
        <Image
          src={advocte}
          alt="Police Headquarters"
          boxSize="120px"
          objectFit="contain"
          borderRadius="100%"
          border="2px solid"
          borderColor="purple.500"
        />
        <Image src={advocatesign} alt="Police Headquarters" boxSize="150px" />
      </Box>
    </Box>
  );
}

export default FIR;
