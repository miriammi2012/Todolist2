import React from "react";
import {
  FaRegCalendarCheck,
  FaBomb,
  FaRegSquare,
  FaRegCheckSquare,
  FaCheck,
  FaTimes,
  FaRegCalendarAlt,
  FaRegCommentDots,
  FaEllipsisH,
  FaTimesCircle,
  FaRegTrashAlt
} from "react-icons/fa";
import NoteIssueDate from "./NoteIssueDate";
import NoteCompleteDate from "./NoteCompleteDate";
import NoteComment from "./NoteComment";

class CompletedTask extends React.Component {
  state = {
    unckecked: "none",
    checked: "block",
    showSimple: "block",
    showDetail: "none",
    delTaskNotice: "none",
    trash_cursor: "pointer"
  };

  // Simple Task
  showDetailView = (e) => {
    // UI
    this.setState({ showSimple: "none" });
    this.setState({ showDetail: "block" });
  };

  //  Detail Task
  showSimpleView = (e) => {
    // UI
    this.setState({ showSimple: "block" });
    this.setState({ showDetail: "none" });
  };

  //  complete task
  taskUncompleted = (e) => {
    // UI
    this.setState({
      unckecked: "block",
      checked: "none"
    });

    //
    let { id, cancelComplete } = this.props;
    let { title, deadline, note, issueDate, order } = this.props.content;
    let params = { id, issueDate, title, deadline, note, order };
    cancelComplete(params);
  };

  taskCompleted = (e) => {
    // UI
    this.setState({
      unckecked: "none",
      checked: "block"
    });
  };

  //  Task
  confirmRemoveTask = (e) => {
    this.setState({
      delTaskNotice: "block",
      trash_cursor: "default"
    });
  };

  removeTask = (e) => {
    let { id, deleteTask_completed } = this.props;

    //  delete notice
    this.setState({
      delTaskNotice: "none",
      trash_cursor: "pointer"
    });

    //  database task
    deleteTask_completed(id);
  };

  cancelRemoveTask = (e) => {
    //  delete notice
    this.setState({
      delTaskNotice: "none",
      trash_cursor: "pointer"
    });
  };

  //  Task
  renderNoteIssueDate = () => {
    let { issueDate } = this.props.content;
    if (issueDate) {
      return <NoteIssueDate date={issueDate} />;
    }
  };

  renderNoteCompleteDate = () => {
    let { completeDate } = this.props.content;
    if (completeDate) {
      return <NoteCompleteDate date={completeDate} />;
    }
  };

  renderNoteComment = () => {
    let { note } = this.props.content;
    if (note) {
      return <NoteComment comment={note} />;
    }
  };

  render() {
    let unchecked = { display: this.state.unckecked };
    let checked = { display: this.state.checked };
    let showSimple = { display: this.state.showSimple };
    let showDetail = { display: this.state.showDetail };
    let delTaskNotice = { display: this.state.delTaskNotice };
    let trash_cursor = { cursor: this.state.trash_cursor };

    let { title, deadline, note, completeDate, issueDate } = this.props.content;

    return (
      <div className="completeItem">
        <div className="delNotice" style={delTaskNotice}>
          <div className="delNotice__check">Delete?</div>
          <ul className="delNotice__checkItem">
            <li className="delNotice__checkItem--y" onClick={this.removeTask}>
              <FaCheck />
            </li>
            <li
              className="delNotice__checkItem--n"
              onClick={this.cancelRemoveTask}
            >
              <FaTimes />
            </li>
          </ul>
        </div>

        {/* Task */}
        <div className="completeSimple" style={showSimple}>
          <div className="completeSimple__title">
            <div
              className="completeSimple__title--checkbox--y"
              style={checked}
              onClick={this.taskUncompleted}
            >
              <span>
                <FaRegCheckSquare />
              </span>
            </div>
            <div
              className="completeSimple__title--checkbox--n"
              style={unchecked}
              onClick={this.taskCompleted}
            >
              <span>
                <FaRegSquare />
              </span>
            </div>

            <div
              className="completeSimple__title--text"
              onClick={this.showDetailView}
            >
              {title}
            </div>
            <div
              className="completeSimple__title--iconexpend"
              onClick={this.showDetailView}
            >
              <FaEllipsisH />
            </div>
            <div
              className="completeSimple__title--icontrash"
              style={trash_cursor}
              onClick={this.confirmRemoveTask}
            >
              <FaRegTrashAlt />
            </div>
          </div>
          <div className="completeSimple__note" onClick={this.showDetailView}>
            <div className="completeSimple__note--left-col">
              {this.renderNoteCompleteDate()}
              {this.renderNoteComment()}
            </div>
            <div className="completeSimple__note--right-col">
              {this.renderNoteIssueDate()}
            </div>
          </div>
        </div>

        {/* Task */}
        <div className="completeDetail" style={showDetail}>
          <div className="completeDetail__title">
            <div
              className="completeDetail__title--checkbox--y"
              style={checked}
              onClick={this.taskUncompleted}
            >
              <span>
                <FaRegCheckSquare />
              </span>
            </div>
            <div
              className="completeDetail__title--checkbox--n"
              style={unchecked}
              onClick={this.taskCompleted}
            >
              <span>
                <FaRegSquare />
              </span>
            </div>

            <div
              className="completeDetail__title--text"
              onClick={this.showSimpleView}
            >
              {title}
            </div>
            <div
              className="completeDetail__title--iconcollapse"
              onClick={this.showSimpleView}
            >
              <FaTimesCircle />
            </div>
            <div
              className="completeDetail__title--icontrash"
              style={trash_cursor}
              onClick={this.confirmRemoveTask}
            >
              <FaRegTrashAlt />
            </div>
          </div>

          <div
            className="completeDetail__content"
            onClick={this.showSimpleView}
          >
            <div className="row">
              <div className="col-1-3">
                <div className="completeDetail__content--issuedate">
                  <FaRegCalendarAlt />
                  <div>Issue Date</div>
                </div>
                <div className="completeDetail__content--recordIssueDate">
                  <div>{issueDate}</div>
                </div>
              </div>

              <div className="col-1-3">
                <div className="completeDetail__content--deadline">
                  <FaBomb />
                  <div>Deadline</div>
                </div>
                <div className="completeDetail__content--recordDeadline">
                  <div>{deadline}</div>
                </div>
              </div>

              <div className="col-1-3">
                <div className="completeDetail__content--complete">
                  <FaRegCalendarCheck />
                  <div>Complete Date</div>
                </div>
                <div className="completeDetail__content--recordCompleteDate">
                  <div>{completeDate}</div>
                </div>
              </div>
            </div>

            <div className="completeDetail__content--comment">
              <FaRegCommentDots />
              <div>Comment</div>
            </div>
            <div className="completeDetail__content--recordComment">{note}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompletedTask;
