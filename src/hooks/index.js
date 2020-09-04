import { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';
import moment from 'moment';



export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);
    //users, setUsers
    //cats, setCats
    useEffect(() => {
        let unsubcribe = firebase
        .firestore()
        .collection('tasks')
        .where('usrId', '==', 'jilIFXIwyAL3tzHMtzRbw');

        unsubcribe = selectedProject && !collatedTasksExist(selectedProject) 
        ? (unsubcribe = unsubcribe.where('projectId', '==', selectedProject))
        : selectedProject === 'TODAY'
        ? (unsubcribe = unsubcribe.where(
            'date',
             '==',
              moment().format('DD/MM/YYYY')
            ))
        : selectedProject === 'INBOX' || selectedProject === 0
        ? (unsubcribe = unsubcribe.where('date', '==', ''))
        : unsubcribe;
              
        unsubcribe = unsubcribe.onSnapshot(snapshot => {
            const newTasks = snapshot.docs.map(task => ({
                id: task.id,
                ...task.data(),
            }));

            setTasks(
                selectedProject === 'NEXT_7'
                ? newTasks.filter(
                    task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && 
                    task.archived !== true
                )
                : newTasks.filter(task => task.archived !== true)
            );

            setArchivedTasks(newTasks.filter(task => task.archived !== false))
        });    

        return () => unsubcribe();
    },[selectedProject]);

    return { tasks, archivedTasks };
};
//ONCE SELECTED PROJECT CHANGES RE-RUN THE WHOLE FUNCTION ABOVE!!!


export const useProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        firebase
        .firestore()
        .collection('projects')
        .where('userId', '==', 'jilIFXIwyAL3tzHMtzRbw')
        .orderBy('projectId')
        .get()
        .then(snapshot => {
            const allProjects = snapshot.docs.map(project => ({
                ...project.data(),
                docId: project.id,
            }));

            if (JSON.stringify(allProjects !== JSON.stringify(projects))) {
                setProjects(allProjects);
            }
        });
    },[projects]);

    return { projects, setProjects };
};
