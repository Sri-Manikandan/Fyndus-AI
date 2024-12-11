import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Instruction() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <h1 className="font-bold text-3xl text-center my-6">INTERVIEW PROCESS</h1>
            <div className="flex justify-center items-center">
                <div className="flex flex-col md:flex-row gap-8 border-2 p-8 rounded-lg section-container bg-white shadow-lg">
                    <div className="section-box flex flex-col items-center p-6 border rounded-lg w-80">
                        <div className="icon-text flex items-center justify-center mb-4">
                            {/* <FaBullseye className="icon text-blue-500 text-3xl" /> */}
                            <h3 className="ml-2 text-xl font-semibold">Stay Focused</h3>
                        </div>
                        <p className="text-center">Once the interview begins, your screen will be monitored. Any diversions or prolonged absences will automatically end the interview.</p>
                    </div>

                    <div className="section-box flex flex-col items-center p-6 border rounded-lg w-80">
                        <div className="icon-text flex items-center justify-center mb-4">
                            {/* <FaFileAlt className="icon text-blue-500 text-3xl" /> */}
                            <h3 className="ml-2 text-xl font-semibold">Resume-Based Questions</h3>
                        </div>
                        <p className="text-center">Tailored questions will be asked based on your resume. Be prepared to answer questions about your experiences, skills, and achievements.</p>
                    </div>

                    <div className="section-box flex flex-col items-center p-6 border rounded-lg w-80">
                        <div className="icon-text flex items-center justify-center mb-4">
                            {/* <FaRobot className="icon text-blue-500 text-3xl" /> */}
                            <h3 className="ml-2 text-xl font-semibold">AI-Powered Evaluation</h3>
                        </div>
                        <p className="text-center">Get real-time feedback on your responses and performance, analyzed by our AI-powered model in real time, assessing both content and quality.</p>
                    </div>

                    <div className="section-box flex flex-col items-center p-6 border rounded-lg w-80">
                        <div className="icon-text flex items-center justify-center mb-4">
                            {/* <FaChartLine className="icon text-blue-500 text-3xl" /> */}
                            <h3 className="ml-2 text-xl font-semibold">Receive Your Performance Report</h3>
                        </div>
                        <p className="text-center">After the interview, get a detailed report on your performance, including insights and areas for improvement, which will be emailed to you.</p>
                    </div>
                </div>
            </div>

            <div className="terms-section flex justify-center mt-8">
                <input
                    type="checkbox"
                    id="termsCheckbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                />
                <label htmlFor="termsCheckbox" className="terms-label text-sm">
                    I agree to the terms and conditions
                </label>
            </div>

            <div className="flex justify-center mt-6">
                <Link
                    to="/Interview"
                    className={`inline-flex items-center rounded-md bg-indigo-500 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                        !isChecked ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                    disabled={!isChecked}
                >
                    Continue
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-2 h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        />
                    </svg>
                </Link>
            </div>
        </>
    );
}

export default Instruction;
