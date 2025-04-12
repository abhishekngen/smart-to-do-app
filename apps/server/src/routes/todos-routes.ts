import {createTodo, deleteTodo, fetchTodos, updateTodo} from "../controllers/todos.controllers";
import {Router} from "express";


const router = Router();

router.get('/fetch', fetchTodos);

router.post('/create', createTodo);

router.put('/update/:id', updateTodo);

router.delete('/delete/:id', deleteTodo);

export default router;

