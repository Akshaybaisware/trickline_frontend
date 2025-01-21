

// import React, { useState } from "react";
// import logo from "../../Images/TRICKLINE_2.png";
// import { NavLink } from "react-router-dom";
// import { Box, Button, Image, keyframes } from "@chakra-ui/react";
// // Admin Login

// const Login = () => {
//   return (
//     <>
//     <Box
//   bg="linear-gradient(135deg, #333 25%, #444 25%, #444 50%, #333 50%, #333 75%, #444 75%, #444 100%)"
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       justifyContent="center"
//       height="100vh" // Center content vertically on the page
       
//     >
//         {/* <Box p={4}   borderRadius={"160px"}>
          
//           <Image width={"23rem"} height="auto" src={logo} alt="Logo Image" />
//         </Box> */}


// <Box 
//   p={4} 
//   borderRadius="25%" 
//   bg="gray.200" // Optional: Add a background color to see the border radius effect
//   display="inline-flex" // Ensure the box fits tightly around its content
// >
//   <Image 
//     width="23rem" 
//     height="auto" 
//     src={logo} 
//     alt="Logo Image" 
//     style={{ borderRadius: "inherit" }} // Ensure the image follows the parent Box's borderRadius
//   />
// </Box>

//       <Box
//       borderRadius={"16px"}
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         maxWidth="400px" // Set a maximum width for responsiveness
//         width="100%" // Take up full width on smaller screens
//       >
//         <NavLink to="/admin" style={{ textDecoration: "none", width: "100%" }}>
//           <Button
//             height={"3rem"}
//             width="100%"
//             borderRadius="25px"
//             border="2px solid black"
//             color="#47108f"
//             background="gray"
//             fontWeight={700}
//             fontFamily='"Poppins", sans-serif'
//             mt="20px"
//             _hover={{ background: "FloralWhite", color: "black" }}
//           >
//             Login as Admin
//           </Button>
//         </NavLink>
//         <NavLink
//           to="/userlogin"
//           style={{ textDecoration: "none", width: "100%" }}
//         >
//           <Button
//             height={"3rem"}
//             width="100%"
//             borderRadius="25px"
//             border="2px solid black"
//              color="#47108f"
//             background="gray"
//             fontWeight={700}
//             fontFamily='"Poppins", sans-serif'
//             mt="20px"
//             _hover={{ background: "FloralWhite", color: "black" }}
//           >
//             Login as User
//           </Button>
//         </NavLink>
//       </Box>
      
//     <Box
//     width={'400px'}
//     display={"flex"}
//     justifyContent={"flex-end"}
//     fontWeight={"700"}
//     color={"#901810"}
//     marginTop={"1rem"}
//     textAlign={"right"}
//   >
    
//   </Box>
//     </Box>
//   </>
//   );
// };

// export default Login;


import React from "react";
import logo from "../../Images/TRICKLINE_2.png";
import { NavLink } from "react-router-dom";
import { Box, Button, Image, keyframes } from "@chakra-ui/react";

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

const bgAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Login = () => {
  return (
    <>
      <Box
        // bg="linear-gradient(135deg, #333, #444, #555, #666)"
        bg={"#96436B  "}
        bgSize="200% 200%"
        animation={`${bgAnimation} 10s ease infinite`}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        {/* Floating logo with rounded corners */}
        <Box
          p={4}
          borderRadius="25%"
          bg="gray.200"
          display="inline-flex"
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

        {/* Fade-in login buttons */}
        <Box
          borderRadius="16px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          maxWidth="400px"
          width="100%"
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

        {/* Optional footer or extra info */}
        <Box
          width={"400px"}
          display={"flex"}
          justifyContent={"flex-end"}
          fontWeight={"700"}
          color={"#901810"}
          marginTop={"1rem"}
          textAlign={"right"}
        ></Box>
      </Box>
    </>
  );
};

export default Login;
 
