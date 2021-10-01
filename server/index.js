import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Phocus WebPage");
});

const PORT = 5000;

mongoose
  .connect(
    "mongodb+srv://Netflix:UditNetflix@netflix.xk1hb.mongodb.net/PhocusDB?authSource=admin&replicaSet=atlas-lf2ojk-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on port : http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
