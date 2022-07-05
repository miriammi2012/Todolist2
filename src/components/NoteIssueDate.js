import React from 'react';
import { FaRegCalendarAlt } from "react-icons/fa";

const NoteIssueDate = ({date}) => {
    return (
        <div className="taskNote">
            <div className="taskNote__icon"><FaRegCalendarAlt /></div>
            <div className="taskNote__content">{date}</div>
        </div>
    );
}

export default NoteIssueDate;