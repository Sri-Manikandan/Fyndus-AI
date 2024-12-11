import React, { useState, useEffect } from "react";
import { getDocument } from "pdfjs-dist";
import { useNavigate } from "react-router-dom";

const Resume = () => {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [file, setFile] = useState(null);
  const [pdfText, setPdfText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB. Please upload a smaller file.");
        return;
      }
      setFile(selectedFile);
      extractTextFromPDF(selectedFile);
    }
  };

  const extractTextFromPDF = async (file) => {
    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      const typedArray = new Uint8Array(event.target.result);
      try {
        const pdf = await getDocument(typedArray).promise;
        const text = await Promise.all(
          Array.from({ length: pdf.numPages }, async (_, i) => {
            const page = await pdf.getPage(i + 1);
            const content = await page.getTextContent();
            return content.items.map((item) => item.str).join(" ");
          })
        );

        setPdfText(text.join(" ").trim());
        console.log("Extracted PDF Text:", text.join(" ").trim());
      } catch (error) {
        console.error("Error reading PDF file:", error);
        alert("Could not process the PDF file. Please try another file.");
      }
    };

    fileReader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a resume!");
      return;
    }

    if (name) {
      localStorage.setItem("name", name);
    }

    const formData = new FormData();
    formData.append("resume", file);

    setIsUploading(true);
    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setIsUploading(false);

      if (response.ok) {
        alert("Resume uploaded successfully!");
        console.log("Server Response:", result);
        navigate("/instruction");
      } else {
        alert(result.message || "File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);
      alert("An error occurred during file upload.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">UPLOAD RESUME</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg flex flex-col gap-6"
      >
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Resume (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 ${
            isUploading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default Resume;
