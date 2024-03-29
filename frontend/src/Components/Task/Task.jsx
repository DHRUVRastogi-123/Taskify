import React, { useState } from "react";
import "./Task.css";
// import { useAppContext } from "../context";

const Task = (props) => {
  // const { toggleAddToDoVisibility } = useAppContext();
  const [clicked, setClicked] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const formattedDate = new Date(props.endDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  console.log(clicked);

  const handleTickClick = async () => {
    setClicked(true);
    // Make an HTTP request to update the task's status
    try {
      const response = await fetch("https://backend-m8ft.onrender.com/update-task-status", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: props.taskId, // Pass the task's unique identifier here
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        props.updateTasks();
      } else {
        console.error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleChecklistToggle = () => {
    setShowChecklist(!showChecklist);
  };

  const handleCheckItemClick = (item) => {
    const updatedCheckedItems = checkedItems.includes(item)
      ? checkedItems.filter((checkedItem) => checkedItem !== item)
      : [...checkedItems, item];
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <div className={`task ${props.status === "completed" ? "completed" : ""}`}>
      <div className="task-tick">
        <div onClick={handleTickClick} className="tick">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path
              d="M6.54 13c-.3 0-.59-.13-.81-.35L2 8.75l1.62-1.69 2.86 2.98L12.26 3 14 4.56l-6.59 8.02c-.21.25-.51.4-.83.42h-.04z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <div className="task-clickable-area">
        <div className="task-title">
          <p>{props.title}</p>
        </div>
        <div className="task-notes">
          <p>{props.note}</p>
          {props.checklist && (
            <div>
              <div onClick={handleChecklistToggle} className="checklist-toggle">
                Checklist
              </div>
              {showChecklist && (
                <ul className="checklist">
                  {props.checklist.map((item, index) => (
                    <li key={index}>
                      <label>
                        <input
                          type="checkbox"
                          checked={checkedItems.includes(item)}
                          onChange={() => handleCheckItemClick(item)}
                        />
                        <span className={checkedItems.includes(item) ? "checked" : ""}>
                          {item}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="due-date-and-tags">
          <div className="due-date-and-tags">
            <div className="due-date">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M2 12h10V6H2v6zM12 2V0h-2v2H4V0H2v2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path></svg>
            <p>{formattedDate}</p>
            </div>
            <div className="tags">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M10 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM2.004 6.994L7 2h5l-.004 5.006L7 12l.004-.004-5-5.002zM0 7c0 .55.22 1.05.59 1.41l5 5a1.996 1.996 0 0 0 2.83 0l4.99-4.99c.37-.37.59-.87.59-1.42V2c0-1.11-.89-2-2-2H7c-.55 0-1.05.22-1.41.58l-5 5C.23 5.94 0 6.44 0 7z"></path></svg>
            </div>
          </div>
        </div>
      </div>
      <div className="grab"></div>
    </div>
  );
};

export default Task;


