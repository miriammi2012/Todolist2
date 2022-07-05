import React from 'react';
import { FaBomb } from "react-icons/fa";

const NoteDeadline = ({deadline}) => {
    return (
        <div className="taskNote noteDeadline">
            <div className="taskNote__icon"><FaBomb /></div>
            <div className="taskNote__content">{deadline}</div>
        </div>
    );
}

export default NoteDeadline;