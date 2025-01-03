const { Todo } = require("../models/index");

/* Todos 전체 목록 불러오기 */
exports.readAll = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    console.log(todos);
    res.send(todos);
  } catch (err) {
    console.log("err", err);
  }
};

/* Todo 한 개 불러오기 */
exports.readOne = async (req, res) => {
  try {
    console.log(req.params);
    const { todoId } = req.params;

    const todo = await Todo.findOne({
      where: { Id: todoId },
    });
    res.send(todo);
  } catch (err) {
    console.log("err", err);
  }
};

/* 새로운 Todo 생성 */
//post todos
exports.create = async (req, res) => {
  try {
    const newTodo = await Todo.create({
      where: { title: req.body.title },
      include: { done: req.body.done },
    });
    res.send(newTodo);
  } catch (err) {
    console.log("err", err);
  }
};

/* 기존 Todo 수정 */
exports.update = async (req, res) => {
  try {
    const updatedTodo = await Todo.update(
      {
        done: req.body.done,
      },
      {
        where: {
          todoId: req.params.id,
        },
      }
    );
    res.send(updatedTodo);
  } catch (err) {
    console.log("err", err);
  }
};

/* 기존 Todo 삭제 */
exports.delete = async (req, res) => {
  try {
    const { todoId } = req.params;
    const isDeleted = await Todo.destroy({
      where: {
        id: todoId,
      },
    });
    if (Boolean(isDeleted)) {
      res.send("todo deleted successfully", todoId);
    } else res.send(false);
  } catch (Err) {
    console.log("err", err);
  }
};
