const { Router } = require('express');
const router = Router();
const controller = require('./controller');

router.post('/', controller.createTodo);
router.get('/', controller.getAllTodos);
router.get('/:id', controller.getTodoById);
router.put('/:id', controller.updateTodo);
router.delete('/:id', controller.deleteTodo);

module.exports = router;