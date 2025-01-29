import React, { useLayoutEffect } from "react";
import { Text, Box, Input, Button, Flex, Center } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { FaDownload } from "react-icons/fa6";
import { FaFile } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiLinkExternal } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useToast, Icon } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import axios from "axios";
import jsPDF from "jspdf";
import { FaEdit } from "react-icons/fa";

import { IconButton } from "@chakra-ui/react";

function Report() {
  const icons = [FaPencilAlt, FaEye, FaRupeeSign];
  const navigate = useNavigate();
  const [allusersdata, setAllusersData] = useState([]);
  const toast = useToast();
  const [incorrectAssignments, setIncorrectAssignments] = useState({});
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  // const handleviewdetails = (rowdata) => {
  //   console.log(rowdata, "rowdata");
  //   navigate("/viewdetails", {});
  // };
  function handleViewDetails(rowData) {
    return () => {
      console.log(rowData, "rowData");
      navigate("/viewdetails", {
        state: { data: rowData },
      });
    };
  }

  // const downloadReport = async (data) => {
  //   console.log(data, "data received for report");
  //   const pdf = new jsPDF({
  //     orientation: "landscape",
  //   });

  //   try {
  //     const response = await axios.post(
  //       // "https://greentenbe-production.up.railway.app/api/assignment/getassignments",
  //       `http://localhost:5000/api/user/getreportbyid`,
  //       // `http://localhost:5000/api/assignment/getassignments`,

  //       { id : data._id }
  //       // {
  //       //   email: data.email,
  //       // }
  //     );
  //     console.log(response.data, "Assignments data");

  //     let startX = 20;
  //     let startY = 30;
  //     const rowHeight = 20;
  //     const colWidth = 90;
  //     const pageHeight = pdf.internal.pageSize.height; // Get the page height

  //     pdf.setFontSize(16);
  //     pdf.text("User Details Report", startX, 20);

  //     // Function to add row with automatic new page handling
  //     const addRow = (label, value, x, y) => {
  //       if (y > pageHeight - 40) {
  //         // Check if y exceeds the page height minus some margin
  //         pdf.addPage(); // Add a new page
  //         y = 30; // Reset y position to the top of the new page
  //       }
  //       pdf.setFontSize(12);
  //       pdf.text(`${label}: ${value || "Not provided"}`, x, y);
  //       return y + rowHeight; // Increment y for the next row
  //     };

  //     let column1X = startX;
  //     let column2X = startX + colWidth + 40;

  //     startY = addRow("Name", data?.name, column1X, startY);
  //     startY = addRow("Mobile", data?.mobile, column2X, startY - rowHeight); // Adjust y for column continuity
  //     startY = addRow("Email", data?.email, column1X, startY);
  //     startY = addRow(
  //       "Start Date",
  //       data?.startDate?.slice(0, 10),
  //       column2X,
  //       startY - rowHeight
  //     );
  //     startY = addRow(
  //       "End Date",
  //       data?.endDate?.slice(0, 10),
  //       column1X,
  //       startY
  //     );
  //     startY = addRow(
  //       "Total Forms",
  //       data?.totalAssignmentLimit,
  //       column2X,
  //       startY - rowHeight
  //     );
  //     startY = addRow(
  //       "Filled Forms",
  //       data?.submittedAssignmentCount,
  //       column1X,
  //       startY
  //     );
  //     startY = addRow(
  //       "Correct Forms",
  //       data?.rightForms,
  //       column2X,
  //       startY - rowHeight
  //     );
  //     startY = addRow(
  //       "Incorrect Forms",
  //       data?.wrongForms || "0",
  //       column1X,
  //       startY
  //     );

  //     if (startY > pageHeight - 40) {
  //       pdf.addPage();
  //       startY = 30;
  //     }
  //     pdf.setFontSize(16);
  //     pdf.text("Assignments:", startX, startY);
  //     startY += rowHeight;

  //     response.data.assignments.forEach((assignment, index) => {
  //       if (startY > pageHeight - 40) {
  //         pdf.addPage();
  //         startY = 30;
  //       }
  //       startY = addRow(`Name`, assignment.name, startX, startY);
  //       startY = addRow(`Address`, assignment.address, startX, startY);
  //       startY = addRow(`Pin Code`, assignment.pinCode, startX, startY);
  //       startY = addRow(
  //         `Job Functional`,
  //         assignment.jobFunctional,
  //         startX,
  //         startY
  //       );
  //       startY = addRow(`Phone`, assignment.phone, startX, startY);
  //       startY = addRow(
  //         `Annual Revenue`,
  //         assignment.annualRevenue,
  //         startX,
  //         startY
  //       );
  //     });

  //     pdf.save(`Report_${data?.name}.pdf`);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const downloadReport = async (data) => {
    console.log(data, "data received for report");
    const pdf = new jsPDF({
      orientation: "landscape",
    });

    try {
      const userResponse = await axios.post(`${apiUrl}/user/getreportbyid`, {
        id: data._id,
      });
      console.log(userResponse.data, "User Report data");

      const allAssignmentsResponse = await axios.get(
        // "https://greentenbe-production.up.railway.app/api/questions/getquestions"
        `${apiUrl}/assignment/getallassignments`
      );
      console.log(allAssignmentsResponse.data, "All Assignments data");

      const user = userResponse.data.user;
      const incorrectAssignmentCount = user.incorrectAssignmentCount;

      let startX = 20;
      let startY = 30;
      const rowHeight = 20;
      const colWidth = 90;
      const pageHeight = pdf.internal.pageSize.height; // Get the page height

      pdf.setFontSize(16);
      pdf.text("User Details Report", startX, 20);

      // Function to add row with automatic new page handling
      const addRow = (label, value, x, y) => {
        if (y > pageHeight - 40) {
          // Check if y exceeds the page height minus some margin
          pdf.addPage(); // Add a new page
          y = 30; // Reset y position to the top of the new page
        }
        pdf.setFontSize(12);
        pdf.text(`${label}: ${value || "Not provided"}`, x, y);
        return y + rowHeight; // Increment y for the next row
      };

      let column1X = startX;
      let column2X = startX + colWidth + 40;

      startY = addRow("Name", user?.name, column1X, startY);
      startY = addRow("Mobile", user?.mobile, column2X, startY - rowHeight); // Adjust y for column continuity
      startY = addRow("Adress", user?.address, column1X, startY);
      startY = addRow("Email", user?.email, column1X, startY);
      startY = addRow(
        "Start Date",
        user?.startDate?.slice(0, 10),
        column1X,
        startY
      );
      startY = addRow(
        "End Date",
        user?.endDate?.slice(0, 10),
        column2X,
        startY - rowHeight
      );
      startY = addRow(
        "Total Forms",
        user?.totalAssignmentLimit,
        column1X,
        startY
      );
      startY = addRow(
        "Filled Forms",
        user?.submittedAssignmentCount,
        column2X,
        startY - rowHeight
      );
      startY = addRow(
        "Correct Forms",
        user?.correctAssignmentCount,
        column1X,
        startY
      );
      startY = addRow(
        "Incorrect Forms",
        user?.incorrectAssignmentCount || "0",
        column2X,
        startY - rowHeight
      );

      if (startY > pageHeight - 40) {
        pdf.addPage();
        startY = 30;
      }
      pdf.setFontSize(16);
      pdf.text("Incorrect Assignments:", startX, startY);
      startY += rowHeight;

      const incorrectAssignments =
        allAssignmentsResponse.data.assignments.filter(
          (assignment) =>
            assignment.correctAssignmentCount !== user.correctAssignmentCount
        );

      // Randomly select incorrect assignments
      const selectedIncorrectAssignments = [];
      for (let i = 0; i < incorrectAssignmentCount; i++) {
        const randomIndex = Math.floor(
          Math.random() * incorrectAssignments.length
        );
        selectedIncorrectAssignments.push(incorrectAssignments[randomIndex]);
        incorrectAssignments.splice(randomIndex, 1);
      }

      selectedIncorrectAssignments.forEach((assignment) => {
        if (startY > pageHeight - 40) {
          pdf.addPage();
          startY = 30;
        }
        startY = addRow(`Name`, assignment.name, startX, startY);
        startY = addRow(`Address`, assignment.address, startX, startY);
        startY = addRow(`Pin Code`, assignment.pinCode, startX, startY);
        startY = addRow(
          `Job Functional`,
          assignment.jobFunctional,
          startX,
          startY
        );
        startY = addRow(`Phone`, assignment.phone, startX, startY);
        startY = addRow(
          `Annual Revenue`,
          assignment.annualRevenue,
          startX,
          startY
        );
      });

      pdf.save(`Report_${user?.name}.pdf`);
    } catch (error) {
      console.log(error.message);
    }
  };
  // const downloadReport = async (data) => {
  //   console.log(data, "data received for report");
  //   const pdf = new jsPDF({
  //     orientation: "landscape",
  //   });

  //   try {
  //     const userResponse = await axios.post(
  //       `https://greentenbe-production.up.railway.app/api/user/getreportbyid`,
  //       { id: data._id }
  //     );
  //     console.log(userResponse.data, "User Report data");

  //     const user = userResponse.data.user;
  //     const incorrectAssignmentCount = user.incorrectAssignmentCount;

  //     let startX = 20;
  //     let startY = 30;
  //     const rowHeight = 20;
  //     const colWidth = 90;
  //     const pageHeight = pdf.internal.pageSize.height; // Get the page height

  //     pdf.setFontSize(16);
  //     pdf.text("User Details Report", startX, 20);

  //     // Function to add row with automatic new page handling
  //     const addRow = (label, value, x, y) => {
  //       if (y > pageHeight - 40) {
  //         // Check if y exceeds the page height minus some margin
  //         pdf.addPage(); // Add a new page
  //         y = 30; // Reset y position to the top of the new page
  //       }
  //       pdf.setFontSize(12);
  //       pdf.text(`${label}: ${value || "Not provided"}`, x, y);
  //       return y + rowHeight; // Increment y for the next row
  //     };

  //     let column1X = startX;
  //     let column2X = startX + colWidth + 40;

  //     startY = addRow("Name", user?.name, column1X, startY);
  //     startY = addRow("Mobile", user?.mobile, column2X, startY - rowHeight); // Adjust y for column continuity
  //     startY = addRow("Email", user?.email, column1X, startY);
  //     startY = addRow("Address" , user?.address , column2X ,startY - rowHeight );
  //     startY = addRow(
  //       "Start Date",
  //       user?.startDate?.slice(0, 10),
  //      column1X,
  //       startY
  //     );
  //     startY = addRow(
  //       "End Date",
  //       user?.endDate?.slice(0, 10),

  //       column2X,
  //       startY - rowHeight
  //     );
  //     startY = addRow(
  //       "Total Forms",
  //       user?.totalAssignmentLimit,
  //      column1X,
  //       startY
  //     );
  //     startY = addRow(
  //       "Filled Forms",
  //       user?.submittedAssignmentCount,
  //       column2X,
  //       startY - rowHeight
  //     );
  //     startY = addRow(
  //       "Correct Forms",
  //       user?.correctAssignmentCount,
  //       column1X,
  //       startY
  //     );
  //     startY = addRow(
  //       "Incorrect Forms",
  //       user?.incorrectAssignmentCount || "0",
  //       column2X,
  //       startY - rowHeight
  //     );

  //     // Check for new page before adding questions and answers
  //     if (startY > pageHeight - 40) {
  //       pdf.addPage();
  //       startY = 30;
  //     }

  //     pdf.setFontSize(16);
  //     pdf.text("Questions and Answers:", startX, startY);
  //     startY += rowHeight;

  //     // Static questions and answers
  //   //   const questions = [
  //   //     "In which country was the inventor Nikola Tesla born?",
  //   //    "In which ocean is the Mariana Trench located?",
  //   //     "Match the inventor to their invention.",
  //   //     "What day is associated with tricks and pranks?",
  //   //     "Which of these animals is not a mammal?",
  //   //     "Which animal is the symbol of WWF?",
  //   //     "In which country was the sport of golf first played?",
  //   //     "Which movie series features Johnny Depp as a pirate?",
  //   //     "Who is the lead singer of U2?",
  //   //     "What's the more famous name that Robin Fenty goes by?",
  //   //     "Which director is known for shooting the Avatar film series?",
  //   //     "What is the capital city of France?",
  //   //     "What is the capital city of the United States?",
  //   //     "What is the capital of the United Kingdom?",
  //   //     "What is the capital city of Germany?",
  //   //     "What is the capital city of Italy?",
  //   //     "What is the capital city of Spain?",
  //   //     "What is the capital city of Canada?",
  //   //     "What is the capital city of Australia?",
  //   //     "What is the capital city of Japan?",
  //   //     "What is the capital city of Russia?",
  //   //     "What is the capital city of Brazil?",
  //   //     "What is the capital city of China?",
  //   //     "What is the capital city of Mexico?",
  //   //     "What is the capital of Netherlands?",
  //   //     "What country is known as the land of the long white cloud?",
  //   //     "Which of these countries is not in Scandinavia?",
  //   //     "Which city is famous for its carnival before Lent?",
  //   //     "What is the most populous city in the world?",
  //   //     "Which of these countries is landlocked?",
  //   //     "Where is the tallest building in the world located?",
  //   //     "The ancient city of Petra is a famous tourist attraction in which country?",
  //   //     "Which European country has a city that stands on approximately 118 small islands?",
  //   //     "The Amazon rainforest is primarily located in which country?",
  //   //     "What is the largest lake in Africa?",
  //   //     "Which of these countries is not part of the United Kingdom?",
  //   //     "What is the name of the strait that separates Spain and Morocco?",
  //   //     "What body of water separates Saudi Arabia from Africa?",
  //   //     "Which African nation is the newest country in the world?",
  //   //     "Which of these countries does not border the Mediterranean Sea?",
  //   //     "What is the capital city of Canada?",
  //   //     "The Kalahari Desert is located in which continent?",
  //   //     "What is the chemical symbol for water?",
  //   //     "In which direction does the Sun rise?",
  //   //     "What is the fastest land animal?",
  //   //     "What is the main currency used in Japan?",
  //   //     "Who was the first woman to fly solo across the Atlantic Ocean?",
  //   //     "What is the largest planet in our solar system?",
  //   //     "Which chemical element is represented by the symbol 'O'?",
  //   //     "Who wrote the Harry Potter series?",
  //   //     "Which country hosted the 2016 Summer Olympics?",
  //   //     "What is the primary gas found in the Earth's atmosphere?",
  //   //     "Who is known as the father of modern computers?",
  //   //     "What is the largest organ in the human body?",
  //   //     "What is the name of the galaxy that contains our Solar System?",
  //   //     "Who discovered penicillin?",
  //   //     "Which planet is known as the Earth's twin?",
  //   //     "Who wrote the play 'Hamlet'?",
  //   //     "What is the boiling point of water at sea level in Celsius?",
  //   //     "Which country is famous for the Eiffel Tower?",
  //   //     "What is the smallest bone in the human body?",
  //   //     "What is the capital of Egypt?",
  //   //     "What's the scientific term for the fear of spiders?",
  //   //     "In Greek mythology, who turned everything he touched into gold?",
  //   //     "How many players are there on the field for one team in a standard soccer match?",
  //   //     "What's the largest land animal?",
  //   //     "Which of these animals is a marsupial?",
  //   //     "What's the largest bird in the world?",
  //   //      "What type of animal is a python?",
  //   //     "From which country does Gouda cheese originate?",
  //   //     "What is the capital city of Turkey?",
  //   // "What is the capital city of Indonesia?",
  //   // "What is the capital city of Saudi Arabia?",
  //   // "What is the capital city of Andorra?",
  //   // "What is the capital city of Serbia?",
  //   // "What is the capital city of the Republic of Congo?",
  //   // "What is the capital city of Equatorial Guinea?",
  //   // "What is the capital city of Eritrea?",
  //   // "What is the capital city of Afghanistan?",
  //   // "What is the capital city of Azerbaijan?",
  //   // "What is the capital city of Singapore?",
  //   // "What is the capital city of São Tomé and Príncipe?",
  //   // "What is the capital city of Belarus?",
  //   // "What is the capital city of Sweden?",
  //   // "What is the capital city of Vietnam?",
  //   // "What is the capital city of Vatican City?",
  //   // "What is the largest ocean?",
  //   // "Which country has the most islands in the world?",
  //   // "Which desert is the largest in the world?",
  //   // "In which country is Mount Everest located?",
  //   // "Which river is the longest in the world?",
  //   // "What is the capital of Netherlands?",
  //   // "What country is known as the land of the long white cloud?",
  //   // "Which city is famous for its carnival before Lent?",
  //   // "What is the most populous city in the world?",
  //   // "Where is the tallest building in the world located?",
  //   // "The ancient city of Petra is famous tourist attraction in which country?",
  //   // "Which European country has a city that stands on approximately 118 small islands?",
  //   // "The Amazon rainforest is primarily located in which country?",
  //   // "What is the currency of Japan?",
  //   // "What is the largest lake in Africa?",
  //   // "What is the name of the strait that separates Spain and Morocco?",
  //   // "What is the northernmost national capital city in the world?",
  //   // "What body of water separates Saudi Arabia from Africa?",
  //   // "Which African nation is the newest country in the world?",
  //   // "Which of these countries does not border the Mediterranean Sea?",
  //   // "What is the capital city of Canada?",
  //   // "The Kalahari Desert is located in which continent?",
  //   // "Which river flows through Baghdad, the capital of Iraq?",
  //   // "What is the largest island in the Mediterranean Sea?",
  //   // "The island of Sicily is an autonomous region of which country?",
  //   //   ];

  //   //   const rawAnswers = [
  //   //     "Croatis", // Croatia
  //   //     "Pacifc Ocean", // Pacific Ocean
  //   //     "Thomas Edisn - Light Bulb, Alexander Graham Bell - Telephone", // Thomas Edison
  //   //     "April Fools' Day", // April Fool's Day
  //   //     "Lizerd", // Lizard
  //   //     "Giant Pands", // Giant Panda
  //   //     "Sctoland", // Scotland
  //   //     "Piraates of the Caribbean", // Pirates of the Caribbean
  //   //     "Bonoo", // Bono
  //   //     "Rihanaa", // Rihanna
  //   //     "James Cameronn", // James Cameron
  //   //     // "Can't determine without an imag", // Can't determine without an image
  //   //     "Pariss", // Paris
  //   //     "Washington, D.C.", // Washington, D.C. (correct, no change)
  //   //     "Londn", // London
  //   //     "Brlin", // Berlin
  //   //     "Roome", // Rome
  //   //     "Madridd", // Madrid
  //   //     "Ottwa", // Ottawa
  //   //     "Caanberra", // Canberra
  //   //     "Tokyoo", // Tokyo
  //   //     "Moscw", // Moscow
  //   //     "Brasíia", // Brasília
  //   //     "Beiiing", // Beijing
  //   //     "Mexco City", // Mexico City
  //   //     "Amstrdam", // Amsterdam
  //   //     "New Zeland", // New Zealand
  //   //     "Finlnd", // Finland
  //   //     "Rio de Janiero", // Rio de Janeiro
  //   //     "Tokoyo", // Tokyo
  //   //     "Afghannistan", // Afghanistan
  //   //     "Dubay,", // Dubai, United Arab Emirates
  //   //     "Jrdan", // Jordan
  //   //     "Itly (Venice)", // Italy (Venice)
  //   //     "Brazil", // Brazil (correct, no change)
  //   //     "Lake Victoris", // Lake Victoria
  //   //     "Ireland", // Ireland (correct, no change)
  //   //     "Strait of Gibraltr", // Strait of Gibraltar
  //   //     "Red Ssea", // Red Sea
  //   //     "South Sdan", // South Sudan
  //   //     // "Can't determine without an imag", // Can't determine without an image
  //   //     "Portugal", // Portugal (correct, no change)
  //   //     "Ottawa", // Ottawa (repeated)
  //   //     "Afica", // Africa
  //   //     "H₂O", // H₂O (correct, no change)
  //   //     "Est", // East
  //   //     // "Can't determine without an imag", // Can't determine without an image
  //   //     // "Can't determine without specifics", // Can't determine without specifics (correct, no change)
  //   //     "Cheeetah", // Cheetah
  //   //     "Japanse Yen", // Japanese Yen
  //   //     "Amelia Earhrt", // Amelia Earhart
  //   //     "Jupter", // Jupiter
  //   //     "Oxyen", // Oxygen
  //   //     "J.K. Rawling", // J.K. Rowling
  //   //     "Brazil", // Brazil (correct, no change)
  //   //     "Nitrogenk", // Nitrogen (correct, no change)
  //   //     "Alan Turingg", // Alan Turing
  //   //     "Skind", // Skin (correct, no change)
  //   //     "Milkyy Way", // Milky Way
  //   //     "Alexander Feming", // Alexander Fleming
  //   //     "Vens", // Venus
  //   //     "William Shakespear", // William Shakespeare
  //   //     "100° Celhcius", // 100°C
  //   //     "Francke", // France (correct, no change)
  //   //     "Stapues", // Stapes (correct, no change)
  //   //     "Cairoo", // Cairo
  //   //     "Arachnphobia", // Arachnophobia
  //   //     "King Midas", // King Midas (correct, no change)
  //   //     "11", // 11 (correct, no change)
  //   //     // "Four (Jupiter, Saturn, Uranus, Neptun)", // Four
  //   //     "African Elphant", // African Elephant
  //   //     "Kangroo", // Kangaroo
  //   //     // "Flse", // False
  //   //     // "Dolphin", // Dolphin (correct, no change)
  //   //     "Ostrch", // Ostrich
  //   //     // "Ture", // True

  //   //     "Snke", // Snake

  //   //     "Netherlnds", // Netherlands

  //   // "Ankaraa",
  //   // "Jakartaa",
  //   // "Riyaddh",
  //   // "Andorra la Vellaa",
  //   // "Belgradee",
  //   // "Brazzavilee",
  //   // "Malabbo",
  //   // "Asmarra",
  //   // "Kaabul",
  //   // "Bakuu",
  //   // "Singaporr",
  //   // "Sãoo Tomé",
  //   // "Minnsk",
  //   // "Stockhoolm",
  //   // "Hanoii",
  //   // "Vaticaan City",

  //   // "Paciffic Ocean",
  //   // "Swedenn",
  //   // "Saharaa",
  //   // "Nepall",
  //   // "Nilee",
  //   // "Amsterdamm",
  //   // "Neww Zealand",
  //   // "Riode Janeiro",
  //   // "Tokyoo",
  //   // "Dubaai",
  //   // "Jordann",
  //   // "Italyy",
  //   // "Braziil",
  //   // "Yenn",
  //   // "Lakee Victoria",
  //   // "Gibraltarr Strait",
  //   // "Reykjavikk",
  //   // "Red Sea",
  //   // "Southh Sudan",
  //   // "Portugal",
  //   // "Ottawaa",
  //   // "Africaa",
  //   // "Tigriss",
  //   // "Sicilly",
  //   // "Italy",
  //   //   ];

  //     // Combine questions and rawAnswers into objects
  //     const combinedData = questions.map((question, index) => ({
  //       question,
  //       answer: rawAnswers[index],
  //     }));

  //     combinedData.forEach((data, index) => {
  //       if (startY > pageHeight - 40) {
  //         pdf.addPage();
  //         startY = 30;
  //       }
  //       startY = addRow(`Question ${index + 1}`, data.question, startX, startY);
  //       startY = addRow(`Answer`, data.answer, startX, startY);
  //     });

  //     pdf.save(`Report_${user?.name}.pdf`);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // Example usage

  // Assuming you have startDate and endDate states as well

  const [tableData, setTableData] = useState(allusersdata);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [deletestate, setDeleetestate] = useState();
  const [filter, setFilter] = useState([]);

  const userId = localStorage.getItem("userId");

  const qcdata = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/user/getallclient`
        // `http://localhost:5000/user/getreportbyid`,{
        //  userId: userId
        // }
        // "http://localhost:5000/api/user/getallclient"
      );
      console.log(response, "response");

      if (response.isAvailable === false) {
        toast({
          title: "Error",
          description: "No Data Available",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
      setAllusersData(response?.data?.data);
      console.log(response, response?.data?.data, "allusersdata");
    } catch (error) {
      console.log(error.message);
    }
  };

  const qcreportdata = async (row) => {
    try {
      console.log(row, "www");

      if (row._id || userId) {
        const reposne = await axios.post(
          // "https://greentenbe-production.up.railway.app/api/assignment/getassignments",
          `${apiUrl}/user/getreportbyid`,
          // "http://localhost:5000/api/user/getreportbyid",
          { id: row?._id ? row?._id : userId }
        );
        console.log(reposne, "jasdbasjkdbaksjb", row);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    qcdata();
    qcreportdata();
  }, [deletestate]);
  const handleDelete = async (row) => {
    try {
      console.log(row, "rowdaa");

      if (row.submittedAssignmentCount !== 510) {
        toast({
          title: "User has not Submitted All assignment",
          position: "top",
          duration: 3000,
          status: "error",
          isClosable: true,
        });
        return;
      }

      const user = {
        ...row,
      };
      const state = {
        user,
      };
      navigate("/qccheck", {
        state: state,
      });
      //   const id = row._id;
      //   const res = await axios.post(
      //     'https://greentenbe-production.up.railway.app/api/user/getreportbyid',
      //     { userId: id }
      //   );
      //   const pdfUrl = res.data.pdfUrl;
      //   window.open(pdfUrl, '_blank');
      // } catch (error) {
      //   console.log(error.message);
      // }
    } catch (error) {
      toast({
        title: "Some Error Occured",
      });
    }
    // fetchData();
  };
  //useEffect(() => {
  //getincorrectassignments();
  //}, []);

  const handleIconClick = (rowData) => {
    navigate(`/user/registeruserdetail/${rowData._id}`);

    // <Button color={"white"} bg={"red"} onClick={() => navigate(`/registeruserdetail/${row._id}`, { state: row, }) } > View Qc </Button>
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Mobile No",
      selector: (row) => row?.mobile,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row?.address,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row?.startDate?.slice(0, 10),
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row?.endDate?.slice(0, 10),
      sortable: true,
    },
    // qcreportdata
    {
      name: "Total Forms",
      selector: (row) => {
        if (row?.totalAssignmentLimit === 530) {
          // Call the function if the condition is met
          console.log(row, "www 1");
          qcreportdata(row);
        }
        return row?.totalAssignmentLimit;
      },
      sortable: true,
    },
    {
      name: "Saved Forms",
      selector: (row) => row?.submittedAssignmentCount,
      sortable: true,
    },
    {
      name: "Submitted Forms",
      selector: (row) => row?.submittedAssignmentCount,
      sortable: true,
    },
    {
      name: "Wrong Forms",
      cell: (row) =>
        // row?.submittedAssignmentCount ? 85 : 0
        // {const wrongForms = Math.floor(Math.random() * (100 - 85 + 1)) + 85;
        // row.wrongForms = wrongForms; // Store the wrongForms value in the row for later use
        // return wrongForms;
        // }
        row?.incorrectAssignmentCount ? row?.incorrectAssignmentCount : 0,
    },
    {
      name: "Right Forms",
      selector: (row) =>
        //   row?.correctAssignmentCount ? row?.correctAssignmentCount : 0,
        // sortable: true,
        //   cell : (row) => {
        //     const rightForms = 400 - (row.wrongForms || 0);
        // return rightForms;
        // }
        row?.correctAssignmentCount ? row?.correctAssignmentCount : 0,
    },

    // {
    //   name: "Edit",
    //   selector: (row) => <FaPencilAlt onClick={() => handleIconClick(row)} />,
    //   sortable: true,
    // },

    {
      name: "Edit",
      selector: (row) => (
        <FaEdit 
          style={{ cursor: "pointer", color: "Purple"}} // Optional styling
          onClick={() => handleIconClick(row)} 
        />
      ),
      sortable: true,
    },
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <Button
    //       width={"22rem"}
    //       p={"1.2rem"}
    //       bg={"green"}
    //       onClick={() => {
    //         if (row.submittedAssignmentCount >= 510) {
    //           console.log(row, "donwload");
    //           downloadReport(row);
    //           toast({
    //             title: "Success",
    //             description: "Pdf Downloading",
    //             status: "success",
    //             duration: 3000,
    //             isClosable: true,
    //             position: "top",
    //           });
    //         } else {
    //           toast({
    //             title: "Error",
    //             description: "Please Submit All Forms ",
    //             status: "error",
    //             duration: 3000,
    //             isClosable: true,
    //             position: "top",
    //           });
    //         }
    //       }}
    //     >
    //       <Icon as={DownloadIcon} mr="2" />
    //       Download
    //     </Button>
    //   ),
    // },
    {
      name: "View Qc",
      cell: (row) => (
        // <Button
        //   color={"white"}
        //   bg={"red"}
        //   onClick={() =>
        //     navigate("/qcreport", {
        //       state: row,
        //     })
        //   }
        // >
        //   View Qc
        // </Button>
        <Icon
        as={FaEye}
        w={6} // Adjust the width of the icon
        h={6} // Adjust the height of the icon
        color="blue" // Set the icon color
        cursor="pointer" // Change cursor to pointer to indicate clickability
        onClick={() =>
          navigate("/qcreport", {
            state: row,
          })
        }
      />
      ),
      sortable: true,
    },
  
  ];

  // Function to handle text and date filtering
  // const handleSearch = () => {
  //   let filteredData = allusersdata;

  //   // Filter by text
  //   if (searchText) {
  //     filteredData = filteredData.filter((item) =>
  //       Object.keys(item).some(
  //         (key) =>
  //           item[key] &&
  //           item[key]
  //             .toString()
  //             .toLowerCase()
  //             .includes(searchText.toLowerCase())
  //       )
  //     );
  //   }

  //   // Start and end date filter with end date one day back
  //   if (startDate && endDate) {
  //     const start = new Date(startDate);
  //     const end = new Date(endDate);
  //     end.setDate(end.getDate() - 1); // Subtract one day from the end date
  //     end.setHours(23, 59, 59, 999); // Set the time to the last millisecond of the day

  //     filteredData = filteredData.filter((item) => {
  //       const itemStartDate = new Date(item.startDate);
  //       const itemEndDate = new Date(item.endDate);
  //       return itemStartDate >= start && itemEndDate <= end;
  //     });
  //   }

  //   setTableData(filteredData);
  // };

  // const handleSearch = () => {
  //   let filteredData = allusersdata;

  //   // Filter by text
  //   if (searchText) {
  //     filteredData = filteredData.filter((item) =>
  //       Object.keys(item).some(
  //         (key) =>
  //           item[key] &&
  //           item[key]
  //             .toString()
  //             .toLowerCase()
  //             .includes(searchText.toLowerCase())
  //       )
  //     );
  //   }

  //   // Start and end date filter with end date one day back
  //   if (startDate && endDate) {
  //     const start = new Date(startDate);
  //     const end = new Date(endDate);
  //     end.setDate(end.getDate() - 1); // Subtract one day from the end date
  //     end.setHours(23, 59, 59, 999); // Include the entire previous day

  //     filteredData = filteredData.filter((item) => {
  //       const itemStartDate = new Date(item.startDate);
  //       const itemEndDate = new Date(item.endDate);
  //       return itemStartDate >= start && itemEndDate <= end;
  //     });
  //   }

  //   setTableData(filteredData);
  // };

  const handleSearch = () => {
    let filteredData = allusersdata;

    // Filter by text
    if (searchText) {
      filteredData = filteredData.filter((item) =>
        Object.keys(item).some(
          (key) =>
            item[key] &&
            item[key]
              .toString()
              .toLowerCase()
              .includes(searchText.toLowerCase())
        )
      );
    }

    // Start and end date filter
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1); // Include the entire end date
      end.setHours(23, 59, 59, 999); // Include the entire end date

      // Debugging logs
      console.log("Start Date:", start);
      console.log("End Date:", end);

      filteredData = filteredData.filter((item) => {
        const itemStartDate = new Date(item.startDate);
        const itemEndDate = new Date(item.endDate);

        console.log("Item Start Date:", itemStartDate);
        console.log("Item End Date:", itemEndDate);

        return itemStartDate >= start && itemEndDate <= end;
      });
    }

    setTableData(filteredData);
  };

  useEffect(() => {
    // qcdata();
    handleSearch(); // Call handleSearch to apply initial filters on component mount
  }, [searchText, startDate, endDate, allusersdata, window.location.pathname]);

  return (
    <>
      <Box width={{ base: "81vw", md: "80vw" }} overflowX="auto" p={4}>
        <Box>
          <Center color={" #6699ff"} fontWeight={800} fontSize={["1.5rem", "2rem"]}>
            Open QC Report
          </Center>
        </Box>
        {/* <Box display="flex" gap="2">
        <Input type="date" onChange={(e)=> setStartDate(e.target.value)} />
        <Input type="date" onChange={(e) => setEndDate(e.target.value)} />
        <Button onClick={handleSearch}>Search Dates</Button>
      </Box> */}
        <Box
          m={"1rem"}
          // w={["rem", "400px"]}
          display={{ base: "block", md: "block" }}
          flexWrap="wrap"
          gap="2"
          
        >
          <Box>
            <Input
              mb={"1rem"}
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Box>
          <Box>
            <Input
              mb={"1rem"}
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Box>
          <Box>
            <Center color="black" bg={"#b0e01e"} onClick={handleSearch}>
              Search Dates
            </Center>
          </Box>
        </Box>

        <Box display="flex" gap="2">
          <Input
            border={"1px solid brown"}
            m={"1rem"}
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Box>
        <DataTable
          // title="QC Reports"
          columns={columns}
          data={tableData}
          pagination
          paginationPerPage={10}
        />
      </Box>
    </>
  );
}

export default Report;
