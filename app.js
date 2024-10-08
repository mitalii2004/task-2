const express = require("express");
const app = express();
const port = 1234;

const multer = require('multer')
const path = require('path')

// Multer configuration for storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory for uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handle file uploads
app.post('/profileUpload', upload.array('profile-files', 12),(req, res)=> {
    let response = '<a href="/">Home</a><br>';
    response += "Files uploaded successfully.<br>";
    req.files.forEach(file => {
        response += `<img src="/uploads/${file.filename}" style="width:200px;" /><br>`;
    });
    res.send(response);
});


const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extented: true }));

require("./dbconnection").connectiondb();



const userRoute = require("./routers/userRoute");
app.use("/users", userRoute);


app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
