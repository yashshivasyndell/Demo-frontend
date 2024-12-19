import React, { useState } from "react";
import axios from "axios";
const Addwords = () => {
  const [activeSection, setActiveSection] = useState("addWord");
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isFocusedWord, setIsFocusedWord] = useState(false);
  const [inputValueWord, setInputValueWord] = useState("");
  const [isFocusedZoundslike, setIsFocusedZoundslike] = useState(false);
  const [inputValueZoundslike, setInputValueZoundslike] = useState("");
  const [isFocusedHomonym, setIsFocusedHomonym] = useState(false);
  const [inputValueHomonym, setInputValueHomonym] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isFocusedRemoveHomonym, setIsFocusedRemoveHomonym] = useState(false);
  const [inputValueRemoveHomonym, setInputValueRemoveHomonym] = useState("");

  {
    /*words states*/
  }
  const [language, setLang] = useState("English");
  const [level, setLevel] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = async () => {
    try {
      const resp = await axios.post("http://localhost:3000/words/addwords", {
        language,
        level,
        topic,
        word: inputValue,
        sentence: inputValueWord,
      });

      console.log("Word added successfully:", resp.data);
      if (resp.status === 201) {
        setShowStatus(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setShowError(true);
        setShowStatus(false);
      } else {
        console.error("Error adding word:", error);
      }
    }
  };

  {
    /*deleting*/
  }
  const [showDeleted, setShowDeleteWord] = useState(false);
  const [errorDelete, setErrorDelete] = useState(false);
  const [Rlanguage, setRlanguage] = useState("");

  const handleDelete = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:3000/words/deleteWord",
        {
          language,
          word: inputValue,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Word deleted successfully:", resp.data);
      if (resp.status === 200) {
        setShowDeleteWord(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setErrorDelete(true);
        setShowDeleteWord(false);
      } else {
        console.error("Error deleting word!:", error);
      }
    }
  };

  {
    /*Homonym adding*/
  }

  const [ShowHomonymStatus, setShowHomonymStatus] = useState(false);
  const [ShowHomonymError, setShowHomonymError] = useState(false);
  const handleAddHomonym = async () => {
    try {
      const res = await axios.post("http://localhost:3000/words/addhomonym", {
        word: inputValueWord,
        homonym: inputValueHomonym,
      });
      console.log("the status homo ", res.status);
      if (res.status === 201) {
        setShowHomonymStatus(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setShowHomonymError(true);
        setShowHomonymStatus(false);
      } else {
        console.error("Error adding homonym:", error);
      }
    }
  };

  {/*Delete hhomonym*/}
  const [homoDelete,setHomoDelete] = useState(false)
  const handleDeleteHomonym = () => {
    try {
      const res = axios.post("http://localhost:3000/words/deletehomonym", {
        word:inputValueWord,
        homonym:inputValueHomonym,
      });
      console.log(res.status);
      if(res.status === 201){
        setHomoDelete(true)
      }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            setHomoDelete(false);
            
          } else {
            console.error("Error adding homonym:", error);
          }
    }
  };

  const handleCancel = () => {
    setLang("");
    setLevel("");
    setTopic("");
    setInputValue("");
    setInputValueWord("");
    setShowStatus(false);
    setShowError(false);
    setInputValue("");
    setShowDeleteWord(false);
    setShowHomonymError(false);
    setShowHomonymStatus(false);
    setInputValueHomonym("");
    setHomoDelete(false)
  };

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };
  const handleLangSelect = (e) => {
    console.log(e.target.value);
    setLang(e.target.value);
  };

  return (
    <div className="bg-[#f2f2f2] h-auto mx-auto">
      <h1 className="text-center text-3xl font-semibold p-3">Add words</h1>
      <div className="bg-white w-[75vw] rounded-md mx-auto p-10 mt-2">
        {/* Buttons */}
        <div className="flex justify-evenly">
          {/* Add Word Button */}
          <button
            className={`bg-[#4ba3c3] p-2 w-[200px] mt-6 text-white rounded-md shadow-xl ${
              activeSection === "addWord"
                ? "bg-[#4ba3c3] text-[#fff] border-2 border-[#4ba3c3]"
                : "bg-[#fff] text-[#7b6e6e] border-[1px] border-black"
            }`}
            onClick={() => handleButtonClick("addWord")}
          >
            Add Word
          </button>
          {/* Remove Word Button */}
          <button
            className={`bg-[#4ba3c3] p-2 w-[200px] mt-6 text-white rounded-md shadow-xl ${
              activeSection === "removeWord"
                ? "bg-[#4ba3c3] text-[#fff] border-2 border-[#4ba3c3]"
                : "bg-[#fff] text-[#7b6e6e] border-[1px] border-black"
            }`}
            onClick={() => handleButtonClick("removeWord")}
          >
            Remove Word
          </button>
          {/* Add Homonym Button */}
          <button
            className={`bg-[#4ba3c3] p-2 w-[200px] mt-6 text-white rounded-md shadow-xl ${
              activeSection === "addHomo"
                ? "bg-[#4ba3c3] text-[#fff] border-2 border-[#4ba3c3]"
                : "bg-[#fff] text-[#7b6e6e] border-[1px] border-black"
            }`}
            onClick={() => handleButtonClick("addHomo")}
          >
            Add Homonym
          </button>
          {/* Remove Homonym Button */}
          <button
            className={`bg-[#4ba3c3] p-2 w-[200px] mt-6 text-white rounded-md shadow-xl ${
              activeSection === "removeHomo"
                ? "bg-[#4ba3c3] text-[#fff] border-2 border-[#4ba3c3]"
                : "bg-[#fff] text-[#7b6e6e] border-[1px] border-black"
            }`}
            onClick={() => handleButtonClick("removeHomo")}
          >
            Remove Homonym
          </button>
        </div>

        {/* Conditional Rendering Based on Active Section */}
        {/* Add Word Section */}
        {activeSection === "addWord" && (
          <div>
            <div className="grid gap-6 mt-14">
              <select
                onChange={(e) => {
                  setLang(e.target.value);
                }}
                value={language}
                name=""
                id=""
                className="w-[70vw] border-[1px] mx-auto border-black rounded-md bg-white"
              >
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="German">German</option>
                <option value="Japanese">Japanese</option>
                <option value="Italian">Italian</option>
                <option value="Russian">Russian</option>
                <option value="Hindi">Hindi</option>
              </select>
              <select
                onChange={(e) => setLevel(e.target.value)}
                value={level}
                name=""
                id=""
                className="w-[70vw] border-[1px] mx-auto border-black rounded-md bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <select
                onChange={(e) => {
                  setTopic(e.target.value);
                }}
                value={topic}
                name=""
                id=""
                className="w-[70vw] border-[1px] mx-auto border-black rounded-md bg-white"
              >
                <option value="">Select topic</option>
                <option value="Amounts">Amounts</option>
                <option value="Animals">Animals</option>
                <option value="Architecture">Architecture</option>
                <option value="Attire">Attire</option>
                <option value="Dining">Dining</option>
                <option value="Feelings">Feelings</option>
                <option value="Health">Health</option>
                <option value="Home">Home</option>
                <option value="Landscapes">Landscapes</option>
                <option value="Tech">Tech</option>
                <option value="Travel">Travel</option>
                <option value="Work">Work</option>
              </select>
            </div>
            <div className="grid gap-6 mt-10">
              <div className="relative">
                {/* Label */}
                <label
                  className={`absolute left-3 transition-all duration-300 
          ${
            isFocused || inputValue
              ? "top-[-20px] text-black text-sm"
              : "top-0 text-gray-500"
          }`}
                >
                  Word
                </label>

                {/* Input */}
                <input
                  type="text"
                  value={inputValue}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-[70vw] rounded-md mx-auto pl-4 border-[1px] border-black h-7"
                />
              </div>

              <div className="relative ">
                {/* Label */}
                <label
                  className={`absolute left-3 transition-all duration-300 
            ${
              isFocusedWord || inputValueWord
                ? "top-[-20px] text-black text-sm"
                : "top-0 text-gray-500"
            }`}
                >
                  Sentence
                </label>
                {/* Input */}
                <input
                  type="text"
                  value={inputValueWord}
                  onFocus={() => setIsFocusedWord(true)}
                  onBlur={() => setIsFocusedWord(false)}
                  onChange={(e) => setInputValueWord(e.target.value)}
                  className="w-[70vw] rounded-md mx-auto pl-4 border-[1px] border-black h-7"
                />
              </div>

              {/* Second Input */}
              <div className="relative">
                {/* Label */}
                <label
                  className={`absolute left-3 transition-all duration-300 
            ${
              isFocusedZoundslike || inputValueZoundslike
                ? "top-[-20px] text-black text-sm"
                : "top-0 text-gray-500"
            }`}
                >
                  Zoundslike
                </label>
                {/* Input */}
                <input
                  type="text"
                  value={inputValueZoundslike}
                  onFocus={() => setIsFocusedZoundslike(true)}
                  onBlur={() => setIsFocusedZoundslike(false)}
                  onChange={(e) => setInputValueZoundslike(e.target.value)}
                  className="w-[70vw] rounded-md mx-auto pl-4 border-[1px] border-black h-7"
                />
              </div>
            </div>
            {/*error and success*/}
            {showStatus && (
              <>
                <div className="text-green-400 mt-2 text-sm font-light">
                  Word added successfully
                </div>
              </>
            )}
            {showError && (
              <>
                <div className="text-red-400 mt-2 text-sm font-light">
                  Word already exists!
                </div>
              </>
            )}
            <div className="mt-5 flex gap-5 ">
              <button
                onClick={handleSubmit}
                className="bg-[#4ba3c3] text-white rounded-md p-1"
              >
                Add Word
              </button>
              <button
                onClick={handleCancel}
                className="bg-[#4ba3c3] text-white rounded-md p-1"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Remove Word Section */}
        {activeSection === "removeWord" && (
          <>
            <div className="grid gap-2 mt-10">
              <select
                value={language}
                onChange={handleLangSelect}
                name=""
                id=""
                className="w-[70vw] border-[1px] mx-auto mb-7 border-black rounded-md bg-white"
              >
                <option value="English">English</option>
                <option value="German">German</option>
                <option value="Japanese">Japanese</option>
                <option value="Italian">Italian</option>
                <option value="Russian">Russian</option>
                <option value="Hindi">Hindi</option>
              </select>
              <div className="relative">
                {/* Label */}
                <label
                  className={`absolute left-3 transition-all duration-200 
          ${
            isFocused || inputValue
              ? "top-[-20px] text-black text-sm"
              : "top-0 text-gray-500"
          }`}
                >
                  Word
                </label>

                {/* Input */}
                <input
                  type="text"
                  value={inputValue}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-[70vw] rounded-md mx-auto pl-4 border-[1px] border-black h-7"
                />
              </div>
              {showDeleted && (
                <>
                  <div className="text-green-500 font-light">
                    Deleted word successfully
                  </div>
                </>
              )}
              {showError && (
                <>
                  <div className="text-red-400 font-light mt-2">
                    Error in deleting word!
                  </div>
                </>
              )}
              <div className="mt-5 flex gap-5 ">
                <button
                  onClick={handleDelete}
                  className="bg-[#4ba3c3] mb-5 text-white rounded-md p-1"
                >
                  Delete Word
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-[#4ba3c3] mb-5 text-white rounded-md p-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}

        {/* Add Homonym Section */}
        {activeSection === "addHomo" && (
          <div className="grid gap-6 mt-10">
            {/* Word Input */}
            <div className="relative">
              <label
                className={`absolute left-3 transition-all duration-300 
                ${
                  isFocusedWord || inputValueWord
                    ? "top-[-20px] text-black text-sm"
                    : "top-0 text-gray-500"
                }`}
              >
                Word
              </label>
              <input
                type="text"
                value={inputValueWord}
                onFocus={() => setIsFocusedWord(true)}
                onBlur={() => setIsFocusedWord(false)}
                onChange={(e) => setInputValueWord(e.target.value)}
                className="w-[70vw] rounded-md mx-auto pl-4 border-[1px] border-black h-7"
              />
            </div>

            {/* Homonym Input */}
            <div className="relative">
              <label
                className={`absolute left-3 transition-all duration-300 
                ${
                  isFocusedHomonym || inputValueHomonym
                    ? "top-[-20px] text-black text-sm"
                    : "top-0 text-gray-500"
                }`}
              >
                Homonym
              </label>
              <input
                type="text"
                value={inputValueHomonym}
                onFocus={() => setIsFocusedHomonym(true)}
                onBlur={() => setIsFocusedHomonym(false)}
                onChange={(e) => setInputValueHomonym(e.target.value)}
                className="w-[70vw] rounded-md mx-auto pl-4 border-[1px] border-black h-7"
              />
            </div>
            {ShowHomonymStatus && (
              <>
                <div className="text-green-500 font-light text-sm">
                  Homonym and Word saved successfully
                </div>
              </>
            )}
            {ShowHomonymError && (
              <>
                <div className="text-red-500 font-light text-sm">
                  Word or Homonym already Exists!
                </div>
              </>
            )}
            <div className="mt-5 flex gap-5 ">
              <button
                onClick={handleAddHomonym}
                className="bg-[#4ba3c3] mb-5 text-white rounded-md p-1"
              >
                Add Homonym
              </button>
              <button
                onClick={handleCancel}
                className="bg-[#4ba3c3] mb-5 text-white rounded-md p-1"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Remove Homonym Section */}
        {activeSection === "removeHomo" && (
          <div className="grid gap-6 mt-10">
            {/* Word Input */}
            <div className="relative">
              <label
                className={`absolute left-3 transition-all duration-300 
        ${
          isFocusedWord || inputValueWord
            ? "top-[-20px] text-black text-sm"
            : "top-0 text-gray-500"
        }`}
              >
                Word
              </label>
              <input
                type="text"
                value={inputValueWord}
                onFocus={() => setIsFocusedWord(true)}
                onBlur={() => setIsFocusedWord(false)}
                onChange={(e) => setInputValueWord(e.target.value)}
                className="w-[70vw] rounded-md mx-auto pl-4 border-[1px] border-black h-7"
              />
            </div>

            {/* Homonym Input */}
            <div className="relative">
              <label
                className={`absolute left-3 transition-all duration-300
        ${
          isFocusedHomonym || inputValueHomonym
            ? "top-[-20px] text-black text-sm"
            : "top-0 text-gray-500"
        }`}
              >
                Homonym
              </label>
              <input
                type="text"
                value={inputValueHomonym}
                onFocus={() => setIsFocusedHomonym(true)}
                onBlur={() => setIsFocusedHomonym(false)}
                onChange={(e) => setInputValueHomonym(e.target.value)}
                className="w-[70vw] rounded-md mx-auto pl-4 border-[1px] border-black h-7"
              />
            </div>
            {homoDelete && <>
            <div className="text-red-500 text-sm ">
                Word and homonyn deleted successfully!
            </div>
            </>}
            <div className="mt-5 flex gap-5">
              <button
                onClick={handleDeleteHomonym}
                className="bg-[#4ba3c3] mb-5 text-white rounded-md p-1"
              >
                Delete Homonym
              </button>
              <button
                onClick={handleCancel}
                className="bg-[#4ba3c3] mb-5 text-white rounded-md p-1"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Addwords;
