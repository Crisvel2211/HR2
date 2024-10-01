import express from 'express'
import cors from "cors";
import "dotenv/config";
import { ConnectDB } from './config/db.js';
import applicantRoutes from './routes/applicantRoute.js'

const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

ConnectDB();

app.get("/", (req,res) => {
  res.send("Hello world ")
})

// Your endpoints
  app.use('/api/applicants', applicantRoutes);
// end


app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
})