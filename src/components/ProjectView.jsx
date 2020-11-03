import React, { useEffect, useState } from 'react';

const ProjectView = props => {

    const [currentProjectId, setCurrentProjectId] = useState(1);
    const [currentProject, setCurrentProject] = useState({});
    const [projectTasks, setProjectTasks] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(false);
    const [loadingTasks, setloadingTasks] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoadingProjects(true);

            await fetch(`http://localhost:3355/projects/${currentProjectId}`)
                .then(response => response.json())
                .then(data => setCurrentProject(data));

            setLoadingProjects(false);
        }

        getData();
        fetchTasks();

    }, [currentProjectId]);

    const fetchTasks = async () => {
        setloadingTasks(true);

        await fetch(`http://localhost:3355/tasks?project_id=${currentProjectId}`)
            .then(response => response.json())
            .then(data => setProjectTasks(data));

        setloadingTasks(false);
    }

    const handleChangeCurrentProjectId = () => {
        let inputValue = document.getElementById('currentProjInput').value;
        let projectId = parseInt(inputValue);
        setCurrentProjectId(projectId);
    }

    return (
        <div>
            <h1>Project View</h1>
            <hr />
            { loadingProjects ?
                <h3>Loading project...</h3>
                :
                <div>
                    <p>Project ID: {currentProject.id}</p>
                    <p>Code: {currentProject.code}</p>
                    <p>Name: {currentProject.name}</p>
                </div>
            }
            <button onClick={() => setCurrentProjectId(currentProjectId - 1)}>PREV</button>

            <button onClick={handleChangeCurrentProjectId}>Set current project</button>
            <input id="currentProjInput" type="text" />

            <button onClick={() => setCurrentProjectId(currentProjectId + 1)}>NEXT</button>

            <hr />

            <h3>Taskurile proiectului curent</h3>

            { loadingTasks ?
                <h3>Loading tasks...</h3>
                :
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Subject</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Owner</th>
                            <th>Asignee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
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
                    </tbody>
                </table>
            }

        </div>
    )
}

export default ProjectView;

