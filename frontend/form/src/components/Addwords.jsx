import React, { useState } from 'react'

const Addwords = () => {
    // State for controlling visibility of each section
    const [activeSection, setActiveSection] = useState('addWord'); // 'addWord', 'removeWord', 'addHomo', 'removeHomo'

    // Handler for each button click to set the active section
    const handleButtonClick = (section) => {
        setActiveSection(section); // Change the active section based on the button clicked
    }

    return (
        <div className='bg-[#f2f2f2] h-screen mx-auto'>
            <h1 className='text-center text-3xl font-semibold p-3'>Add words</h1>
            <div className='bg-white w-[75vw] rounded-md mx-auto p-10 mt-2'>
                {/* Buttons */}
                <div className='flex justify-evenly'>
                    {/* Add Word Button */}
                    <button
                        className={`bg-[#4ba3c3] p-2 w-[200px] mt-6 text-white rounded-md shadow-xl ${activeSection === 'addWord' ? 'bg-[#4ba3c3] text-[#fff] border-2 border-[#4ba3c3]' : 'bg-[#fff] text-[#000] border-2 border-black'}`}
                        onClick={() => handleButtonClick('addWord')}
                    >
                        Add Word
                    </button>
                    {/* Remove Word Button */}
                    <button
                        className={`bg-[#4ba3c3] p-2 w-[200px] mt-6 text-white rounded-md shadow-xl ${activeSection === 'removeWord' ? 'bg-white text-[#4ba3c3] border-2 border-[#4ba3c3]' : ''}`}
                        onClick={() => handleButtonClick('removeWord')}
                    >
                        Remove Word
                    </button>
                    {/* Add Homonym Button */}
                    <button
                        className={`bg-[#4ba3c3] p-2 w-[200px] mt-6 text-white rounded-md shadow-xl ${activeSection === 'addHomo' ? 'bg-white text-[#4ba3c3] border-2 border-[#4ba3c3]' : ''}`}
                        onClick={() => handleButtonClick('addHomo')}
                    >
                        Add Homonym
                    </button>
                    {/* Remove Homonym Button */}
                    <button
                        className={`bg-[#4ba3c3] p-2 w-[200px] mt-6 text-white rounded-md shadow-xl ${activeSection === 'removeHomo' ? 'bg-white text-[#4ba3c3] border-2 border-[#4ba3c3]' : ''}`}
                        onClick={() => handleButtonClick('removeHomo')}
                    >
                        Remove Homonym
                    </button>
                </div>

                {/* Conditional Rendering Based on Active Section */}
                {/* Add Word Section */}
                {activeSection === 'addWord' && (
                    <div>
                        <div className='grid gap-6 mt-14'>
                            <select name="" id="" className='w-[70vw] border-[1px] mx-auto border-black rounded-md bg-white'>
                                <option value="">English</option>
                                <option value="">German</option>
                                <option value="">Japanese</option>
                                <option value="">Italian</option>
                                <option value="">Russian</option>
                                <option value="">Hindi</option>
                            </select>
                            <select name="" id="" className='w-[70vw] border-[1px] mx-auto border-black rounded-md bg-white'>
                                <option value="">Beginner</option>
                                <option value="">Intermediate</option>
                                <option value="">Advanced</option>
                            </select>
                            <select name="" id="" className='w-[70vw] border-[1px] mx-auto border-black rounded-md bg-white'>
                                <option value="">Select topic</option>
                                <option value="">Amounts</option>
                                <option value="">Animals</option>
                                <option value="">Architecture</option>
                                <option value="">Attire</option>
                                <option value="">Dining</option>
                                <option value="">Feelings</option>
                                <option value="">Health</option>
                                <option value="">Home</option>
                                <option value="">Landscapes</option>
                                <option value="">Tech</option>
                                <option value="">Travel</option>
                                <option value="">Work</option>
                            </select>
                        </div>
                        <div className='grid gap-6 mt-10'>
                            <input type="text" className='w-[70vw] rounded-md mx-auto pl-4 border-[1px] border-black' />
                            <input type="text" className='w-[70vw] rounded-md mx-auto pl-4 border-[1px] border-black' />
                            <input type="text" className='w-[70vw] rounded-md mx-auto pl-4 border-[1px] border-black' />
                        </div>
                        <div className='mt-5 flex gap-5 '>
                            <button className='bg-[#4ba3c3] text-white rounded-md p-1'>Add Word</button>
                            <button className='bg-[#4ba3c3] text-white rounded-md p-1'>Cancel</button>
                        </div>
                    </div>
                )}

                {/* Remove Word Section */}
                {activeSection === 'removeWord' && (
                    <div className='grid gap-6 mt-10'>
                        <input type="text" className='w-[70vw] rounded-md mx-auto pl-4 border-[1px] border-black' />
                        <input type="text" className='w-[70vw] rounded-md mx-auto pl-4 border-[1px] border-black' />
                    </div>
                )}

                {/* Add Homonym Section */}
                {activeSection === 'addHomo' && (
                    <div className='grid gap-6 mt-10'>
                        <input type="text" className='w-[70vw] rounded-md mx-auto pl-4 border-[1px] border-black' />
                        <input type="text" className='w-[70vw] rounded-md mx-auto pl-4 border-[1px] border-black' />
                    </div>
                )}

                {/* Remove Homonym Section */}
                {activeSection === 'removeHomo' && (
                    <div className='grid gap-6 mt-10'>
                        <input type="text" className='w-[70vw] rounded-md mx-auto pl-4 border-[1px] border-black' />
                        <input type="text" className='w-[70vw] rounded-md mx-auto pl-4 border-[1px] border-black' />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Addwords
