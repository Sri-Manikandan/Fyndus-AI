const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const app = express();
const { Server } = require("socket.io");
const { createServer } = require("http");
const Chatbot = require("./chatEngine.js");

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const chatbot = new Chatbot("public" === "public");

io.on("connection", (socket) => {
  console.log(`CONNECTED ${socket.id}`);

  socket.on("disconnect", (reason) => {
      console.log(`DISCONNECTED ${socket.id}: ${reason}`);
  });
  
  socket.on("init", async ({ round ,name }) => {
      try {
          await chatbot.initialize( round,name, socket.id); 
          socket.emit("responseInit", true);
          console.log(`INITIALIZED ${socket.id}`);
      } catch (err) {
          console.log(err);
          socket.emit("responseInit", false);
          console.log(`INIT FAILED ${socket.id}`);
      }
  });

  socket.on("message", async (data) => {
      try {
          console.log("Received data:", data);
  
          if (!data || typeof data.question !== "string") {
              throw new TypeError("The 'question' property must be a string.");
          }
          const response = await chatbot.chat(data.question,data.duration,data.interviewStartTime,data.name, socket.id);
  
          console.log(`RESPONSE (${socket.id}): ${response}`);
  
          socket.emit("responseMessage", {
              response: response,
          });
      } catch (err) {
          console.error(`ERROR (${socket.id}):`, err.message);
  
          socket.emit("responseMessage", {
              response: "Sorry, I don't understand that.",
          });
      }
  });
  
});


// Serve static files (optional, for public/temp access)
app.use("/public", express.static(path.join(__dirname, "public")));

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/temp"), // Directory for uploads
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${Date.now()}.pdf`; // Generate unique file name
    cb(null, uniqueName);
  },
});

// File validation: Only PDFs allowed
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"));
  }
};

// Configure multer with storage, file filter, and size limit
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit: 5MB
  fileFilter,
});

// POST route to handle file upload
app.post("/upload", upload.single("resume"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded. Please upload a valid PDF file.",
      });
    }

    res.status(200).json({
      message: "File uploaded successfully",
      fileName: req.file.filename, // Return the file's unique name
    });
  } catch (error) {
    console.error("File upload error:", error.message);
    res.status(500).json({
      message: "File upload failed",
      error: error.message,
    });
  }
});

// Error-handling middleware for Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: "Multer error occurred.",
      error: err.message,
    });
  } else if (err) {
    return res.status(400).json({
      message: "An error occurred during file upload.",
      error: err.message,
    });
  }
  next();
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
