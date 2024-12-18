import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { handleUserData } from "../redux/store/action";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const AdminPanel = () => {
  const { user, loading, error } = useSelector((state) => state.getData);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsperpage, setRowsperpage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  // Date filter states
  const [customFilter, setCustomFilter] = useState(false);
  const [startDate, setStartDate] = useState(new Date().toLocaleDateString());
  const [endDate, setEndDate] = useState(new Date().toLocaleDateString());
  const [filteredByDate, setFilteredByDate] = useState(false);
  const [applyFilter, setApplyFilter] = useState(false);
  const indexOfLastitem = currentPage * rowsperpage;
  const indexOfFirstitem = indexOfLastitem - rowsperpage;

  // Handle Apply Filter Button
  const handleApplyFilter = () => {
    setFilteredByDate(true);
    setApplyFilter(true)
    setCurrentPage(1);
  };

  // Handle Reset Filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedGender("");
    setSelectedEducation("");
    setSelectedCountry("");
    setStartDate(null);
    setEndDate(null);
    setFilteredByDate(false);
    setApplyFilter(false)
    setCustomFilter(false)
  };

  // Filter the data based on the search and selected filters
  const filteredData = user.filter((item) => {
    if (!applyFilter) return true;
    const matchesSearchTerm =
      item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase());
  
    const matchesGender = selectedGender
      ? item.gender === selectedGender
      : true;
  
    const matchesEducation = selectedEducation
      ? item.education === selectedEducation
      : true;
  
    const matchesCountry = selectedCountry
      ? item.country === selectedCountry
      : true;
  
    // Calculate the current custom date range
    const itemDate = new Date(item.created); 
    let matchesCustomDate = true;
  
    if (customFilter === "day") {
      matchesCustomDate =
        itemDate.toDateString() === currentDate.toDateString(); // Same day comparison
    } else if (customFilter === "Week") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      matchesCustomDate =
        itemDate >= startOfWeek && itemDate <= endOfWeek; // Date falls within the current week
    } else if (customFilter === "Month") {
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      matchesCustomDate =
        itemDate >= startOfMonth && itemDate <= endOfMonth; // Date falls within the current month
    }
  
    // Date picker logic (Start and End Date)
    const matchesDate =
      !filteredByDate ||
      (startDate && endDate
        ? itemDate >= new Date(startDate) && itemDate <= new Date(endDate)
        : true);
  
    // Combine all filters
    return (
      matchesSearchTerm &&
      matchesGender &&
      matchesEducation &&
      matchesCountry &&
      matchesDate &&
      matchesCustomDate
    );
  });
  
      
      const currentItem = filteredData.slice(indexOfFirstitem, indexOfLastitem);
      
      const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredData.length / rowsperpage)) {
          setCurrentPage((prev) => prev + 1);
        }
      };
      
      const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }
      };

    const handleSearch = (event) => {
    const query = event.target.value.trim().toLowerCase();
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handleCustom =(e)=>{
    setCustomFilter(e.target.value);
  }
  useEffect(() => {
    dispatch(handleUserData());
  }, [dispatch]);

  // Format date to "Tuesday, 17 Dec 2024"
const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

// Get the Week range
const getWeekRange = (date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay()); 
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); 
  return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
};

// Get the Month range
const getMonthRange = (date) => {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return `${formatDate(startOfMonth)} - ${formatDate(endOfMonth)}`;
};

// Handle left and right arrow clicks
const handleArrowClick = (direction) => {
  const newDate = new Date(currentDate);
  if (customFilter === "day") {
    newDate.setDate(newDate.getDate() + (direction === "left" ? -1 : 1));
  } else if (customFilter === "Week") {
    newDate.setDate(newDate.getDate() + (direction === "left" ? -7 : 7));
  } else if (customFilter === "Month") {
    newDate.setMonth(newDate.getMonth() + (direction === "left" ? -1 : 1));
  }
  setCurrentDate(newDate);
};
  //Country array
  const allContries = [
    { name: "Afghanistan", code: "AF" },
    { name: "Aland Islands", code: "AX" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "American Samoa", code: "AS" },
    { name: "Andorra", code: "AD" },
    { name: "Angola", code: "AO" },
    { name: "Anguilla", code: "AI" },
    { name: "Antarctica", code: "AQ" },
    { name: "Antigua and Barbuda", code: "AG" },
    { name: "Argentina", code: "AR" },
    { name: "Armenia", code: "AM" },
    { name: "Aruba", code: "AW" },
    { name: "Australia", code: "AU" },
    { name: "Austria", code: "AT" },
    { name: "Azerbaijan", code: "AZ" },
    { name: "Bahamas", code: "BS" },
    { name: "Bahrain", code: "BH" },
    { name: "Bangladesh", code: "BD" },
    { name: "Barbados", code: "BB" },
    { name: "Belarus", code: "BY" },
    { name: "Belgium", code: "BE" },
    { name: "Belize", code: "BZ" },
    { name: "Benin", code: "BJ" },
    { name: "Bermuda", code: "BM" },
    { name: "Bhutan", code: "BT" },
    { name: "Bolivia", code: "BO" },
    { name: "Bosnia and Herzegovina", code: "BA" },
    { name: "Botswana", code: "BW" },
    { name: "Bouvet Island", code: "BV" },
    { name: "Brazil", code: "BR" },
    { name: "British Indian Ocean Territory", code: "IO" },
    { name: "Brunei Darussalam", code: "BN" },
    { name: "Bulgaria", code: "BG" },
    { name: "Burkina Faso", code: "BF" },
    { name: "Burundi", code: "BI" },
    { name: "Cambodia", code: "KH" },
    { name: "Cameroon", code: "CM" },
    { name: "Canada", code: "CA" },
    { name: "Cape Verde", code: "CV" },
    { name: "Cayman Islands", code: "KY" },
    { name: "Central African Republic", code: "CF" },
    { name: "Chad", code: "TD" },
    { name: "Chile", code: "CL" },
    { name: "China", code: "CN" },
    { name: "Christmas Island", code: "CX" },
    { name: "Cocos (Keeling) Islands", code: "CC" },
    { name: "Colombia", code: "CO" },
    { name: "Comoros", code: "KM" },
    { name: "Congo", code: "CG" },
    { name: "Congo, The Democratic Republic of the", code: "CD" },
    { name: "Cook Islands", code: "CK" },
    { name: "Costa Rica", code: "CR" },
    { name: "Cote D'Ivoire", code: "CI" },
    { name: "Croatia", code: "HR" },
    { name: "Cuba", code: "CU" },
    { name: "Cyprus", code: "CY" },
    { name: "Czech Republic", code: "CZ" },
    { name: "Denmark", code: "DK" },
    { name: "Djibouti", code: "DJ" },
    { name: "Dominica", code: "DM" },
    { name: "Dominican Republic", code: "DO" },
    { name: "Ecuador", code: "EC" },
    { name: "Egypt", code: "EG" },
    { name: "El Salvador", code: "SV" },
    { name: "Equatorial Guinea", code: "GQ" },
    { name: "Eritrea", code: "ER" },
    { name: "Estonia", code: "EE" },
    { name: "Ethiopia", code: "ET" },
    { name: "Falkland Islands (Malvinas)", code: "FK" },
    { name: "Faroe Islands", code: "FO" },
    { name: "Fiji", code: "FJ" },
    { name: "Finland", code: "FI" },
    { name: "France", code: "FR" },
    { name: "French Guiana", code: "GF" },
    { name: "French Polynesia", code: "PF" },
    { name: "French Southern Territories", code: "TF" },
    { name: "Gabon", code: "GA" },
    { name: "Gambia", code: "GM" },
    { name: "Georgia", code: "GE" },
    { name: "Germany", code: "DE" },
    { name: "Ghana", code: "GH" },
    { name: "Gibraltar", code: "GI" },
    { name: "Greece", code: "GR" },
    { name: "Greenland", code: "GL" },
    { name: "Grenada", code: "GD" },
    { name: "Guadeloupe", code: "GP" },
    { name: "Guam", code: "GU" },
    { name: "Guatemala", code: "GT" },
    { name: "Guernsey", code: "GG" },
    { name: "Guinea", code: "GN" },
    { name: "Guinea-Bissau", code: "GW" },
    { name: "Guyana", code: "GY" },
    { name: "Haiti", code: "HT" },
    { name: "Heard Island and Mcdonald Islands", code: "HM" },
    { name: "Holy See (Vatican City State)", code: "VA" },
    { name: "Honduras", code: "HN" },
    { name: "Hong Kong", code: "HK" },
    { name: "Hungary", code: "HU" },
    { name: "Iceland", code: "IS" },
    { name: "India", code: "IN" },
    { name: "Indonesia", code: "ID" },
    { name: "Iran, Islamic Republic Of", code: "IR" },
    { name: "Iraq", code: "IQ" },
    { name: "Ireland", code: "IE" },
    { name: "Isle of Man", code: "IM" },
    { name: "Israel", code: "IL" },
    { name: "Italy", code: "IT" },
    { name: "Jamaica", code: "JM" },
    { name: "Japan", code: "JP" },
    { name: "Jersey", code: "JE" },
    { name: "Jordan", code: "JO" },
    { name: "Kazakhstan", code: "KZ" },
    { name: "Kenya", code: "KE" },
    { name: "Kiribati", code: "KI" },
    { name: "Korea, Democratic PeopleS Republic of", code: "KP" },
    { name: "Korea, Republic of", code: "KR" },
    { name: "Kuwait", code: "KW" },
    { name: "Kyrgyzstan", code: "KG" },
    { name: "Lao People'S Democratic Republic", code: "LA" },
    { name: "Latvia", code: "LV" },
    { name: "Lebanon", code: "LB" },
    { name: "Lesotho", code: "LS" },
    { name: "Liberia", code: "LR" },
    { name: "Libyan Arab Jamahiriya", code: "LY" },
    { name: "Liechtenstein", code: "LI" },
    { name: "Lithuania", code: "LT" },
    { name: "Luxembourg", code: "LU" },
    { name: "Macao", code: "MO" },
    { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
    { name: "Madagascar", code: "MG" },
    { name: "Malawi", code: "MW" },
    { name: "Malaysia", code: "MY" },
    { name: "Maldives", code: "MV" },
    { name: "Mali", code: "ML" },
    { name: "Malta", code: "MT" },
    { name: "Marshall Islands", code: "MH" },
    { name: "Martinique", code: "MQ" },
    { name: "Mauritania", code: "MR" },
    { name: "Mauritius", code: "MU" },
    { name: "Mayotte", code: "YT" },
    { name: "Mexico", code: "MX" },
    { name: "Micronesia, Federated States of", code: "FM" },
    { name: "Moldova, Republic of", code: "MD" },
    { name: "Monaco", code: "MC" },
    { name: "Mongolia", code: "MN" },
    { name: "Montenegro", code: "ME" },
    { name: "Montserrat", code: "MS" },
    { name: "Morocco", code: "MA" },
    { name: "Mozambique", code: "MZ" },
    { name: "Myanmar", code: "MM" },
    { name: "Namibia", code: "NA" },
    { name: "Nauru", code: "NR" },
    { name: "Nepal", code: "NP" },
    { name: "Netherlands", code: "NL" },
    { name: "Netherlands Antilles", code: "AN" },
    { name: "New Caledonia", code: "NC" },
    { name: "New Zealand", code: "NZ" },
    { name: "Nicaragua", code: "NI" },
    { name: "Niger", code: "NE" },
    { name: "Nigeria", code: "NG" },
    { name: "Niue", code: "NU" },
    { name: "Norfolk Island", code: "NF" },
    { name: "Northern Mariana Islands", code: "MP" },
    { name: "Norway", code: "NO" },
    { name: "Oman", code: "OM" },
    { name: "Pakistan", code: "PK" },
    { name: "Palau", code: "PW" },
    { name: "Palestinian Territory, Occupied", code: "PS" },
    { name: "Panama", code: "PA" },
    { name: "Papua New Guinea", code: "PG" },
    { name: "Paraguay", code: "PY" },
    { name: "Peru", code: "PE" },
    { name: "Philippines", code: "PH" },
    { name: "Pitcairn", code: "PN" },
    { name: "Poland", code: "PL" },
    { name: "Portugal", code: "PT" },
    { name: "Puerto Rico", code: "PR" },
    { name: "Qatar", code: "QA" },
    { name: "Reunion", code: "RE" },
    { name: "Romania", code: "RO" },
    { name: "Russian Federation", code: "RU" },
    { name: "RWANDA", code: "RW" },
    { name: "Saint Helena", code: "SH" },
    { name: "Saint Kitts and Nevis", code: "KN" },
    { name: "Saint Lucia", code: "LC" },
    { name: "Saint Pierre and Miquelon", code: "PM" },
    { name: "Saint Vincent and the Grenadines", code: "VC" },
    { name: "Samoa", code: "WS" },
    { name: "San Marino", code: "SM" },
    { name: "Sao Tome and Principe", code: "ST" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Senegal", code: "SN" },
    { name: "Serbia", code: "RS" },
    { name: "Seychelles", code: "SC" },
    { name: "Sierra Leone", code: "SL" },
    { name: "Singapore", code: "SG" },
    { name: "Slovakia", code: "SK" },
    { name: "Slovenia", code: "SI" },
    { name: "Solomon Islands", code: "SB" },
    { name: "Somalia", code: "SO" },
    { name: "South Africa", code: "ZA" },
    { name: "South Georgia and the South Sandwich Islands", code: "GS" },
    { name: "Spain", code: "ES" },
    { name: "Sri Lanka", code: "LK" },
    { name: "Sudan", code: "SD" },
    { name: "Suriname", code: "SR" },
    { name: "Svalbard and Jan Mayen", code: "SJ" },
    { name: "Swaziland", code: "SZ" },
    { name: "Sweden", code: "SE" },
    { name: "Switzerland", code: "CH" },
    { name: "Syrian Arab Republic", code: "SY" },
    { name: "Taiwan, Province of China", code: "TW" },
    { name: "Tajikistan", code: "TJ" },
    { name: "Tanzania, United Republic of", code: "TZ" },
    { name: "Thailand", code: "TH" },
    { name: "Timor-Leste", code: "TL" },
    { name: "Togo", code: "TG" },
    { name: "Tokelau", code: "TK" },
    { name: "Tonga", code: "TO" },
    { name: "Trinidad and Tobago", code: "TT" },
    { name: "Tunisia", code: "TN" },
    { name: "Turkey", code: "TR" },
    { name: "Turkmenistan", code: "TM" },
    { name: "Turks and Caicos Islands", code: "TC" },
    { name: "Tuvalu", code: "TV" },
    { name: "Uganda", code: "UG" },
    { name: "Ukraine", code: "UA" },
    { name: "United Arab Emirates", code: "AE" },
    { name: "United Kingdom", code: "GB" },
    { name: "United States", code: "US" },
    { name: "United States Minor Outlying Islands", code: "UM" },
    { name: "Uruguay", code: "UY" },
    { name: "Uzbekistan", code: "UZ" },
    { name: "Vanuatu", code: "VU" },
    { name: "Venezuela", code: "VE" },
    { name: "Viet Nam", code: "VN" },
    { name: "Virgin Islands, British", code: "VG" },
    { name: "Virgin Islands, U.S.", code: "VI" },
    { name: "Wallis and Futuna", code: "WF" },
    { name: "Western Sahara", code: "EH" },
    { name: "Yemen", code: "YE" },
    { name: "Zambia", code: "ZM" },
    { name: "Zimbabwe", code: "ZW" },
  ];

  //Education array
  const educationList = [
    { text: "No formal education", value: "No formal education" },
    { text: "Primary education", value: "Primary education" },
    {
      text: "Secondary education",
      value: "Secondary education",
    },
    { text: "High School Diploma/GED", value: "GED" },
    { text: "Bachelor's Degree", value: "Bachelor's Degree" },
    { text: "Master's Degree", value: "Master's Degree" },
    { text: "Doctorate or higher", value: "Doctorate or higher" },
    { text: "Other", value: "Other" },
  ];

  const verifiedUsers = filteredData.filter(
    (item) => item.verification === true
  ).length;
  const pendingUsers = filteredData.filter(
    (item) => item.verification === false
  ).length;
  const guestUsers = filteredData.filter(
    (item) => item.isGuest === true
  ).length;

  //Date variables
  return (
    <div className="overflow-x-none overflow-y-auto h-[100%] bg-[#EDEDED]">
      <div className="font-semibold text-3xl text-center mt-5">Users List</div>
      {/* Filter Boxes and Reset Button */}
      <div className="flex gap-2 justify-center mt-5">
        {/* Filter Boxes */}
        <div className="flex flex-col p-3 w-full lg:flex-row gap-8 justify-center">
          <div className="relative w-full lg:w-52 h-32 bg-[#175676] text-white flex flex-col justify-center rounded-2xl items-center text-md">
            <div className="absolute top-[30px] left-[30px] text-2xl font-medium mb-5">
            {filteredData.length}
            </div>
            <div className="absolute top-[60px] left-[30px] text-base font-base mb-5">
             Total Users
            </div>
          </div>
          <div className="relative w-full lg:w-52 h-32 bg-[#175676] text-white flex flex-col justify-center rounded-2xl items-center text-md">
            <div className="absolute top-[30px] left-[30px] text-2xl font-medium mb-5">
            {verifiedUsers}
            </div>
            <div className="absolute top-[60px] left-[30px] text-base font-base mb-5">
             verified Users
            </div>
          </div>
          <div className="relative w-full lg:w-52 h-32 bg-[#175676] text-white flex flex-col justify-center rounded-2xl items-center text-md">
            <div className="absolute top-[30px] left-[30px] text-2xl font-medium mb-5">
            {pendingUsers}
            </div>
            <div className="absolute top-[60px] left-[30px] text-base font-base mb-5">
             Pending Users
            </div>
          </div>
          <div className="relative w-full lg:w-52 h-32 bg-[#175676] text-white flex flex-col justify-center rounded-2xl items-center text-md">
            <div className="absolute top-[30px] left-[30px] text-2xl font-medium mb-5">
            {pendingUsers}
            </div>
            <div className="absolute top-[60px] left-[30px] text-base font-base mb-5">
             Pending Users
            </div>
          </div>
        </div>
      </div>
      {/* Filters and Date Picker */}
      <div className="flex flex-col justify-between mt-5">
        <div className="flex flex-col mx-auto lg:flex lg:flex-row gap-3 justify-center">
          {/*Custom*/}
          <select
        name="customFilter"
        id="customFilter"
        onChange={handleCustom}
        value={customFilter}
        className="w-[80vw] mx-auto lg:w-[240px] text-center rounded-md h-[45px] border-[1px] border-black"
      >
        <option value="">Custom</option>
        <option value="day">Day</option>
        <option value="Week">Week</option>
        <option value="Month">Month</option>
      </select>
          {/*custom input*/}
          {customFilter && (
        <div className="w-[80vw] border-[1px] border-black text-center bg-white lg:w-[455px] h-[45px] flex items-center justify-between rounded-xl">
          <span
            className="text-3xl text-black cursor-pointer"
            onClick={() => handleArrowClick("left")}
          >
            <FaArrowAltCircleLeft className="ml-2"/>
          </span>
          <span className="text-gray-700 text-lg">
            {customFilter === "day" && formatDate(currentDate)}
            {customFilter === "Week" && getWeekRange(currentDate)}
            {customFilter === "Month" && getMonthRange(currentDate)}
          </span>
          <span
            className="text-3xl text-black cursor-pointer"
            onClick={() => handleArrowClick("right")}
          >
            <FaArrowAltCircleRight className="mr-2"/>
          </span>
        </div>
      )}
          {/* Date Picker */}
          {!customFilter&&(
            <><div className="flex items-center">
              <div className="relative">
            <span className="absolute top-[9px] left-9 z-10 font-bold">From: </span>
            <DatePicker
              dateFormat={"dd-MM-yy"}
              maxDate={endDate ? new Date(endDate) : null}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="rounded-lg h-[43px] w-[230px] text-center border-[1px] border-black"
              placeholderText={startDate}
            />
            </div>
          </div>

          <div className="flex items-center">
          <div className="relative">
            <span className="absolute top-[9px] left-14 z-10 font-bold">To: </span>
            <DatePicker
              dateFormat={"dd-MM-yy"}
              maxDate={startDate ? new Date(startDate) : null}
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="rounded-lg h-[43px] w-[230px] text-black text-center border-[1px] border-black"
              placeholderText={startDate}
            />
            </div>
          </div></>)}

          {/* Apply Filter Button */}
          <button
            onClick={handleApplyFilter}
            className="bg-[#175676] text-white p-2 w-[200px] rounded-lg"
          >
            Apply Date Filter
          </button>
          {/* Reset Button */}
          
        </div>
        {/* Other Filters */}
        <div className="grid lg:flex gap-1 justify-center mt-4">
          {/* Search Bar */}
          <div className="relative w-[80vw] lg:w-[277px]">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-800 text-2xl " />
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-[35px] lg:h-[45px] pl-10 border-[1px] border-black rounded-md outline-none"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Gender Filter */}
          <select
            name="gender"
            className="w-[80vw] lg:w-[160px] rounded-md h-[45px] text-center outline-none border-[1px] border-black"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* Education Filter */}
          <select
            name="education"
            className="w-[80vw] lg:w-[160px] rounded-lg h-[45px] text-center outline-none border-[1px] border-black"
            value={selectedEducation}
            onChange={(e) => setSelectedEducation(e.target.value)}
          >
            <option value="">Education</option>
            {educationList &&
              educationList.map((edu) => {
                return <option value={edu.value}>{edu.text}</option>;
              })}
          </select>
          {/* Country Filter */}
          <select
            name="country"
            className="w-[80vw] lg:w-[160px] rounded-lg h-[45px] text-center outline-none border-[1px] border-black"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Country</option>
            {allContries &&
              allContries.map((countries) => {
                return (
                  <option key={countries.code} value={countries.code}>
                    {countries.name}
                  </option>
                );
              })}
          </select>
          {/* Platform Filter */}
          <select
            name="country"
            className="w-[80vw] lg:w-[160px] rounded-lg h-[45px] text-center outline-none border-[1px] border-black"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Platform</option>
            {allContries &&
              allContries.map((countries) => {
                return (
                  <option key={countries.code} value={countries.code}>
                    {countries.name}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      {/*pagination*/}
      <div className="flex justify-between mt-8 mb-8">
        <span className="ml-11 text-sm flex mt-3 font-semibold flex-col lg:text-lg justify-normal">Users:{filteredData.length}</span>
        <div className="flex text-sm mr-4  lg:text-lg">
          <span className="mr-5 mt-3">
            {indexOfFirstitem + 1}-
            {Math.min(indexOfLastitem, filteredData.length)} of{" "}
            {filteredData.length}
          </span>
          <span
            className="text-4xl text-[#4ba3c3] cursor-pointer mr-[-6px]"
            onClick={handlePreviousPage}
          >
            <IoIosArrowDropleftCircle className="text-[50px]"/>
          </span>
          <span
            className="text-4xl text-[#4ba3c3] cursor-pointer mr-4"
            onClick={handleNextPage}
          >
            <IoIosArrowDroprightCircle className="text-[50px] "/>
          </span>
        </div>
      </div>
      {/* Table of Users */}
<div className="flex justify-center items-center mt-2 ">
  <div className="w-[90vw] lg:w-auto mx-auto max-w-screen-xl">
    <div className="h-auto border border-gray-300 rounded-md">
      <div className=" max-h-auto">
        <table className="min-w-[60vw] bg-white border-collapse border-gray-300 shadow-lg">
          <thead className="bg-white">
            <tr>
              <th className="px-4 py-7 border-b border-white text-left font-normal">
                Id
              </th>
              <th className="px-4 py-7 border-b border-white text-left font-normal">
                Username
              </th>
              <th className="px-4 py-7 border-b border-white text-left font-normal">
                Email
              </th>
              <th className="px-4 py-7 border-b border-white text-left font-normal">
                DOB
              </th>
              <th className="px-4 py-7 border-b border-white text-left font-normal">
                Gender
              </th>
              <th className="px-4 py-7 border-b border-white text-left font-normal">
                Education
              </th>
              <th className="px-4 py-7 border-b border-white text-left font-normal">
                Country
              </th>
              <th className="px-4 py-7 border-b border-white text-left font-normal">
                Role
              </th>
              <th className="px-4 py-7 border-b border-white text-left font-normal">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItem.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-2 py-4 border-b text-center border-gray-300">
                  {index + 1}
                </td>
                <td className="px-2 py-4 border-b text-center border-gray-300">
                  {item.username}
                </td>
                <td className="px-2 py-4 border-b text-center border-gray-300">
                  {item.email || "N/A"}
                </td>
                <td className="px-2 py-4 border-b text-center border-gray-300">
                  {item.dateofbirth || "N/A"}
                </td>
                <td className="px-2 py-4 border-b text-center border-gray-300">
                  {item.gender || "N/A"}
                </td>
                <td className="px-2 py-4 border-b text-center border-gray-300">
                  {item.education || "N/A"}
                </td>
                <td className="px-2 py-4 border-b text-center border-gray-300">
                  {item.country || "N/A"}
                </td>
                <td className="px-2 py-4 border-b text-center border-gray-300">
                  {item.role || "N/A"}
                </td>
                <td className="px-2 py-4 border-b text-center border-gray-300">
                  {new Date(item.created).toLocaleDateString("en-US") || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>


      {/* Pagination */}
      <div className="flex justify-between mt-8 mb-8">
        <span className="ml-11 text-sm flex mt-3 font-semibold flex-col lg:text-lg justify-normal">Users:{filteredData.length}</span>
        <div className="flex text-sm mr-4  lg:text-lg">
          <span className="mr-5 mt-3">
            {indexOfFirstitem + 1}-
            {Math.min(indexOfLastitem, filteredData.length)} of{" "}
            {filteredData.length}
          </span>
          <span
            className="text-4xl text-[#4ba3c3] cursor-pointer mr-[-6px]"
            onClick={handlePreviousPage}
          >
            <IoIosArrowDropleftCircle className="text-[50px]"/>
          </span>
          <span
            className="text-4xl text-[#4ba3c3] cursor-pointer mr-4"
            onClick={handleNextPage}
          >
            <IoIosArrowDroprightCircle className="text-[50px] "/>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
