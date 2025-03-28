import React, { useState, useRef, useEffect } from 'react';
import "./../../index.css";
import "./TaskForm.css";



const TaskForm = ({ contacts }) => {
    const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus(); 
    }
  }, [editingIndex]); 

  const handleAddSubtaskChange = (event) => {
    setNewSubtask(event.target.value);
  };

  const handleSubtaskKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addSubtask();
    }
  };

  const addSubtask = () => {
    if (newSubtask) {
      setSubtasks([...subtasks, newSubtask]);
      setNewSubtask('');
    }
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setAssignedTo('');
    setDate('');
    setPriority('medium');
    setCategory('');
    setSubtasks([]);
    setNewSubtask('');
  };

  const editSubtask = (index) => {
    setEditingIndex(index);
  }

  const handleSubtaskChange = (index, event) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = event.target.value; // Update the specific subtask
    setSubtasks(updatedSubtasks);
  };

  const handleSubtaskBlur = () => {
    setEditingIndex(null); // Exit edit mode when input loses focus
  };

  const deleteSubtask = () => {

  }

  const uploadNewTask = async (event) => {
    event.preventDefault();
    const taskToSend = {
      title,
      description,
      assignedTo,
      date,
      priority,
      category,
      subtasks,
    };
    // Send the taskToSend to the server or do further processing
    console.log('Task to be sent:', taskToSend);
    clearForm();
  };


  return (
    <form className="add-task-form" id="add-task-form" onSubmit={uploadNewTask}>
      <div className="addTaskColumn">
        <div className="input">
          <label htmlFor="title">Title<span className="red">*</span></label>
          <input
            type="text"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            spellCheck="false"
            minLength="4"
            required
          />
          <span className="required-label" id="title-label-2">This field is required</span>
        </div>
        <div className="input">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            spellCheck="false"
          />
          <span className="required-label"></span>
        </div>
        <div className="input">
          <label htmlFor="assigned">Assigned to</label>
          <select
            id="assigned"
            className="select-contacts"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="" disabled selected>Select contacts to assign</option>
            {contacts.map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.name}
              </option>
            ))}
          </select>
          <span className="required-label"></span>
        </div>
      </div>

      <div className="addTaskBorder"></div>

      <div className="addTaskColumn">
        <div className="input">
          <label htmlFor="date">Due date<span className="red">*</span></label>
          <input
            type="date"
            id="date"
            required
            min="2010-01-01"
            max="2100-12-31"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <span className="required-label" id="date-label-2">This field is required</span>
        </div>
        <div className="input">
          <span>Prio</span>
          <div className="prio-btns">
            <div className="input-container">
              <input
                type="radio"
                id="urgent"
                name="prio"
                value="urgent"
                checked={priority === 'urgent'}
                onChange={() => setPriority('urgent')}
              />
              <div className="radio-tile" id="urgent-tile">
                <label htmlFor="urgent">Urgent</label>
                <img src="assets/img/urgent.png" alt="Urgent" />
              </div>
            </div>
            <div className="input-container">
              <input
                type="radio"
                id="medium"
                name="prio"
                value="medium"
                checked={priority === 'medium'}
                onChange={() => setPriority('medium')}
              />
              <div className="radio-tile" id="medium-tile">
                <label htmlFor="medium">Medium</label>
                <img src="assets/img/medium.png" alt="Medium" id="medium-img" />
              </div>
            </div>
            <div className="input-container">
              <input
                type="radio"
                id="low"
                name="prio"
                value="low"
                checked={priority === 'low'}
                onChange={() => setPriority('low')}
              />
              <div className="radio-tile" id="low-tile">
                <label htmlFor="low">Low</label>
                <img src="assets/img/low.png" alt="Low" />
              </div>
            </div>
          </div>
          <span className="required-label"></span>
        </div>
        <div className="input custom-select" id="category-input">
          <label htmlFor="category">Category<span className="red">*</span></label>
          <select
            id="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>Select task category</option>
            <option value="Technical Task">Technical Task</option>
            <option value="User Story">User Story</option>
          </select>
          <span className="required-label" id="category-label-2">This field is required</span>
        </div>
        <div className="input" id="subtasks-input">
          <label htmlFor="subtasks">Subtasks</label>
          <div className="subtask-input-container">
            <input
              type="text"
              name="subtasks"
              id="subtasks"
              placeholder="Add new subtask"
              value={newSubtask}
              onChange={handleAddSubtaskChange}
              onKeyDown={handleSubtaskKeyDown}
              spellCheck="false"
            />
            <img
              className="add-subtask-icon"
              src="assets/img/add.png"
              alt="Add subtask"
              onClick={addSubtask}
            />
          </div>
          <ul id="subtasks-list">
            {subtasks.map((subtask, index) => (
              <li key={index}>
              <img className="bullet-point" src="assets/img/circle-solid.svg" alt="bullet point" />
              <input 
                ref={editingIndex === index ? inputRef : null}
                type="text" 
                className="subtask-input" 
                name="subtask-input" 
                value={subtask} 
                onChange={(event) => handleSubtaskChange(index, event)}
                onBlur={handleSubtaskBlur}
                disabled={editingIndex !== index}
                autoFocus={editingIndex === index}
                spellCheck="false" 
              />
              <div className="subtask-icons">
                <img 
                  className="subtask-icon" 
                  src="assets/img/edit.png" 
                  alt="Edit" 
                  onClick={() => editSubtask(index)} 
                />
                <img 
                  className="subtask-icon" 
                  src="assets/img/delete.png" 
                  alt="Delete" 
                  onClick={() => deleteSubtask(index)} 
                />
              </div>
            </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="form-bottom">
        <span><span className="red">*</span>This field is required</span>
        <div className="form-btns-div">
          <button
            type="button"
            className="clear-btn"
            onClick={clearForm}
          >
            Clear
            <img className="btn-icon" src="assets/img/close.png" alt="Clear" />
          </button>
          <button
            className="create-task-btn"
            type="submit"
            id="create-task-btn"
          >
            Create Task
            <img className="btn-icon" src="assets/img/check_white.png" alt="Create Task" />
          </button>
        </div>
      </div>
    </form>
  );


}

export default TaskForm;