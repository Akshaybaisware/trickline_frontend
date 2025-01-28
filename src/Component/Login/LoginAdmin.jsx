// import {
//   Box,
//   Button,
//   Flex,
//   Heading,
//   Image,
//   Input,
//   Alert,
//   AlertIcon,
//   AlertTitle,
// } from "@chakra-ui/react";
// import { FaEnvelope, FaLock } from "react-icons/fa"; // Icons from react-icons library
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import React, { useState } from "react";

// import axios from "axios";
// import logo from "../../Images/logo.svg";
// import { jwtDecode } from "jwt-decode";
// import { useUserContext } from "../Context/UserContext";
// import { useToast } from "@chakra-ui/react";
// // Admin Login Page
// const LoginAdmin = () => {
//   const { setUserContext } = useUserContext();
//   const toast = useToast();

//   const [userrole, setUserrole] = useState("");

//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   const [inputFields, setInputFields] = useState({
//     username: "",
//     password: "",
//   });

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setInputFields((prevVal) => {
//       return {
//         ...prevVal,
//         [name]: value,
//       };
//     });
//   };

//   // const emailRegex = /^[a-zA-Z]/;
//   // const passwordRegex =/^[a-zA-Z0-9]+$/

//   const validationForm = (inputFields) => {
//     // console.log(inputFields);
//     const newError = {};
//     // if (!inputFields.email.match(emailRegex)) {
//     //   newError.email = "Invalid Email Address";
//     // }
//     // console.log("email success");
//     // if(!inputFields.password.match(passwordRegex)){
//     //   newError.password = "Invalid Password "
//     // }
//     setErrors(newError);
//     // console.log(" success");
//     return true;
//   };
//   // handle submit login button
//   const handleSubmit = async (e) => {
//     console.log("called");
//     e.preventDefault();
//     // const validate = validationForm(inputFields);
//     // console.log(validate);
//     // if(!validate){
//     //   return alert("fields are not valid")
//     // }
//     // console.log(inputFields , "inputFields")

//     try {
//       const apiUrl = import.meta.env.VITE_APP_API_URL;
//       console.log(inputFields, "input");
//       const response = await axios.post(
//         `${apiUrl}/auth/adminsignin`,
//         inputFields,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(response, "res");
//       if (response.status === 200) {
//         setUserrole(response.data.role);
//         setUserContext(response.data.role);
//         sessionStorage.setItem("userrole", response.data.role);
//         // extracting token from response
//         const token = response.data.token;
//         // decoding the token
//         const decodedToken = jwtDecode(token);
//         sessionStorage.setItem("token", JSON.stringify(decodedToken));
//         // alert("Login Success....");
//         toast({
//           title: "Login Success",
//           // description: 'Provide Correct UserId and Password',
//           status: "success",
//           duration: 3000, // Toast message will disappear after 3 seconds
//           isClosable: true,
//           position: "top",
//         });
//         navigate("/dashboard");
//       } else {
//         // Handle other HTTP status codes (e.g., 401 for unauthorized)
//         alert("Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       // Check if the error is due to invalid credentials
//       if (error.response && error.response.status === 401) {
//         // alert("Invalid credentials");
//         toast({
//           title: "Invalid credentials",
//           // description: 'Provide Correct UserId and Password',
//           status: "error",
//           duration: 3000, // Toast message will disappear after 3 seconds
//           isClosable: true,
//           position: "top",
//         });
//       } else {
//         // Handle other types of errors
//         toast({
//           title: "Login Failed",
//           description: "Provide Correct UserId and Password",
//           status: "error",
//           duration: 3000, // Toast message will disappear after 3 seconds
//           isClosable: true,
//           position: "top",
//         });
//       }
//     }
//   };
//   return (
//     <form>
//       <Box
//         width={{ base: "100%", md: "100%", lg: "100%", xl: "100%" }} // Adjust width based on screen size
//         marginX="auto" // Center horizontally
//         minHeight="100vh" // Ensure full height even if content is not enough
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent={"center"}
//         padding="20px"
//         bg={"#0F0623"}
//       >
//         <Box
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           marginY="20px"
//         >
//           <Image width={"23rem"} src={logo} alt="" />
//           <Heading
//             marginTop={"1rem"}
//             color="#000"
//             fontFamily="Poppins, serif"
//             size="lg"
//           >
//             Admin Login
//           </Heading>
//         </Box>

//         <Flex direction="column" width={["90%", "70%", "50%", "40%"]}>
//           <Flex alignItems="center" bg="white" borderRadius="30px" p="10px">
//             <FaEnvelope style={{ width: "4%", marginLeft: "20px" }} />
//             <Input
//               name="username"
//               type="text"
//               placeholder="UserID"
//               style={inputStyle}
//               onFocus={(e) => (e.target.style.outline = "none")}
//               required
//               onChange={onChangeHandler}
//               value={inputFields.username}
//             />
//           </Flex>
//         </Flex>
//         {errors.username && (
//           <Alert width="20%" status="error">
//             <AlertIcon />
//             <AlertTitle> {errors.username}</AlertTitle>
//           </Alert>
//         )}
//         <Flex
//           direction="column"
//           width={["90%", "70%", "50%", "40%"]}
//           marginY="10px"
//         >
//           <Flex alignItems="center" bg="white" borderRadius="30px" p="10px">
//             <FaLock style={{ width: "4%", marginLeft: "20px" }} />
//             <Input
//               name="password"
//               type="password"
//               placeholder="Password"
//               style={inputStyle}
//               onFocus={(e) => (e.target.style.outline = "none")}
//               value={inputFields.password}
//               onChange={onChangeHandler}
//             />
//           </Flex>
//         </Flex>
//         {errors.email && (
//           <Alert width="20%" status="error">
//             <AlertIcon />
//             <AlertTitle>{errors.password}</AlertTitle>
//           </Alert>
//         )}
//         <Flex direction="column" width={["90%", "70%", "50%", "40%"]}>
//           <Box marginBottom={"0.6rem"} display="flex" justifyContent="flex-end">
//             <NavLink
//               to="/ForgetPassword"
//               style={{
//                 fontSize: "16px",
//                 fontFamily: "Poppins",
//                 color: "black",
//                 marginRight: "20px",
//               }}
//             >
//               Forget the password?
//             </NavLink>
//           </Box>
//           <Button
//           bg={"gray"}
//             height={"3rem"}
//             style={buttonStyle}
//             type="submit"
//             onClick={handleSubmit}
//             _hover={{ background: "white", color: "gray" }}
//           >
//             Login
//           </Button>
//         </Flex>
//       </Box>
//     </form>
//   );
// };

// const inputStyle = {
//   outline: "none",
//   marginLeft: "10px",
//   width: "100%",
//   border: "none",
//   background: "white",
//   fontSize: "16px",
//   color: "gray",
//   fontFamily: '"Poppins", sans-serif',
//   fontWeight: "400",
//   height: "45px",
//   borderRadius: "20px",
// };

// const buttonStyle = {
//   padding: "15px",
//   width: "100%",
//   borderRadius: "25px",
//   border: "2px solid black",
//   color: "#fff",
//   background: "#47108f",
//   fontWeight: "700",
//   fontFamily: '"Poppins", sans-serif',
//   transition: "background 0.3s, color 0.3s", // Adding transition for a smooth effect

//   ":hover": {
//     background: "FloralWhite",
//     color: "white",
//   },
// };

// export default LoginAdmin;

import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner, // Chakra UI spinner for loader
} from "@chakra-ui/react";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Icons from react-icons library
import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import axios from "axios";
import logo from "../../Images/TRICKLINE_2.png";
import { jwtDecode } from "jwt-decode";
import { useUserContext } from "../Context/UserContext";
import { useToast } from "@chakra-ui/react";

const LoginAdmin = () => {
  const { setUserContext } = useUserContext();
  const toast = useToast();

  const [userrole, setUserrole] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState({
    username: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputFields((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  };

  const validationForm = (inputFields) => {
    const newError = {};
    setErrors(newError);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the login process starts

    try {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      // const apiUrl = "http://localhost:5000/api";
      const response = await axios.post(
        `${apiUrl}/auth/adminsignin`,
        inputFields,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response, "adming login response");

      if (response.status === 200) {
        setUserrole(response.data.role);
        setUserContext(response.data.role);
        sessionStorage.setItem("userrole", response.data.role);

        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        sessionStorage.setItem("token", JSON.stringify(decodedToken));

        toast({
          title: "Hello Admin",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 401) {
        toast({
          title: "Invalid credentials",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Provide Correct UserId and Password",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } finally {
      setLoading(false); // Set loading to false after the login process finishes
    }
  };

  return (
    <form>
      <Box
        width={{ base: "100%", md: "100%", lg: "100%", xl: "100%" }}
        marginX="auto"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent={"center"}
        padding="20px"
        bg={"#96436B  "}
      >
        <Box
          borderRadius="25%"
          overflow="hidden" // Ensures the image respects the borderRadius of the Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginY="20px"
        >
          <Image width={"23rem"} src={logo} alt="Logo" />
        </Box>

        <Flex direction="column" width={["90%", "70%", "50%", "40%"]}>
          <Flex alignItems="center" bg="white" borderRadius="30px" p="10px">
            <FaEnvelope style={{ width: "4%", marginLeft: "20px" }} />
            <Input
              name="username"
              type="text"
              placeholder="UserID"
              style={inputStyle}
              onFocus={(e) => (e.target.style.outline = "none")}
              required
              onChange={onChangeHandler}
              value={inputFields.username}
            />
          </Flex>
        </Flex>
        {errors.username && (
          <Alert width="20%" status="error">
            <AlertIcon />
            <AlertTitle> {errors.username}</AlertTitle>
          </Alert>
        )}

        <Flex
          direction="column"
          width={["90%", "70%", "50%", "40%"]}
          marginY="10px"
        >
          <Flex alignItems="center" bg="white" borderRadius="30px" p="10px">
            <FaLock style={{ width: "4%", marginLeft: "20px" }} />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              style={inputStyle}
              onFocus={(e) => (e.target.style.outline = "none")}
              value={inputFields.password}
              onChange={onChangeHandler}
            />
          </Flex>
        </Flex>

        {errors.password && (
          <Alert width="20%" status="error">
            <AlertIcon />
            <AlertTitle>{errors.password}</AlertTitle>
          </Alert>
        )}

        <Flex direction="column" width={["90%", "70%", "50%", "40%"]}>
          <Box marginBottom={"0.6rem"} display="flex" justifyContent="flex-end">
            <NavLink
              to="/ForgetPassword"
              style={{
                fontSize: "16px",
                fontFamily: "Poppins",
                color: "white",
                marginRight: "20px",
              }}
            >
              Forget the password?
            </NavLink>
          </Box>

          <Button
            bg={"#6BC15C"}
            height={"3rem"}
            style={buttonStyle}
            type="submit"
            onClick={handleSubmit}
            _hover={{ background: "white", color: "black" }}
            isDisabled={loading} // Disable the button while loading
          >
            {loading ? <Spinner size="sm" color="gray" /> : "Login"}{" "}
            {/* Show spinner when loading */}
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

const inputStyle = {
  outline: "none",
  marginLeft: "10px",
  width: "100%",
  border: "none",
  background: "white",
  fontSize: "16px",
  color: "gray",
  fontFamily: '"Poppins", sans-serif',
  fontWeight: "400",
  height: "45px",
  borderRadius: "20px",
};

const buttonStyle = {
  padding: "15px",
  width: "100%",
  borderRadius: "25px",
  border: "2px solid black",
  color: "black",
  bg: "#6BC15C",
  fontWeight: "700",
  fontFamily: '"Poppins", sans-serif',
  transition: "background 0.3s, color 0.3s",

  ":hover": {
    background: "FloralWhite",
    color: "black",
  },
};

export default LoginAdmin;
