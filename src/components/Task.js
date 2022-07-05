import React from "react";
import { TiPencil } from "react-icons/ti";
import {
  FaRegSquare,
  FaRegCheckSquare,
  FaCheck,
  FaTimes,
  FaRegStar,
  FaStar,
  FaUserEdit,
  FaRegCalendarAlt,
  FaBomb,
  FaRegCommentDots,
  FaRegTrashAlt
} from "react-icons/fa";
import NoteIssueDate from "./NoteIssueDate";
import NoteDeadline from "./NoteDeadline";
import NoteComment from "./NoteComment";

class Task extends React.Component {
  state = {
    unckecked: "block",
    checked: "none",
    showTask: "block",
    showDetail: "none",
    hollowStar: "flex",
    fullStar: "none",
    checkboxBg: "#e0eed7",
    taskBg: "#97c578",
    editNotice: "none",
    delTaskNotice: "none",
    userEdit_cursor: "pointer",
    trash_cursor: "pointer",

    taskTitle: "",
    deadline: "",
    comment: "",
    order: ""
  };

  componentDidMount() {
    let { title, deadline, note, order } = this.props.content;

    //
    this.setState({
      taskTitle: title,
      deadline: deadline,
      comment: note,
      order: order
    });

    //  Task
    if (this.props.content.order === true) {
      this.setState({
        hollowStar: "none",
        fullStar: "flex",
        checkboxBg: "#fcefd6",
        taskBg: "#f0b849"
      });
    } else {
      this.setState({
        hollowStar: "flex",
        fullStar: "none",
        checkboxBg: "#e0eed7",
        taskBg: "#97c578"
      });
    }
  }

  //
  modifyDatabase = () => {
    let { id, modifyTask } = this.props;
    let { taskTitle, deadline, comment, order } = this.state;
    let params = { id, taskTitle, deadline, comment, order };
    modifyTask(params);
  };

  //
  handleEditClick = (e) => {
    // UI
    this.setState({
      showTask: "none",
      showDetail: "block"
    });
  };

  checkEditClick = (e) => {
    this.setState({
      editNotice: "block",
      userEdit_cursor: "default"
    });
  };

  hideEditNotice = (e) => {
    this.setState({
      editNotice: "none",
      userEdit_cursor: "pointer"
    });
  };

  //  Task Title
  modifyTaskTitle = (e) => {
    this.setState({ taskTitle: e.target.value });
  };

  //  deadline
  modifyDeadline = (e) => {
    this.setState({ deadline: e.target.value });
  };

  //  comment
  modifyComment = (e) => {
    this.setState({ comment: e.target.value });
  };

  //
  handleCancelClick = (e) => {
    // UI
    this.setState({
      showTask: "block",
      showDetail: "none"
    });

    //  state
    let { title, deadline, note } = this.props.content;
    this.setState({
      taskTitle: title,
      deadline: deadline,
      comment: note
    });
  };

  //  task
  handleSaveClick = (e) => {
    // UI
    this.setState({
      showTask: "block",
      showDetail: "none"
    });

    //
    this.modifyDatabase();
  };

  //  task
  onStarClick = async (e) => {
    // UI
    this.setState({
      hollowStar: "none",
      fullStar: "flex",
      checkboxBg: "#fcefd6",
      taskBg: "#f0b849"
    });

    //  state
    await this.setState({ order: true });

    //
    this.modifyDatabase();
  };

  //  task
  cancelStarClick = async (e) => {
    // UI
    this.setState({
      hollowStar: "flex",
      fullStar: "none",
      checkboxBg: "#e0eed7",
      taskBg: "#97c578"
    });

    //  state
    await this.setState({ order: this.props.content.issueDate });

    //
    this.modifyDatabase();
  };

  //  Task
  confirmRemoveTask = (e) => {
    this.setState({
      delTaskNotice: "block",
      trash_cursor: "default"
    });
  };

  removeTask = (e) => {
    let { id, deleteTask } = this.props;

    //  delete notice
    this.setState({
      delTaskNotice: "none",
      trash_cursor: "pointer"
    });

    //  database task
    deleteTask(id);
  };

  cancelRemoveTask = (e) => {
    //  delete notice
    this.setState({
      delTaskNotice: "none",
      trash_cursor: "pointer"
    });
  };

  // Completed Task
  taskCompleted = (e) => {
    // UI
    this.setState({
      unckecked: "none",
      checked: "block"
    });

    //
    let { id, completeTask } = this.props;
    let { title, deadline, note, issueDate, order } = this.props.content;
    let params = { id, issueDate, title, deadline, note, order };
    completeTask(params);
  };

  taskUncompleted = (e) => {
    // UI
    this.setState({
      unckecked: "block",
      checked: "none"
    });
  };

  //  Task
  renderNoteIssueDate = () => {
    let { issueDate } = this.props.content;
    if (issueDate) {
      return <NoteIssueDate date={issueDate} />;
    }
  };

  renderNoteDeadline = () => {
    let { deadline } = this.state;
    if (deadline) {
      return <NoteDeadline deadline={deadline} />;
    }
  };

  renderNoteComment = () => {
    let { comment } = this.state;
    if (comment) {
      return <NoteComment comment={comment} />;
    }
  };

  //
  render() {
    let unchecked = { display: this.state.unckecked };
    let checked = { display: this.state.checked };
    let showTask = { display: this.state.showTask };
    let showDetail = { display: this.state.showDetail };
    let hollowStar = { display: this.state.hollowStar };
    let fullStar = { display: this.state.fullStar };
    let checkboxBg = { backgroundColor: this.state.checkboxBg };
    let taskBg = { backgroundColor: this.state.taskBg };
    let userEdit_cursor = { cursor: this.state.userEdit_cursor };
    let editNotice = { display: this.state.editNotice };
    let delTaskNotice = { display: this.state.delTaskNotice };
    let trash_cursor = { cursor: this.state.trash_cursor };

    let { taskTitle, deadline, comment } = this.state;

    return (
      <div className="taskItem">
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
        <div className="taskSimple" style={{ ...showTask, ...taskBg }}>
          <div className="taskSimple__title">
            <div
              className="taskSimple__title--checkbox--n"
              style={{ ...unchecked, ...checkboxBg }}
              onClick={this.taskCompleted}
            >
              <span>
                <FaRegSquare />
              </span>
            </div>
            <div
              className="taskSimple__title--checkbox--y"
              style={{ ...checked, ...checkboxBg }}
              onClick={this.taskUncompleted}
            >
              <span>
                <FaRegCheckSquare />
              </span>
            </div>

            <div
              className="taskSimple__title--text"
              onClick={this.handleEditClick}
            >
              {taskTitle}
            </div>

            <div
              className="taskSimple__title--iconstar"
              style={hollowStar}
              onClick={this.onStarClick}
            >
              <FaRegStar />
            </div>
            <div
              className="taskSimple__title--iconstar-full"
              style={fullStar}
              onClick={this.cancelStarClick}
            >
              <FaStar />
            </div>
            <div
              className="taskSimple__title--iconedit"
              onClick={this.handleEditClick}
            >
              <TiPencil />
            </div>
            <div
              className="taskSimple__title--icontrash"
              style={trash_cursor}
              onClick={this.confirmRemoveTask}
            >
              <FaRegTrashAlt />
            </div>
          </div>

          <div className="taskSimple__note" onClick={this.handleEditClick}>
            <div className="taskSimple__note--left-col">
              {this.renderNoteDeadline()}
              {this.renderNoteComment()}
            </div>
            <div className="taskSimple__note--right-col">
              {this.renderNoteIssueDate()}
            </div>
          </div>
        </div>

        {/* Task */}
        <div className="taskDetail" style={showDetail}>
          <div className="taskDetail__title" style={taskBg}>
            <div
              className="taskDetail__title--checkbox--n"
              style={{ ...unchecked, ...checkboxBg }}
              onClick={this.taskCompleted}
            >
              <span>
                <FaRegSquare />
              </span>
            </div>
            <div
              className="taskDetail__title--checkbox--y"
              style={{ ...checked, ...checkboxBg }}
              onClick={this.taskUncompleted}
            >
              <span>
                <FaRegCheckSquare />
              </span>
            </div>

            <input
              className="taskDetail__title--text"
              type="text"
              value={taskTitle}
              onChange={this.modifyTaskTitle}
              maxLength="20"
            ></input>

            <div
              className="taskDetail__title--iconstar"
              style={hollowStar}
              onClick={this.onStarClick}
            >
              <FaRegStar />
            </div>
            <div
              className="taskDetail__title--iconstar-full"
              style={fullStar}
              onClick={this.cancelStarClick}
            >
              <FaStar />
            </div>
            <div
              className="taskDetail__title--iconedit"
              style={userEdit_cursor}
              onClick={this.checkEditClick}
            >
              <FaUserEdit />
            </div>
            <div
              className="taskDetail__title--icontrash"
              style={trash_cursor}
              onClick={this.confirmRemoveTask}
            >
              <FaRegTrashAlt />
            </div>
          </div>

          <div className="taskDetail__content">
            <div
              style={editNotice}
              className="completeEditNotice"
              onClick={this.hideEditNotice}
            >
              <div>
                <span>Cancel</span>
                <span>取消編輯</span>
              </div>
              <div>
                <span>Save</span>
                <span>儲存編輯</span>
              </div>
            </div>

            <div className="row">
              <div className="col-1-2">
                <div className="taskDetail__content--issuedate">
                  <FaRegCalendarAlt />
                  <div>Issue Date</div>
                </div>
                <div className="taskDetail__content--recordIssueDate">
                  <div>{this.props.content.issueDate}</div>
                </div>
              </div>

              <div className="col-1-2">
                <div className="taskDetail__content--deadline">
                  <FaBomb />
                  <div>Deadline</div>
                </div>
                <div className="taskDetail__content--inputDeadline">
                  <input
                    type="date"
                    onChange={this.modifyDeadline}
                    value={deadline}
                  ></input>
                </div>
              </div>
            </div>

            <div className="taskDetail__content--comment">
              <FaRegCommentDots />
              <div>Comment</div>
            </div>
            <textarea
              className="taskDetail__content--recordComment"
              onChange={this.modifyComment}
              value={comment}
            ></textarea>
          </div>

          <div type="submit" className="taskDetail__submit">
            <div
              className="taskDetail__submit--cancel"
              onClick={this.handleCancelClick}
            >
              &#10006; Cancel
            </div>
            <div
              className="taskDetail__submit--save"
              onClick={this.handleSaveClick}
            >
              &#10004; Save
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Task;
