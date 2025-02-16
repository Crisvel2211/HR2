import express from 'express';
import dotenv from 'dotenv';
import mongoDb from './config/mongoDb.js';
import cors from 'cors'
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoute.js';
import jobPostingRoutes from "./routes/jobPostingRoute.js";
import  candidateRoutes from "./routes/candidateApplyRoute.js";


const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

dotenv.config();

mongoDb();
app.get('/', (req, res) => {

    res.send('Hello, World!');
});

app.use('/api/auth', authRoutes);
app.use("/api/jobs", jobPostingRoutes);
app.use("/api/candidates", candidateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);
});

/**add middleware and a function to handle errors */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    })
  })

