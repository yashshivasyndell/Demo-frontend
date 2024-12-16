import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { handleUserData } from "../redux/store/action";
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { CiSearch } from "react-icons/ci";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

export default function Usertable() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.getData);

  // Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Gender Selector filter
  const [gender, setGender] = useState("");
  // Education Selector filter
  const [education, setEducation] = useState("");
  // Country Selector filter
  const [country, setCountry] = useState("");
  // Platform Selector filter
  const [platform, setPlatform] = useState("");

  // Date Range filter
  const [dateRange, setDateRange] = useState([null, null]);

  // shiwicon
  const [showicon,setShowicon] = useState(false)
  // Handlers for each filter
  const handleGender = (event) => setGender(event.target.value);
  const handleEducation = (event) => setEducation(event.target.value);
  const handleCountry = (event) => setCountry(event.target.value);
  const handlePlatform = (event) => setPlatform(event.target.value);

  useEffect(() => {
    dispatch(handleUserData());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase())
    setShowicon(event.target.value.trim() === "");
    setPage(0);
  };

  // Filtered data based on search and filter selections
  const filteredData = user.filter((row) => {
    const email = row.email?.toLowerCase() || "";
    const username = row.username?.toLowerCase() || "";
    const countryField = row.country?.toLowerCase() || "";
    const genderField = row.gender?.toLowerCase() || "";
    const educationField = row.education?.toLowerCase() || "";
    const platformField = row.platform?.toLowerCase() || "";
    const createdDate = dayjs(row.created); // Convert created date to dayjs object

    const matchesSearch =
      email.includes(searchQuery) || username.includes(searchQuery) || countryField.includes(searchQuery);
    const matchesGender = gender ? genderField === gender : true;
    const matchesEducation = education ? educationField.toLowerCase() === education.toLowerCase() : true;
    const matchesCountry = country ? countryField.toLowerCase() === country.toLowerCase() : true;
    const matchesPlatform = platform ? platformField.toLowerCase() === platform.toLowerCase() : true;

    const matchesDateRange =
      (!dateRange[0] || createdDate.isAfter(dayjs(dateRange[0]))) &&
      (!dateRange[1] || createdDate.isBefore(dayjs(dateRange[1])));

    return (
      matchesSearch &&
      matchesGender &&
      matchesEducation &&
      matchesCountry &&
      matchesPlatform &&
      matchesDateRange
    );
  });

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
    <div className="mx-auto text-3xl pb-3">All Users</div>
    <div className="flex justify-between mb-5">
      <div className="bg-blue-900 h-[100px] w-[200px] rounded-lg text-white items-center flex flex-col justify-start text-2xl font-semibold "><div className=" ml-[20px] text-3xl font-semibold">25</div> Total users</div>
      <div className="bg-blue-900 h-[100px] w-[200px] rounded-lg text-white items-center flex flex-col justify-start text-2xl font-semibold "><div className=" ml-[20px] text-3xl font-semibold">25</div> Total users</div>
      <div className="bg-blue-900 h-[100px] w-[200px] rounded-lg text-white items-center flex flex-col justify-start text-2xl font-semibold "><div className=" ml-[20px] text-3xl font-semibold">25</div> Total users</div>
      <div className="bg-blue-900 h-[100px] w-[200px] rounded-lg text-white items-center flex flex-col justify-start text-2xl font-semibold "><div className=" ml-[20px] text-3xl font-semibold">25</div> Total users</div>
    </div>
    {/* Filtering start here */}
    <Box sx={{ height:'100vh'  }}>
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      alignContent: "center",
      justifyContent:'left',
      backgroundColor: '',
      width: '100%',
      overflow: "hidden",
    }}
  >
        {/* Search Bar */}
        <div className="flex relative">
        {showicon && (
        <CiSearch className="absolute ml-20 top-3 text-gray-500" />
      )}
        <TextField
          label=""
          placeholder="Search.."
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          sx={{ paddingRight: "20px",width:'300px', "& .MuiInputBase-root": { height:'40px' } }}
          />
          </div>

        {/* Gender filtering */}
        <FormControl
  sx={{
    width: '120px',
    "& .MuiInputBase-root": {
      height: "40px",
    },
    marginRight: '10px',
  }}
>
  <Select
    sx={{ width: '120px', backgroundColor: 'white' }}
    value={gender} 
    onChange={handleGender}
    displayEmpty 
    inputProps={{ 'aria-label': 'Gender' }}
  >
    {/* Placeholder visible when value is empty */}
    <MenuItem value="" disabled>
      Select Gender
    </MenuItem>
    <MenuItem value={"male"}>Male</MenuItem>
    <MenuItem value={"female"}>Female</MenuItem>
    <MenuItem value={"other"}>Other</MenuItem>
  </Select>
</FormControl>

        {/* Education filtering */}
        <FormControl
          sx={{
            width:'200px',
            "& .MuiInputBase-root": {
              height: "40px",
            },
            marginRight:'10px'
          }}
          >
          <InputLabel id="education-select-label">Education</InputLabel>
          <Select
            sx={{ width: "200px",marginRight:'50px',backgroundColor:'white' }}
            labelId="education-select-label"
            id="education-select"
            value={education}
            label="Education"
            placeholder="Education"
            onChange={handleEducation}
            >
            <MenuItem value="">All</MenuItem>
            <MenuItem value={"Secondary education or high school"}>Secondary education or high school</MenuItem>
            <MenuItem value={"Bachelor's Degree"}>Bachelor's Degree</MenuItem>
            <MenuItem value={"Master's Degree"}>Master's Degree</MenuItem>
            <MenuItem value={"Doctorate or higher"}>Doctorate or higher</MenuItem>
            <MenuItem value={"Primary education"}>Primary education</MenuItem>
            <MenuItem value={"doctorate"}>Doctorate</MenuItem>
          </Select>
        </FormControl>

        {/* Country filtering */}
        <FormControl
          sx={{
            width:'100px',
            "& .MuiInputBase-root": {
              height: "40px",
            },
            marginRight:'10px'
          }}
          >
          <InputLabel id="country-select-label">Country</InputLabel>
          <Select
            sx={{ width: "150px",backgroundColor:'white' }}
            labelId="country-select-label"
            id="country-select"
            value={country}
            label="Country"
            onChange={handleCountry}
            >
            <MenuItem value="">All</MenuItem>
            <MenuItem value={"US"}>USA</MenuItem>
            <MenuItem value={"IN"}>India</MenuItem>
            <MenuItem value={"UK"}>UK</MenuItem>
            <MenuItem value={"PK"}>pakistan</MenuItem>
          </Select>
        </FormControl>

        {/* Platform filtering */}
        <FormControl
          sx={{
            width:'150px',
            "& .MuiInputBase-root": {
              height: "40px",
              
            },
            marginLeft:'50px'
          }}
          >
          <InputLabel id="platform-select-label">Platform</InputLabel>
          <Select
            sx={{ width: "200px",backgroundColor:'white' }}
            labelId="platform-select-label"
            id="platform-select"
            value={platform}
            label="Platform"
            onChange={handlePlatform}
            >
            <MenuItem value="">All</MenuItem>
            <MenuItem value={"web"}>Web</MenuItem>
            <MenuItem value={"mobile"}>Mobile</MenuItem>
            <MenuItem value={"desktop"}>Desktop</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Date Range Picker */}
      <Box sx={{ marginTop: 2, marginBottom: 2}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
          sx={{}}
            startText="Start Date"
            endText="End Date"
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue)}
            />
        </LocalizationProvider>
      </Box>
  {/* Pagination */}
  <div style={{ display: "flex",paddingBottom:'10px', justifyContent: "flex-end" }}>
    <Pagination
      count={Math.ceil(filteredData.length / rowsPerPage)}
      page={page + 1}
      onChange={handleChangePage}
      color="primary"
      />
  </div>
      <TableContainer
  component={Paper}
  sx={{
    maxWidth: "100%",
    margin: "0 auto",
    height: "auto",
    position: "relative",
    maxHeight: "400px", 
    overflowY: "auto",
  }}
  className="scrollbar-thin"  
>
  <div
    style={{
      width: "100%",
      scrollbarWidth: "thin", 
      msOverflowStyle: "none", 
    }}
  >
    <Table
      sx={{
        width: "100%",
        margin: 0,
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        overflow: "auto",
      }}
      aria-label="user table"
    >
      <TableHead>
        <TableRow>
          <TableCell>Email😎</TableCell>
          <TableCell align="center">Phone Number😉</TableCell>
          <TableCell align="center">Username</TableCell>
          <TableCell align="center">DOB</TableCell>
          <TableCell align="center">Gender</TableCell>
          <TableCell align="center">Education</TableCell>
          <TableCell align="center">Country</TableCell>
          <TableCell align="center">Role</TableCell>
          <TableCell align="center">Created</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {paginatedData.map((row) => (
          <TableRow key={row._id}>
            <TableCell>{row.email || "NA"}</TableCell>
            <TableCell align="center">{row.phoneNumber || "NA"}</TableCell>
   
            <TableCell align="center">{row.username || "NA"}</TableCell>
            <TableCell align="center">{row.dateofbirth || "NA"}</TableCell>
            <TableCell align="center">{row.gender || "NA"}</TableCell>
            <TableCell align="center">{row.education || "NA"}</TableCell>
            <TableCell align="center">{row.country || "NA"}</TableCell>
            <TableCell align="center">{row.role || "NA"}</TableCell>
            <TableCell align="center">
              {row.created ? new Date(row.created).toLocaleDateString() : "NA"}
            </TableCell>
          </TableRow>
        ))}
        
      </TableBody>
    </Table>
  </div>
</TableContainer>

      </Box>
          </>
  );
}
