import { Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Resume from "./pages/Resume";
import Instruction from "./pages/Instruction";
import Interview from "./pages/Interview";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/upload' element={<Resume />} />
      <Route path='/instruction' element={<Instruction />} />
      <Route path='/interview' element={<Interview />} />
    </Routes>
  )
}

export default App;