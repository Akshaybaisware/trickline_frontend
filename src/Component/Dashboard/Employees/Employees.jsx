

// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { NavLink } from "react-router-dom";
// import axios from "axios";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import {
//   Box,
//   Button,
//   Center,
//   Flex,
 
// } from "@chakra-ui/react";


// const Employees = () => {
//   const apiUrl = import.meta.env.VITE_APP_API_URL;
//   const [employeeData, setEmployeeData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const config = {
//         method: "GET",
//         url: `${apiUrl}/user/get_all_employee`,
//       };
//       const response = await axios(config);
//       setEmployeeData(response.data.allemployee);
//       console.log(response.data);
//     } catch (error) {
//       console.log(error, "error");
//     }
//   };

 

 

//   const columns = [
//     {
//       name: "Name",
//       selector: "name",
//     },
//     {
//       name: "Mobile",
//       selector: "mobile",
//     },
//     {
//       name: "Email",
//       selector: "email",
//     },
//     {
//       name: "Action",
//       cell: (row) => (
//         <NavLink to={`/employeeprofileedit/${row._id}`}>
//           <Button colorScheme="blackAlpha" backgroundColor="black" width="80%">
//             View Detail
//           </Button>
//         </NavLink>
//       ),
//     },
//   ];


//   return (
//     <>
//       <Flex direction="column" align="center">
//         <Box
//           color="#DD372D"
//           ml={["1rem", "0rem"]}
//           mt={["1rem", "0"]}
//           mb="1rem"
//           fontSize={["1.5rem", "2rem"]}
//           fontWeight="700"
//         >
//           Employees
//         </Box>
//         <NavLink to="/employeeform">
//           <Button
//             mt="1rem"
//             mb={"1rem"}
//             _hover={{ background: "white", color: "gray" }}
//             p="1rem"
//             color="white"
//             bg="black"
//             width={"8rem"}
//           >
//             Add Employee
//           </Button>
//         </NavLink>
//       </Flex>

     

//       <Box width={{ base: "81vw", md: "80vw" }} overflowX="auto" p={4}>
//         <DataTable
//           title=""
//           columns={columns}
//           data={employeeData}
//           pagination
         
//         />
//       </Box>
//     </>
//   );
// };

// export default Employees;


// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { Button, Input, Box } from "@chakra-ui/react";
// import { Text } from "@chakra-ui/react";
// import { Link } from "react-router-dom";

// function EmployeesTable() {
//   const [data, setdata] = useState([]);
//   const coloums = [
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Designation",
//       selector: (row) => row.designation,
//       sortable: true,
//     },
//     {
//       name: "MobileNo",
//       selector: (row) => row.mobile,
//       sortable: true,
//     },
//     {
//       name: "Branch",
//       selector: (row) => row.branch,
//       sortable: true,
//     },
//     {
//       name: "Address",
//       selector: (row) => row.address,
//       sortable: true,
//     },
//   ];
//   const getemployees = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/employee/getallemployee",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application",
//           },
//         }
//       );
//       const res = await response.json();
//       console.log(res);
//       setdata(res.employee);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getemployees();
//   }, []);
//   return (
//     <>
//       <Box>
//         <center>
//          <Text fontSize={"2rem"} fontWeight={"700"}>Employees</Text>
//           </center>
//         <Link to="/addemployees">
//           <Box display={"flex"} justifyContent={"flex-end"}>
//           <Button bg={"peachpuff"} >+ Add Employees</Button>
//           </Box>
//         </Link>
//       </Box>
//       <Input placeholder="Search" />
//       <DataTable columns={coloums} data={data} pagination />
//     </>
//   );
// }

// export default EmployeesTable;

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Button,
  Input,
  Box,
  Flex,
  Text,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

function EmployeesTable() {
  const [data, setData] = useState([]);
  const toast = useToast();
  const [updatedelete, setupdatedelete] = useState();
  const [loading, setloading] = useState(false);

  const handeleEmployee = async (id) => {
    try {
      const response = await axios.post(
        "https://glorry-bakcend-updated-production.up.railway.app/api/employee/deleteemployee",
        {
          employeeId: id,
        }
      );
      console.log(response, "deleted response");
      setupdatedelete(response);
      toast({
        title: "Success",
        description: "Employee Deleted Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
    },
    {
      name: "MobileNo",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Branch",
      selector: (row) => row.branch,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Delete Employee",
      cell: (row) => (
        <Button onClick={() => handeleEmployee(row._id)} colorScheme="red">
          Delete
        </Button>
      ),
      sortable: true,
    },
  ];

  const getEmployees = async () => {
    setloading(true);
    try {
      const response = await fetch(
        "https://glorry-bakcend-updated-production.up.railway.app/api/employee/getallemployee",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      setData(res.employee);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, [updatedelete]);

  return loading ? (
    <Center height={"100vh"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  ) : (
   
      <Box mt="1.5rem" w="80%" p="4">
        <Flex direction={"column"} alignItems="center" mb="4">
          <Text fontSize="2rem" fontWeight="700">
            Employees
          </Text>
          <Link to="/employeeform">
            <Button color={"white"} bg="blue">
              + Add Employees
            </Button>
          </Link>
        </Flex>
        <Input placeholder="Search" mb="4" />
        <DataTable columns={columns} data={data} pagination />
      </Box>
   
   

  );
}

export default EmployeesTable;
