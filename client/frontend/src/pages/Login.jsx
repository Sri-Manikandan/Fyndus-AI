import { useState } from "react";
import { signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully");
      window.location.pathname = "/upload";
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Logged in with Google");
      window.location.pathname = "/upload";
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully");
      window.location.pathname = "/";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600 focus:ring focus:ring-red-300 focus:outline-none"
        >
          Login with Google
        </button>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 mt-4 text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 focus:ring focus:ring-blue-300 focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Login;
