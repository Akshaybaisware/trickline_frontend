import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import $ from "jquery";
import { FaDownload } from "react-icons/fa";
import * as xlsx from "xlsx";
import { saveAs } from "file-saver";
import { FaPencilAlt } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
// import { FaDownload } from "react-icons/fa6";
import { FaFile } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiLinkExternal } from "react-icons/bi";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { AiTwotoneWarning } from "react-icons/ai";
import FIR from "../../FIR/FIR";
const Registration = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();
  const [showFIR, setShowFIR] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userData, setUserData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, SetSearch] = useState("");
  const [registrationsCount, setRegistrationsCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [todaysassignmentcount, settodaysassignmentcount] = useState(0);

  const [todaysassignment, settodaysassignment] = useState(0);

  const callers = {
    "66124f906eb6102e7e68e772": "caller 1",
    "66124f986eb6102e7e68e775": "caller 2",
    "66124fa06eb6102e7e68e778": "caller 3",
    "66125cb1076a6663d19e3c07": "caller 4",
    "66125cfc076a6663d19e3c16": "caller 5",
    "66125d26076a6663d19e3c21": "caller 6",
    "66125d4f076a6663d19e3c2d": "caller 7",
  };

  useEffect(() => {
    fetchData();
    todaysRegistrations();
  }, [currentPage]);

  const icons = [
    FaPencilAlt,
    TfiReload,
    FaDownload,
    AiTwotoneWarning,
    FaFile,
    RiDeleteBin5Fill,
  ];
  const iconspending = [
    FaPencilAlt,
    TfiReload,
    BiLinkExternal,
    AiTwotoneWarning,
    RiDeleteBin5Fill,
  ];

  const handleDownloadClick = () => {
    setShowFIR(true); // Render the FIR component
  };

  const handlePDFGenerated = () => {
    setShowFIR(false); // Remove the FIR component after the PDF is generated
  };

  // https://glorry-bakcend-updated-production.up.railway.app/api/user/gettodaysregister

  const todaysRegistrations = async () => {
    try {
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      const registrationsConfig = {
        method: "GET",
        url: `${apiUrl}/user/getTodaysRegistrations`,
      };
      const registrationsResponse = await axios(registrationsConfig);
      setRegistrationsCount(registrationsResponse.data);
    } catch (error) {
      console.error("Error fetching today's registrations:", error);
    }
  };
  // excel data
  const exportToExcel = () => {
    // Convert data to worksheet format
    const worksheet = xlsx.utils.json_to_sheet(filter); // Use 'filter' state

    // Create a new workbook and add the worksheet
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Registrations");

    // Write the workbook to a binary format
    const excelBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Convert the binary data to a Blob
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    // Save the Excel file using FileSaver
    saveAs(blob, "registrations.xlsx");
  };

  const fetchData = async () => {
    try {
      const config = {
        method: "GET",
        url: `${apiUrl}/user/getallclient`,
      };
      const response = await axios(config);
      console.log(response, "all users");
      setTotalPages(response.data?.data?.totalPages);
      setUserData(response?.data?.data);
      setFilter(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const result = userData?.filter(
      (item) =>
        item?.name.toLowerCase().includes(search.toLowerCase()) ||
        item?.mobile.toLowerCase().includes(search.toLowerCase())
    );

    setFilter(result);
  }, [search, userData]);
  const gloryapiurl = import.meta.env.VITE_APP_API_URL;
  const deleteclientinfo = async (id) => {
    try {
      console.log(id, "delete user details");
      const response = await axios.post(
        // "https://zemixbe-production.up.railway.app/api/user/deleteclient",
        `${gloryapiurl}/user/deleteclient`, //gloryapiurl,
        {
          id: id,
        }
      );
      // await deletaggrimet(id);
      console.log(response, "deleted response");
      setFilter(filter.filter((item) => item._id !== id));
      if (response.status) {
        toast({
          title: "Deleted",
          description: "Client Deleted Successfully",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Client Not Deleted",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      console.log(error);
    }
  };
  const handledownload = async (rowData) => {
    navigate("/downloadreport", {
      state: {
        data: rowData,
        downlodePDFparentcompoent: true,
      },
    });
  };
  const emailsending = async (email) => {
    try {
      console.log("email function");
      const response = await axios.post(
        "https://zemixbe-production.up.railway.app/api/user/sendconfirmmail",
        {
          email: email,
        }
      );
      console.log(response, "email response");

      if (response.status === 200) {
        toast({
          title: "Email Sent",
          description: "Email Sent Successfully",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Email Not Sent",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };
  console.log(showFIR, "showfir");
  const handleIconClick = (rowData, iconIndex) => {
    // Perform actions based on rowData and iconIndex
    console.log("Clicked on icon:", iconIndex);
    console.log("Row data:", rowData);
    console.log(rowData, "filteredData");

    if (
      rowData.status === "Active" ||
      rowData.status === "Registered" ||
      rowData.status === "Success"
    ) {
      switch (iconIndex) {
        case 0:
          navigate("/editclient", {
            state: { data: rowData },
          });
          break;
        case 1:
          console.log("email");
          emailsending(rowData.email);
          break;
        case 2:
          handledownload(rowData);
          // navigate("/downloadreport", {
          //   state: { data: rowData },
          // });

          break;
        case 3:
          console.log("danger icon");
          setShowFIR(true);

          {
            showFIR && <FIR onPDFGenerated={handlePDFGenerated} />;
          }
          // navigate("/downloadreport", {
          //   state: { data: rowData },
          // });
          break;
        case 4:
          // deleteclientinfo(rowData._id);
          console.log("danger icon");
          navigate("/editclient", {
            state: { data: rowData },
          });
          // deletaggrimet(rowData.email);
          break;
        default:
          // Handle default case
          break;
      }
    } else if (rowData.status === "Pending") {
      switch (iconIndex) {
        // Add your pending logic here
        case 0:
          navigate("/editclient", {
            state: { data: rowData },
          });
          // Perform action for the first icon
          break;
        case 1:
          emailsending(rowData.email);
          break;
        // Perform action for the second icon

        // Add cases for other icons as needed
        case 2:
          navigate("/stamppaper");
          document.createElement("a").click();

          break;
        case 3:
          console.log("danger icon");
          // deleteclientinfo(rowData._id);
          setShowFIR(true);

          {
            showFIR && <FIR onPDFGenerated={handlePDFGenerated} />;
          }
          break;
        default:
          // Handle default case
          break;
      }
    }
  };

  //export Button
  // const Export = ({ onExport }) => (
  //   <Button onClick={(e) => onExport(e.target.value)}>Export</Button>
  // );

  // function convertArrayOfObjectsToCSV(array) {
  //   let result;

  //   const columnDelimiter = ",";
  //   const lineDelimiter = "\n";
  //   const keys = Object.keys(userData[0]);

  //   result = "";
  //   result += keys.join(columnDelimiter);
  //   result += lineDelimiter;

  //   array.forEach((item) => {
  //     let ctr = 0;
  //     keys.forEach((key) => {
  //       if (ctr > 0) result += columnDelimiter;

  //       result += item[key];

  //       ctr++;
  //     });
  //     result += lineDelimiter;
  //   });

  //   return result;
  // }

  // function downloadCSV(array) {
  //   const link = document.createElement("a");
  //   let csv = convertArrayOfObjectsToCSV(array);
  //   if (csv == null) return;

  //   const filename = "export.csv";

  //   if (!csv.match(/^data:text\/csv/i)) {
  //     csv = `data:text/csv;charset=utf-8,${csv}`;
  //   }

  //   link.setAttribute("href", encodeURI(csv));
  //   link.setAttribute("download", filename);
  //   link.click();
  // }

  const columns = [
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "Mobile",
      selector: "mobile",
    },
    {
      name: "Email",
      selector: "email",
    },
    {
      name: "Start Date",
      cell: (row) => {
        const startDate = row?.startDate?.split("T")[0]; // Extract date part only
        return startDate;
      },
    },
    {
      name: "End Date",
      cell: (row) => {
        const endDate = row?.endDate?.split("T")[0]; // Extract date part only
        return endDate;
      },
    },
    {
      name: "Caller",
      selector: "caller",
      cell: (row) => {
        const selectPlan = row?.caller; // Extract date part only
        return selectPlan;
      },
    },
    {
      name: "Status",
      selector: "Status",
      cell: (row) => {
        const Status = row?.status; // Extract date part only
        return Status;
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <Flex>
          {/* sucess icons chnages here  */}
          {row.status === "Active" ||
          row.status === "Registered" ||
          row.status === "Success"
            ? icons.map((Icon, index) => (
                <Icon
                  key={index}
                  style={{
                    fontSize: "35px",
                    cursor: "pointer",
                  }}
                  // style={{
                  //   fontSize: "35px",
                  //   padding: "3px",
                  //   // color: index === 0 ? 'white' : 'inherit',
                  //   color: row.status === "Success" ? "green" : "inherit", // Change color based on status
                  //   // background: index === 3 ? "green" : "green",
                  //   backgroundColor:
                  //     index === 4
                  //       ? "lightgray" // Red for delete, gray for other
                  //       : index === 1
                  //       ? " #99ebff" // Yellow for refresh
                  //       : index === 0
                  //       ? "#ffb3ff" // Blue for edit
                  //       : index === 2
                  //       ? " #c6ffb3"
                  //       : "white"
                  //       ? index === 3
                  //       : "black", // White for other
                  //   cursor: "pointer",
                  //   color:
                  //     index === 4
                  //       ? "red"
                  //       : row.status === "Success"
                  //       ? "green"
                  //       : "inherit",
                  //   cursor: "pointer",
                  //   margin: "0 5px",
                  //   pointerEvents: "auto",
                  // }}
                  onClick={() => handleIconClick(row, index)} // Pass row data and icon index to handleIconClick function
                />
              ))
            : iconspending.map((Icon, index) => (
                // pending icon chnages here
                <Icon
                  key={index}
                  style={{
                    fontSize: "35px",
                    cursor: "pointer",
                  }}
                  // style={{
                  //   fontSize: "35px",
                  //   color: "red",
                  //   cursor: "pointer",
                  //   padding: "3px",
                  //   margin: "0 5px",
                  //   // color: index === 0 ? 'white' : 'inherit',
                  //   // backgroundColor:"red"
                  //   // background: index === 3 ? "green" : "green",
                  //   backgroundColor:
                  //     index === 4
                  //       ? "lightgray" // Red for delete, gray for other
                  //       : index === 1
                  //       ? " #99ebff" // Yellow for refresh
                  //       : index === 0
                  //       ? "#ffb3ff"
                  //       : index === 2
                  //       ? " #c6ffb3" // Blue for edit
                  //       : "white", // White for other
                  //   color: index === 3 ? "red" : "red", // Delete icon is red
                  //   pointerEvents: "auto",
                  // }}
                  onClick={() => handleIconClick(row, index)} // Pass row data and icon index to handleIconClick function
                />
              ))}
        </Flex>
      ),
    },
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <NavLink to={`/user/registeruserdetail/${row._id}`}>
    //       <Button
    //         colorScheme="blackAlpha"
    //         backgroundColor="#6666ff"
    //         width="80%"
    //       >
    //         View Detail
    //       </Button>
    //     </NavLink>
    //   ),
    // },
    {
      name: "Delete",
      cell: (row) => (
        <Button
          onClick={() => deleteclientinfo(row._id)}
          colorScheme="blackAlpha"
          backgroundColor="#6666ff"
          width="80%"
          marginLeft={20}
        >
          Delete
        </Button>
      ),
    },
    {
      name: "Agreement",

      cell: () => (
        <>
          {/* <NavLink to="https://stamppaper-zemix.netlify.app/"> */}
          <NavLink to={"/employmentform"}>
            <Button
              colorScheme="Red"
              backgroundColor="#6666ff"
              width="80%"
              padding={4}
              margin={4}
            >
              Agreement
            </Button>
          </NavLink>
        </>
      ),
    },
  ];

  // const actionsMemo = React.useMemo(
  //   () => <Export onExport={() => downloadCSV(userData)} />,
  //   []
  // );
  const gettodaysassignmentcount = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/gettodaysregister`);
      console.log(response, "todats registertions");
      settodaysassignmentcount(response.data.users.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  const gettodaysdoneassignment = async () => {
    try {
      const reposne = await axios.get(`${apiUrl}/user/gettodaysdone`);
      console.log(reposne.data.users, "todyas doen");
      settodaysassignment(reposne.data.users.length);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    gettodaysassignmentcount();
    gettodaysdoneassignment();
    console.log(todaysassignmentcount, "todaysassignmentcount");
  }, []);

  return (
    <>
      <Flex mt={"2rem"} justifyContent="flex-end">
        <Button
          bg={"#33ff69"}
          leftIcon={<FaDownload />}
          onClick={exportToExcel}
        >
          Export to Excel
        </Button>
      </Flex>

      <Flex direction="column" align="center">
        {/* <Flex direction={"column"}>
          <Box>
            All Users
            {" " +
              new Date().toLocaleString("en-IN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
          </Box>

          <Box>
            <Text fontWeight={700} fontSize={["md", "xl"]} marginBottom="4">
              Today Pending
              {`${todaysassignmentcount}`} | Today Sucess{" "}
              {`${todaysassignment}`}
            </Text>
          </Box>
        </Flex> */}
        <Flex
          direction={{ base: "column", md: "column" }} // Stacks on small screens, row on medium+
          p={{ base: 4, md: 6 }} // Padding based on screen size
          align="center"
          justify="space-between" // Space between boxes in row direction
          wrap="wrap" // Wrap content on smaller screens
          gap={0} // Gap between children
        >
          <Box
            p={2}
            bg="#6666ff" // Light background for visibility
            color={"white"}
            borderRadius="md"
            flex={{ base: "1", md: "0 0 45%" }} // Flex-grow on small screens, fixed width on medium+
            textAlign={{ base: "center", md: "left" }} // Center text on small screens
          >
            All Users{" "}
            {new Date().toLocaleString("en-IN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Box>

          <Box
            mt={"0.5rem"}
            p={0.5}
            bg="#6666ff" // Light background for visibility
            color={"white"}
            borderRadius="md"
            flex={{ base: "1", md: "0 0 45%" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Text fontWeight={600} fontSize={{ base: "md", md: "xl" }} mb={4}>
              Today Total: {todaysassignmentcount} | Today Success:{" "}
              {todaysassignment}
            </Text>
          </Box>
        </Flex>

        <div>
          {loading && <p>Loading...</p>}
          {/* {error && <p>{error}</p>} */}
          {registrationsCount !== null && (
            <Box
              fontSize={["1.3rem", "1.5rem"]}
              mt={"5rem"}
              fontWeight={"700"}
              color={"green"}
            >
              Today's Registrations: {registrationsCount}
            </Box>
          )}
        </div>
        <Box
          color="#0c9d49"
          ml={["1rem", "0rem"]}
          mt={["0rem", "0"]}
          mb="1rem"
          fontSize={["1.5rem", "2rem"]}
          fontWeight="700"
        >
          Registration
        </Box>
        <NavLink to="/user/Registrationform">
          <Button
            mt="0rem"
            mb={"1rem"}
            _hover={{ background: "white", color: "gray" }}
            p="1rem"
            color="white"
            bg="#71a507" // Light background for visibility
            width={"6rem"}
          >
            Add User
          </Button>
        </NavLink>
      </Flex>
      <InputGroup mt="1rem" ml={["1rem", "1.5rem"]} width={["90%", "400px"]}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
      </InputGroup>

      <Box width={{ base: "110vw", md: "100vw" }} overflowX="auto" p={4}>
        <DataTable
          id="myTable"
          title=""
          columns={columns}
          data={filter}
          // actions={actionsMemo}
          pagination
          subHeader
          subHeaderComponent={
            <input
              id="myInpuTextField"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => SetSearch(e.target.value)}
              style={{
                border: "1px solid gray",
                borderRadius: "15px",
                padding: "10px",
                paddingLeft: "25px",
                width: "100%",
              }}
            />
          }
          customStyles={{
            headCells: {
              style: {
                fontSize: "16px", // Adjust the font size of table header cells
                fontWeight: "bold", // Make the font bold if desired
              },
            },
            rows: {
              style: {
                fontSize: "14px", // Adjust the font size of table rows
              },
            },
            table: {
              style: {
                borderCollapse: "collapse", // Collapse table borders
                // border: "2px solid gray", // Adjust the border thickness and color of the table
              },
            },
          }}
        />
      </Box>
    </>
  );
};

export default Registration;
