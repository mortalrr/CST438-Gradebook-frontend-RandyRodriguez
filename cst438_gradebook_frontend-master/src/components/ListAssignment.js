import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../constants';
import {Link, useHistory} from 'react-router-dom';


function ListAssignment(props) {

  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
   // called once after intial render
   fetchAssignments();
  }, [] )
 

  const history = useHistory();

  const toAddAssignment = () => {
    history.push('/addAssignment/');
  };

  const fetchAssignments = () => {
    console.log("fetchAssignments");
    fetch(`${SERVER_URL}/assignment`)
    .then((response) => response.json() ) 
    .then((data) => { 
      console.log("assignment length "+data.length);
      setAssignments(data);
     }) 
    .catch(err => console.error(err)); 
  }
  

  const deleteAssignment = (id) => {
    setMessage('');   
    fetch(`${SERVER_URL}/assignment/${id}?force=true` , 
        {  
          method: 'DELETE',
        })
    .then(res => {
        if (res.ok) {
          fetchAssignments();
          setMessage("Assignment Deleted.");
        } else {
          setMessage("Delete error. "+res.status);
          console.error('Delete Assignment error =' + res.status);
    }})
      .catch(err => {
          setMessage("Exception. "+err);
          console.error('Delete Assignment exception =' + err);
      });
  }

  
    const headers = ['Assignment Name', 'Course Title', 'Due Date', ' ', ' ', ' '];
    
    return (
      <div>
        <h3>Assignments</h3>
        <div margin="auto" >
          <h4>{message}&nbsp;</h4>
              <table className="Center"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.assignmentName}</td>
                      <td>{row.courseTitle}</td>
                      <td>{row.dueDate}</td>
                      <td>
                      <Link to={`/gradeAssignment/${assignments[idx].id}`} className="link-style-grade">Grade</Link>
                    </td>
                    <td>
                      <Link to={`/editAssignment/${assignments[idx].id}`} className="link-style-edit">Edit</Link>
                    </td>
                    <td><button id="deleteButton" onClick={() => deleteAssignment(assignments[idx].id)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button onClick={toAddAssignment}>Add Assignment</button>

          </div>
      </div>
    )
}  

export default ListAssignment;