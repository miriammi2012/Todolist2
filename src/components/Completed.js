import React from "react";
import CompletedTask from "./CompletedTask";

class Completed extends React.Component {
  //  completed task
  renderCompletedTask = () => {
    let {
      user,
      completedDatabase,
      cancelComplete,
      deleteTask_completed
    } = this.props;

    if (completedDatabase !== []) {
      let completedTask = completedDatabase.map((item) => {
        return (
          <CompletedTask
            key={item.key}
            id={item.key}
            content={item.content}
            user={user}
            cancelComplete={cancelComplete}
            deleteTask_completed={deleteTask_completed}
          />
        );
      });
      return completedTask;
    }
  };

  render() {
    return (
      <div className="completed__container">
        <div className="completed__list">{this.renderCompletedTask()}</div>
      </div>
    );
  }
}

export default Completed;
