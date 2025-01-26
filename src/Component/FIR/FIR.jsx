import React, { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Box, Heading, Text, List, ListItem, Image } from "@chakra-ui/react";
 
import Map from "../../Images/india-map-.webp"


const FIR = ({ onPDFGenerated, rowData }) => {
  const pdfRef = useRef();
  console.log(onPDFGenerated, "fir pdf");
  const countref = useRef(0);
  console.log(rowData, "fir pdf");
  const [userData, setUserData] = useState();

  useEffect(() => {
    // Automatically generate the PDF when the component is rendered
    setUserData(rowData);
    if (countref.current === 0) {
      const input = pdfRef.current;
      console.log("fir pdf");

      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("FIR_Copy.pdf");

        // Notify parent that the PDF has been generated
        if (onPDFGenerated) {
          onPDFGenerated();
        }
      });
      countref.current = 1;
    }
  }, [onPDFGenerated]);

  return (
    // <div
    //   ref={pdfRef}
    //   style={{
    //     position: "relative",
    //     width: "210mm",
    //     height: "297mm",
    //     padding: "20px",
    //     background: "white",
    //   }}
    // >
    //   {/* Background image */}
    //   <img
    //     src={""} // Replace with your background image path
    //     alt="FIR Template"
    //     style={{
    //       position: "absolute",
    //       width: "100%",
    //       height: "100%",
    //       top: 0,
    //       left: 0,
    //       zIndex: -1,
    //     }}
    //   />
    //   <div style={{ padding: "30px" }}>
    //     <h2 style={{ textAlign: "center", color: "red" }}>F.I.R</h2>
    //     <p>To,</p>
    //     <p>
    //       <strong>Mr./Ms./Mrs. {userData?.name}:</strong> I. BHAVYA
    //     </p>
    //     <p>
    //       Kindly note the details are being sent at Mumbai District Court for
    //       further legal proceedings. You need to be present on:
    //       <strong> 2025-01-13</strong>
    //     </p>
    //     <p>
    //       Challan Amount: <strong>78,980 INR</strong>
    //     </p>
    //     <p>
    //       FIR Number: <strong>AG56287987</strong>
    //     </p>
    //     <p>
    //       Approval Status: <strong>Pending by District Court</strong>
    //     </p>
    //     <p>
    //       Case Type: <strong>Breach of Agreement</strong>
    //     </p>
    //     <p>MH2547/2016</p>
    //     <p style={{ textAlign: "right" }}>
    //       <strong>Authorized Signature</strong>
    //     </p>
    //   </div>
    // </div>
  
<Box
    position="relative"
    width="210mm"
    height="297mm"
    padding="30px"
    background="white"
    border="2px solid black"
    boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
    fontFamily="Arial, sans-serif"
    overflow="hidden"
  >
    {/* Background Map */}
      {/* <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex="-1"
        opacity="0.05"
      >
        <Image
          src={Map}
          alt="Indian Map showingi ghjbkl;lkjghjklhjklkjhgjkl;kjhkl;kjhkl;kjhg"
          objectFit="cover"
          width="100%"
          height="100%"
          opacity="0.2"
        />
      </Box> */}

    {/* Header */}
    <Box textAlign="center" marginBottom="20px">
      <Text
        fontSize="26px"
        fontWeight="bold"
        color="red.600"
        textDecoration="underline"
        marginBottom="10px"
      >
        FIRST INFORMATION REPORT
      </Text>
      <Text fontSize="14px" fontWeight="bold">Mumbai District Court</Text>
      <Text fontSize="12px" fontStyle="italic" color="gray.600">
        (Under Section 154 of the Indian Penal Code)
      </Text>
    </Box>

    {/* Content */}
    <Box color="#000" lineHeight="1.6" fontSize="14px">
      <Text>
        <strong>To,</strong>
      </Text>
      <Text>
        <strong>Mr./Ms./Mrs. I. BHAVYA</strong>
      </Text>
      <Text>
        This is to inform you that the details mentioned below are being forwarded to the{" "}
        <strong> Mumbai District Court </strong> for further legal proceedings.
      </Text>
      <Text>
        You are required to appear before the court on: <strong>13th January 2025</strong>
      </Text>
      <Text marginTop="15px" fontWeight="bold">
        <strong>Details:</strong>
      </Text>
      <Box as="ul" listStyleType="none" padding="0">
        <Box as="li">Challan Amount: <strong>78,980 INR</strong></Box>
        <Box as="li">FIR Number: <strong>AG56287987</strong></Box>
        <Box as="li">Approval Status: <strong>Pending by District Court</strong></Box>
        <Box as="li">Case Type: <strong>Breach of Agreement</strong></Box>
        <Box as="li">Reference Code: <strong>MH2547/2016</strong></Box>
      </Box>
      <Text marginTop="20px">
        Please ensure your presence and bring all relevant documents as required.
      </Text>
    </Box>

    {/* Advocate Stamp */}
    <Box
      position="absolute"
      top="220px"
      right="20px"
      width="100px"
      height="100px"
      borderRadius="50%"
      border="3px solid red"
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontSize="12px"
      fontWeight="bold"
      color="red.500"
      bg="rgba(255, 0, 0, 0.1)"
      zIndex="1"
    >
      Advocate Stamp
    </Box>

    {/* Footer */}
    <Box textAlign="right" marginTop="30px" fontSize="14px" fontWeight="bold">
      <Text>Authorized Signature</Text>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Example_Signature.png"
        alt="Signature"
        width="120px"
        height="50px"
        marginTop="10px"
      />
    </Box>

    {/* Footer Note */}
    <Box
      textAlign="center"
      marginTop="30px"
      fontSize="12px"
      color="#555"
    >
      This is a system-generated document and does not require a physical signature.
    </Box>
  </Box>

  );
};

export default FIR;
