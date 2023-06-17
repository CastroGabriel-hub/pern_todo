const { Router } = require('express');
const router = Router();
const controller = require('./controller');

router.post('/', controller.createTodo);
router.get('/', controller.getTodos);
router.get('/:id', controller.getTodoById);
router.put('/:id', controller.updateTodoDescription);
router.put('/updateStatus/:id', controller.updateTodoStatus)
router.delete('/:id', controller.deleteTodo);

module.exports = router;