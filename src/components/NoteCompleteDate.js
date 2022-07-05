import React from 'react';
import { FaRegCalendarCheck } from "react-icons/fa";

const NoteCompleteDate = ({date}) => {
    return (
        <div className="taskNote">
            <div className="taskNote__icon"><FaRegCalendarCheck /></div>
            <div className="taskNote__content">{date}</div>
        </div>
    );
}

export default NoteCompleteDate;