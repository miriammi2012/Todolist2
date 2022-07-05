import React from "react";
import Task from "./Task";

class MyTask extends React.Component {
  state = { inputTask: "" };

  //  Task
  onTaskInput = (e) => {
    this.setState({ inputTask: e.target.value });
  };

  //  Task
  onTaskSubmit = (e) => {
    e.preventDefault();
    this.props.onTaskSubmit(this.state.inputTask);

    //
    let input = e.target.querySelector("input");
    input.value = "";
  };

  //  Task
  renderTask = () => {
    let {
      user,
      taskDatabase,
      modifyTask,
      deleteTask,
      completeTask
    } = this.props;

    if (taskDatabase !== []) {
      let task = taskDatabase.map((item) => {
        return (
          <Task
            key={item.key}
            id={item.key}
            content={item.content}
            user={user}
            modifyTask={modifyTask}
            deleteTask={deleteTask}
            completeTask={completeTask}
          />
        );
      });

      return task;
    }
  };

  render() {
    return (
      <div className="task">
        <div className="task__input">
          <form onSubmit={this.onTaskSubmit}>
            <input
              className="task__inputarea"
              type="text"
              placeholder=" Add Task (less than 20 char)"
              onChange={this.onTaskInput}
              maxLength="20"
            ></input>
          </form>
          <div>&#43;</div>
        </div>

        <div className="task__container">
          <div className="task__list">{this.renderTask()}</div>
        </div>
      </div>
    );
  }
}

export default MyTask;
