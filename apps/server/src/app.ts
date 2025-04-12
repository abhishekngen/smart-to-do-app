import cors from "cors";
import todosRouter from "./routes/todos-routes";
import express from "express";
import aiRouter from "./routes/ai-routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/todos', todosRouter);
app.use('/ai', aiRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;
