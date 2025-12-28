import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

import errorHandler from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
// import evaluationRoutes from "./routes/evaluationRoutes.js";
// import hackathonRoutes from "./routes/hackathonRoutes.js";
// import submissionRoutes from "./routes/submissionRoutes.js";
// import teamRoutes from "./routes/teamRoutes.js";

dotenv.config();
connectDB();

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
// app.use("/api/hackathons", hackathonRoutes);
// app.use("/api/teams", teamRoutes);
// app.use("/api/submissions", submissionRoutes);
// app.use("/api/evaluations", evaluationRoutes);






// 404 handler (AFTER routes)
// for wrong routes
app.use((req, res, next) => {
    res.status(404);
    next(new Error(`Route not found - ${req.originalUrl}`));
});



app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
