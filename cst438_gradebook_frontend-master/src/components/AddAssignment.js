import React, { useState } from 'react';
import { SERVER_URL } from '../constants';
import { useHistory } from 'react-router-dom';

function AddAssignment(props) {
  const [newAssignment, setNewAssignment] = useState({
    id: 0,
    assignmentName: '',
    dueDate: '',
    courseTitle: '',
    courseId: 31045,
  });

  const [message, setMessage] = useState('');

  const history = useHistory();

  const redirectToAssignmentList = () => {
    history.push('/');
  };

  const postAssignment = () => {
    setMessage('');
    fetch(`${SERVER_URL}/assignment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAssignment),
    })
      .then((response) => {
        if (response.ok) {
          setMessage('Saved.');
        } else {
          setMessage('Error.' + response.status);
          console.error('Save Assignment error =' + response.status);
        }
      })
      .catch((error) => {
        setMessage('Exception.' + error);
        console.error('Save Assignment exception =' + error);
      });
  };

  const saveAssignment = () => {
    if (
      newAssignment.assignmentName === '' ||
      newAssignment.courseTitle === '' ||
      newAssignment.dueDate === ''
    ) {
      setMessage('Please fill in all the fields');
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(newAssignment.dueDate)) {
      postAssignment();
    } else {
      setMessage('The due date does not have the correct format!');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment((prevAssignment) => ({
      ...prevAssignment,
      [name]: value,
    }));
  };

  const tableHeaders = ['Assignment Name', 'Course Title', 'Due Date'];

  return (
    <div>
      <h3>Add Assignment</h3>
      <div style={{ margin: 'auto' }}>
        <h4>{message}&nbsp;</h4>
        <table className="Center">
          <thead>
            <tr>
              {tableHeaders.map((header, idx) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  name="assignmentName"
                  value={newAssignment.assignmentName ? newAssignment.assignmentName : ''}
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                />
              </td>
              <td>
                <input
                  name="courseTitle"
                  value={newAssignment.courseTitle ? newAssignment.courseTitle : ''}
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                />
              </td>
              <td>
                <input
                  name="dueDate"
                  value={newAssignment.dueDate ? newAssignment.dueDate : ''}
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <button onClick={saveAssignment}>Add Assignment</button>
        <br></br>
        <br></br>
        <button onClick={redirectToAssignmentList}>Back</button>
      </div>
    </div>
  );
}

export default AddAssignment;
