import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Report = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userData, setUserData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, SetSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/user/get_successOrfreeze_user?page=${currentPage}`
      );

      setTotalPages(response.data?.totalPages);
      setUserData(response?.data?.users);
      setFilter(response?.data?.users);
      // console.log("response", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const result = userData?.filter(
      (item) =>
        item?.email.toLowerCase().includes(search.toLowerCase()) || item?.mobile.toLowerCase().includes(search.toLowerCase()) 
    );
    // console.log(result);
    setFilter(result);
  }, [search, userData,]);

  const handleSearch = () => {
    if (searchQuery) {
      searchResponse();
      setCurrentPage(1);
      setSearchQuery("");
    } else {
      fetchData();
    }
  };

  const searchResponse = async () => {
    try {
      const payload = {
        name: searchQuery,
        data: {
          status: "Success",
        },
      };

      const response = await axios.post(`${apiUrl}/user/search_user_by_name`, payload);

      setUserData(response.data.users);
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

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
      name: "Action",
      cell: (row) => (
        <NavLink to={`/reportform/${row._id}`}>
          <Button colorScheme="blackAlpha" backgroundColor="black" width="80%">
            View Detail
          </Button>
        </NavLink>
      ),
    },
  ];

  const paginationOptions = {
    rowsPerPageText: "Rows per page:",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  return (
    <>
      <Flex direction="column" align="center">
        <Box
          color="#DD372D"
          ml={["1rem", "0rem"]}
          mt={["1rem", "0"]}
          mb="1rem"
          fontSize={["1.5rem", "2rem"]}
          fontWeight="700"
        >
          Report
        </Box>
      </Flex>
      <Center>
        <Stack margin={"1rem"} direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Start date</FormLabel>
              <Input width={{ base: "250px", md: "400px" }} type="date" placeholder="Kaveri Kappor" />
            </FormControl>
          </Box>{" "}
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>End date</FormLabel>{" "}
              <Input width={{ base: "250px", md: "400px" }} type="date" placeholder="Kaveri Kappor" />
            </FormControl>
          </Box>
        </Stack>
      </Center>
      {/* <InputGroup mt="1rem" ml={["1rem", "12rem"]} width={["90%", "500px"]}>
        <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
        <Input
          border="1px solid green"
          width="100%"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          width={{ md: "12rem", base: "6rem" }}
          marginLeft={"1rem"}
          className="employee-btn"
          colorScheme="teal"
          onClick={handleSearch}
        >
          Search
        </Button>
      </InputGroup> */}

      <Box width={{ base: "81vw", md: "80vw" }} overflowX="auto" p={4}>
        <DataTable
          title=""
          columns={columns}
          data={filter}
          pagination
          // paginationServer
          // paginationTotalRows={totalPages * 10} // Assuming 10 items per page
          // onChangePage={(page) => handlePagination(page)}
          // paginationPerPage={10}
          // paginationRowsPerPageOptions={[10, 20, 30]}
          // paginationComponentOptions={paginationOptions}
          subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => SetSearch(e.target.value)}
            style={{
              border: "1px solid gray",
              borderRadius: "15px",
              padding: "10px",
              paddingLeft: "15px",
              width: "100%",
            }}
            />
          }
        />
      </Box>
    </>
  );
};

export default Report;