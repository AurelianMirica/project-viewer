import React, { useEffect, useState } from 'react';

const ProjectView = props => {

    const [currentProjectId, setCurrentProjectId] = useState(1);
    const [currentProject, setCurrentProject] = useState({});
    const [projectTasks, setProjectTasks] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3355/projects/${currentProjectId}`)
            .then(response => response.json())
            .then(data => setCurrentProject(data));
        fetchTasks();
    }, [currentProjectId]);

    const fetchTasks = () => {
        fetch(`http://localhost:3355/tasks?project_id=${currentProjectId}`)
            .then(response => response.json())
            .then(data => setProjectTasks(data));
    }

    const handleChangeCurrentProjectId = () => {
        let value = document.getElementById('currentProjInput').value;
        setCurrentProjectId(value);
    }

    return (
        <div>
            <h1>Project View</h1>
            <hr />
            <p>Project ID: {currentProject.id}</p>
            <p>Code: {currentProject.code}</p>
            <p>Name: {currentProject.name}</p>

            <button onClick={() => setCurrentProjectId(currentProjectId - 1)}>PREV</button>

            <button onClick={handleChangeCurrentProjectId}>Set current project</button>
            <input id="currentProjInput" type="text" />

            <button onClick={() => setCurrentProjectId(currentProjectId + 1)}>NEXT</button>

            <hr />

            <h3>Taskurile proiectului curent</h3>

            <table>
                <tr>
                    <th>Id</th>
                    <th>Subject</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Asignee</th>
                </tr>
                {
                    // projectTasks.length &&
                    projectTasks.map(task => {
                        return (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.subject}</td>
                                <td>{task.description}</td>
                                <td>{task.status}</td>
                                <td>{task.owner_name}</td>
                                <td>{task.asignee_name}</td>
                            </tr>
                        )
                    })
                }
            </table>

        </div>
    )
}

export default ProjectView;

