export const TodoModel = {
  validate(todo) {
    const errors = {};

    if (!todo.title || todo.title.length < 4 || todo.title.length > 11) {
      errors.title = "Title must be between 4 and 10 characters";
    }

    if (!todo.task || todo.task.length < 10 || todo.task.length > 200) {
      errors.task = "Task must be between 10 and 200 characters";
    }

    const today = new Date();
    const targetDate = new Date(todo.targetDate);

    if (!todo.targetDate || isNaN(targetDate.getTime())) {
      errors.targetDate = "Target date is required";
    } else if (targetDate < today) {
      errors.targetDate = "Target date must be today or in the future";
    }

    console.log("validation errors:", errors);

    return errors;
  },
};
