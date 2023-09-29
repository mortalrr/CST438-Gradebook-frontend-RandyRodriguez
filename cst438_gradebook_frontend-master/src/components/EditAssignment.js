import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../constants';
import { useHistory } from 'react-router-dom';

function EditAssignment(props) {
  const [assignmentData, setAssignmentData] = useState([]);
  const [message, setMessage] = useState('');

  const history = useHistory();

  const redirectToAssignmentList = () => {
    history.push('/');
  };

  let assignmentId = 0;
  const currentPath = window.location.pathname;
  const extractedId = /\d+$/.exec(currentPath)[0];
  assignmentId = extractedId;

  useEffect(() => {
    fetchAssignmentData();
  }, []);

  console.log("ID: " + assignmentId);

  const fetchAssignmentData = () => {
    console.log("fetchAssignmentData");
    fetch(`${SERVER_URL}/assignment/${assignmentId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("assignmentData length " + data.length);
        setAssignmentData(data);
      })
      .catch((err) => console.error(err));
  };

  const updateAssignment = () => {
    setMessage('');
    fetch(`${SERVER_URL}/assignment/${assignmentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assignmentData),
    })
      .then((response) => {
        if (response.ok) {
          fetchAssignmentData();
          setMessage("Assignment Updated.");
        } else {
          setMessage("Save error. " + response.status);
          console.error('Assignment Update error =' + response.status);
        }
      })
      .catch((err) => {
        setMessage("Exception. " + err);
        console.error('Update Assignment exception =' + err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData({ ...assignmentData, [name]: value });
  };

  const headers = ['Assignment Name', 'Course Title', 'Due Date'];

  return (
    <div>
      <h3>Edit Assignment</h3>
      <div style={{ margin: 'auto' }}>
        <h4>{message}&nbsp;</h4>
        <table className="Center">
          <thead>
            <tr>
              {headers.map((title, idx) => (
                <th key={idx}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  name="assignmentName"
                  value={assignmentData.assignmentName ? assignmentData.assignmentName : ""}
                  type="text"
                  placeholder='Assignment Name'
                  onChange={(e) => handleInputChange(e)}
                />
              </td>
              <td>
                <input
                  name="courseTitle"
                  value={assignmentData.courseTitle ? assignmentData.courseTitle : ""}
                  type="text"
                  placeholder='Course Title'
                  onChange={(e) => handleInputChange(e)}
                />
              </td>
              <td>
                <input
                  name="dueDate"
                  value={assignmentData.dueDate ? assignmentData.dueDate : ""}
                  type="text"
                  placeholder='yyyy-mm-dd'
                  onChange={(e) => handleInputChange(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button id="saveButton" onClick={updateAssignment}>Save Assignment</button>
        <button onClick={redirectToAssignmentList}>Go Back</button>
      </div>
    </div>
  );
}

export default EditAssignment;
