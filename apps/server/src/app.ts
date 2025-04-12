import cors from "cors";
import router from "./routes/todos-routes";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/todos', router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;
