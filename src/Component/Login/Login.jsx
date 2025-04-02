

// import React from "react";
// import logo from "../../Images/TRICKLINE_2.png";
// import { NavLink } from "react-router-dom";
// import { Box, Button, Image, keyframes } from "@chakra-ui/react";

// // Define keyframes for animations
// const float = keyframes`
//   0% { transform: translateY(0); }
//   50% { transform: translateY(-10px); }
//   100% { transform: translateY(0); }
// `;

// const fadeIn = keyframes`
//   0% { opacity: 0; }
//   100% { opacity: 1; }
// `;

// const bgAnimation = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// const Login = () => {
//   return (
//     <>
//       <Box
//         // bg="linear-gradient(135deg, #333, #444, #555, #666)"
//         bg={"#96436B  "}
//         bgSize="200% 200%"
//         animation={`${bgAnimation} 10s ease infinite`}
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         height="100vh"
//       >
//         {/* Floating logo with rounded corners */}
//         <Box
//           p={4}
//           borderRadius="25%"
//           bg="gray.200"
//           display="inline-flex"
//           animation={`${float} 3s ease-in-out infinite`}
//         >
//           <Image
//             width="23rem"
//             height="auto"
//             src={logo}
//             alt="Logo Image"
//             style={{ borderRadius: "inherit" }}
//           />
//         </Box>

//         {/* Fade-in login buttons */}
//         <Box
//           borderRadius="16px"
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           maxWidth="400px"
//           width="100%"
//           animation={`${fadeIn} 2s ease-in-out`}
//         >
//           <NavLink to="/admin" style={{ textDecoration: "none", width: "100%" }}>
//             <Button
//               height={"3rem"}
//               width="100%"
//               borderRadius="25px"
//               border="2px solid gray"
//               color="pink"
//               background="#6BC15C"
//               fontWeight={700}
//               fontFamily='"Poppins", sans-serif'
//               mt="20px"
//               _hover={{ background: "FloralWhite", color: "black" }}
//             >
//               Login as Admin
//             </Button>
//           </NavLink>
//           <NavLink
//             to="/userlogin"
//             style={{ textDecoration: "none", width: "100%" }}
//           >
//             <Button
//               height={"3rem"}
//               width="100%"
//               borderRadius="25px"
//             border="2px solid gray"
//                 color="pink"
//               background="#6BC15C"
//               fontWeight={700}
//               fontFamily='"Poppins", sans-serif'
//               mt="20px"
//               _hover={{ background: "FloralWhite", color: "black" }}
//             >
//               Login as User
//             </Button>
//           </NavLink>
//         </Box>

//         {/* Optional footer or extra info */}
//         <Box
//           width={"400px"}
//           display={"flex"}
//           justifyContent={"flex-end"}
//           fontWeight={"700"}
//           color={"#901810"}
//           marginTop={"1rem"}
//           textAlign={"right"}
//         ></Box>
//       </Box>
//     </>
//   );
// };

// export default Login;
 

import React from "react";
import logo from "../../Images/TRICKLINE_2.png";
import { NavLink } from "react-router-dom";
import { Box, Button, Heading, Image, keyframes, Text } from "@chakra-ui/react";
import bgImage from "../../Images/dataentry_banner.webp";

// Define keyframes for animations
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Login = () => {
  return (
    <>
      {/* <Box
        bgImage={`url(${bgImage})`}
        bgSize="cover"
        bgPosition="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        color="white"
        // filter="grayscale(100%)" // Black and white effect
        position="relative"
      >
        
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgColor="rgba(0, 0, 0, 0.5)"
          zIndex={0}
        ></Box>

    
        <Box
          textAlign="center"
          fontSize="2xl"
          fontWeight="bold"
          p={6}
          zIndex={1}
          position="relative"
          animation={`${fadeIn} 2s ease-in-out`}
        >
          Data Entry Work - Highest Paid Data Entry Jobs - Earn from Home
        </Box>

       
        <Box
          p={4}
          borderRadius="25%"
          bg="linear-gradient(135deg, #ff7f50, #ff6347)" // Colorful background for the logo
          display="inline-flex"
          zIndex={1}
          position="relative"
          animation={`${float} 3s ease-in-out infinite`}
        >
          <Image
            width="23rem"
            height="auto"
            src={logo}
            alt="Logo Image"
            style={{ borderRadius: "inherit" }}
          />
        </Box>

      
        <Box
          borderRadius="16px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          maxWidth="400px"
          width="100%"
          zIndex={1}
          position="relative"
          animation={`${fadeIn} 2s ease-in-out`}
        >
          <NavLink to="/admin" style={{ textDecoration: "none", width: "100%" }}>
            <Button
              height={"3rem"}
              width="100%"
              borderRadius="25px"
              border="2px solid gray"
              color="pink"
              background="#6BC15C"
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
              border="2px solid gray"
              color="pink"
              background="#6BC15C"
              fontWeight={700}
              fontFamily='"Poppins", sans-serif'
              mt="20px"
              _hover={{ background: "FloralWhite", color: "black" }}
            >
              Login as User
            </Button>
          </NavLink>
        </Box>
      </Box> */}
     <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minH="100vh" bg="gray.100" color="gray.900">
  <Heading as="h1" size="4xl" fontWeight="bold">404.</Heading>
  <Text fontSize="xl" mt={2} fontWeight="medium">That's an error.</Text>
  <Text fontSize="lg" mt={1}>The page you’re looking for is no longer available.</Text>
  <Text fontSize="lg" mt={1}>It may have been removed or restricted due to policy changes.</Text>
  <Text mt={4} color="gray.500">192.78.678.765</Text>
  <Text fontSize="sm" mt={4} color="gray.600">
    If you believe this is an error, please check our policies or contact support.
  </Text>
</Box>

    </>
  );
};

export default Login;
