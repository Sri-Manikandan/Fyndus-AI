import React, { useState, useEffect } from 'react';
import SubInterview from '../components/SubInterview';

const Interview = () => {
  const [timer, setTimer] = useState(0);
  const [currentRound, setCurrentRound] = useState("Technical");

  const totalTime = 30 * 60; // Total interview time in seconds (30 minutes)
  const roundDurations = {
    Technical: 10 * 60,
    Project: 10 * 60,
    HR: 10 * 60,
  };
  const currentTime = Date.now();
  localStorage.removeItem('interviewStartTime');
  localStorage.setItem('interviewStartTime', currentTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    if (timer >= 20 * 60) {
      setCurrentRound("HR");
    } else if (timer >= 10 * 60) {
      setCurrentRound("Project");
    } else {
      setCurrentRound("Technical");
    }
    localStorage.setItem("round", currentRound);

    return () => clearInterval(interval);
  }, [timer, currentRound]);

  const getCircleProgress = () => {
    return (timer / totalTime) * 100;
  };

  const isRoundCompleted = (round) => {
    switch (round) {
      case "Technical":
        return timer >= roundDurations.Technical;
      case "Project":
        return timer >= roundDurations.Technical + roundDurations.Project;
      case "HR":
        return timer >= roundDurations.Technical + roundDurations.Project + roundDurations.HR;
      default:
        return false;
    }
  };

  const calculateTimeLeft = (totalTime, timer) => {
    const timeLeft = totalTime - timer;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex h-screen bg-lightblue">
      {/* Sidebar */}
      <div className="w-64 bg-slate-400 p-5 flex flex-col items-center justify-between rounded-r-3xl border-red-400">
        <div className="text-3xl font-bold tracking-wide mb-8">ROUNDS</div>

        {/* Round Buttons */}
        <div className={`w-36 p-3 mb-3 rounded-lg text-center border-red-700 font-bold ${isRoundCompleted("Technical") ? 'bg-green-500' : 'bg-blue-300'} text-black`}>
          Technical
        </div>
        <div className={`w-36 p-3 mb-3 rounded-lg text-center border-red-700 font-bold ${isRoundCompleted("Project") ? 'bg-green-500' : 'bg-blue-300'} text-black`}>
          Project
        </div>
        <div className={`w-36 p-3 mb-8 rounded-lg text-center border-red-700 font-bold ${isRoundCompleted("HR") ? 'bg-green-500' : 'bg-blue-300'} text-black`}>
          HR
        </div>

        {/* Timer Circle */}
        <div className="relative w-36 h-36 mb-8">
          <svg className="w-full h-full" viewBox="0 0 150 150">
            <circle cx="75" cy="75" r="60" stroke="#e0eaff" strokeWidth="10" fill="none" />
            <circle
              cx="75"
              cy="75"
              r="60"
              stroke="#4b9eff"
              strokeWidth="10"
              fill="none"
              strokeDasharray="377"
              strokeDashoffset={377 - (377 * getCircleProgress()) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-gray-800">
            {calculateTimeLeft(totalTime, timer)}
          </div>
        </div>

        {/* Current Round */}
        <div className="text-lg mb-8">Current Round: {currentRound}</div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex justify-center items-center p-24 bg-lightblue rounded-l-3xl">
        <SubInterview />
      </div>
    </div>
  );
};

export default Interview;
