import express from "express";
import loanController from "./controller/LoanController";
const app = express();
app.use(express.json());
app.use(loanController);
app.listen(3000);