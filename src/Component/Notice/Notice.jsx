import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  Flex,
  Image,
  Divider,
  Stack,
  Center,
} from "@chakra-ui/react";
import stampImage from "../../Images/jodhpurnoc.jpg"; // Adjust the image path accordingly
import nocstamp from "../../Images/nocsignature.png";
import axios from "axios";

function Notice() {
  const [userDetails, setUserDetails] = useState(null);
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

  console.log(userDetails, "userdetails");
  return (
    <Box fontFamily="Arial, sans-serif" p="40px" lineHeight="1.8">
      {/* Top Header with Image */}
      <Flex justify="space-between" mb="20px" alignItems="center">
        {/* Left Section */}
        <Box>
          <Text fontSize={"0.7rem"} fontWeight="bold">
            FAX: 4445736
          </Text>
          <Text fontSize={"0.7rem"} fontWeight="bold">
            Shivnath Apartment, Plot Number
          </Text>
          <Text fontSize={"0.7rem"} fontWeight="bold">
            Postmaster Post Office, Jodhpur,{" "}
          </Text>
          <Text fontSize={"0.7rem"} fontWeight="bold">
            Rajasthan - 342001
          </Text>
          <Text fontSize={"0.7rem"} fontWeight="bold">
            Phone: +91-987654###
          </Text>
          <Text fontSize={"0.7rem"} fontWeight="bold">
            Email: info@trickline.com
          </Text>
        </Box>

        {/* Right Section (Stamp) */}
        <Image
          src={stampImage}
          alt="Official Stamp"
          boxSize="120px"
          objectFit="contain"
        />
      </Flex>

      <Divider borderColor="gray.700" my="20px" />

      {/* Notice Title */}
      <Center color={"red"} fontSize={"0.8rem"}>
        {" "}
        Notice for Breach of Agreement / अनुबंध उल्लंघन के लिए नोटिस
      </Center>

      {/* Content in English */}
      <Text fontSize={"0.7rem"} mb="20px">
        Dear {userDetails?.name},
        <br />
        <Text mb="20px">Address {userDetails?.address},</Text>
        <Text mb="20px"> Amount {userDetails?.novcAmount}</Text>
        <Text mb="20px"> Date {userDetails?.nocDate?.slice(0, 10)}</Text>
        This is a formal notice regarding a breach of agreement between you and{" "}
        <Text as="span" color="red.500">
          Trickline Enterprises
        </Text>
        . According to the terms and conditions agreed upon on [Agreement Date],
        it was expected that [mention specific terms breached, e.g., delivery of
        goods, payment timelines, etc.]. However, there has been a failure in
        adhering to these terms.
        <br />
        You are hereby required to resolve the matter by [Resolution Date] and
        pay a penalty amount of{" "}
        <Text as="span" color="red.500">
          ₹{userDetails?.novcAmount}/- INR
        </Text>
        . Failure to comply will result in legal proceedings at the Delhi
        Consumer Court under ICA Section 73 and 74.
      </Text>

      {/* Content in Hindi */}
      <Text fontSize={"0.8rem"}>
        आदरणीय [प्राप्तकर्ता का नाम],
        <br />
        यह सूचना आपके और{" "}
        <Text as="span" color="red.500">
          ट्रिकलाइन एंटरप्राइजेज
        </Text>{" "}
        के बीच अनुबंध उल्लंघन के संबंध में है। [अनुबंध तिथि] को सहमति के अनुसार
        यह अपेक्षित था कि [उल्लंघित शर्तों का उल्लेख करें, जैसे वस्तुओं की
        डिलीवरी, भुगतान समयसीमा आदि]। लेकिन इन शर्तों का पालन नहीं किया गया है।
        <br />
        आपको इस मामले को [समाधान तिथि] तक हल करने और{" "}
        <Text as="span" color="red.500">
          ₹{userDetails?.novcAmount}/- INR
        </Text>{" "}
        का जुर्माना अदा करने का निर्देश दिया जाता है। अनुपालन न करने की स्थिति
        में दिल्ली उपभोक्ता न्यायालय में ICA धारा 73 और 74 के तहत कानूनी
        कार्यवाही शुरू की जाएगी।
      </Text>

      <Divider borderColor="gray.700" my="20px" />

      {/* Cancellation Charges */}
      <Box mt="30px">
        <Text fontSize={"0.9rem"}>Notice Cancellation Charges:-</Text>
        <Text fontSize={"0.8rem"} color="red.500" mb="20px">
          If this notice is canceled before the legal proceedings are initiated,
          a cancellation fee of ₹22,479 will be applied. Please ensure that all
          actions are completed within the given time frame to avoid additional
          charges.
        </Text>
      </Box>
      <Text fontSize={"0.8rem"} fontWeight="400" color="black" mb="20px">
        You will get your notice in 32 hr at ur nearaest police station if you
        didnt pay the outstanding amount
      </Text>

      {/* Additional Sections */}
      <Box mt="20px">
        <Text fontSize={"0.9rem"}>Case Details</Text>
        <Stack spacing={4}>
          <Text fontSize={"0.7rem"} color="red.500">
            {" "}
            <strong>Company Name:</strong> Trickline Enterprises
          </Text>
          <Text fontSize={"0.7rem"} color="red.500">
            <strong>Case No:</strong> R/562879
          </Text>
          <Text fontSize={"0.7rem"} color="red.500">
            <strong>Case Type:</strong> Breach of Agreement
          </Text>
          <Text fontSize={"0.7rem"} color="red.500">
            <strong>Case Status:</strong> Pending
          </Text>
          <Text fontSize={"0.7rem"} color="red.500">
            <strong>Case Register:</strong> Delhi Consumer Court
          </Text>
        </Stack>
      </Box>

      {/* Note */}
      <Box mt="30px">
        <Text fontSize={"1rem"}>Note</Text>
        <Text fontSize={"0.8rem"} mb="20px">
          Kindly treat this matter as urgent. Non-compliance will result in
          further legal action.
        </Text>
      </Box>
      <Divider borderColor="gray.700" my="20px" />
      <Flex justify="flex-end">
        <Image
          mt={"-2rem"}
          src={nocstamp}
          alt="Official Stamp"
          boxSize="200px"
          objectFit="contain"
          backgroundColor="transparent" // Ensures the image has no background color
        />
      </Flex>
    </Box>
  );
}

export default Notice;
