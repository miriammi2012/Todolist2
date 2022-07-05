import React from 'react';
import MyTask from './MyTask';
import Completed from './Completed';
import firebase from './Config';

class App extends React.Component {
    state ={
        MyTask: 'active',
        MyTaskView: 'block',
        Completed: '',
        CompletedView: 'none',

        user: 'Joy',
        taskDatabase: [],
        completedDatabase: []
    }

    // 1 -- task
    updateTaskDatabase = () => {
        let taskDatabaseRef = firebase.database().ref(`${this.state.user}/task`);
        taskDatabaseRef.orderByChild('order').once('value', (snapshot) => {
            let orderTask = [];
            snapshot.forEach(function(item){
                let obj = {key: item.key, content: item.val()};
                orderTask.push(obj);
            });
            this.setState({taskDatabase: orderTask});
        });
    }

    // 2 -- completed
    updateCompletedDatabase = () => {
        let completedDatabaseRef = firebase.database().ref(`${this.state.user}/completed`);
        completedDatabaseRef.orderByChild('issueDate').once('value', (snapshot) => {
            let orderTask = [];
            snapshot.forEach(function(item){
                let obj = {key: item.key, content: item.val()};
                orderTask.push(obj);
            });
            this.setState({completedDatabase: orderTask});
        });
    }

    componentDidMount(){
        // 3
        this.updateTaskDatabase();
        this.updateCompletedDatabase();
    }

    // MyTask
    onMyTaskClick = (e) => {
        this.setState({
            MyTask: 'active',
            MyTaskView: 'block',
            Completed: '',
            CompletedView: 'none'
        });
    };

    // Completed 
    onCompletedClick = (e) => {
        this.setState({
            MyTask: '',
            MyTaskView: 'none',
            Completed: 'active',
            CompletedView: 'block'
        });
    };

    // MyTask 
    //  Task
    onTaskSubmit =(task) => {
        let {user} = this.state; 
        let issueDate = new Date().toJSON().slice(0,10);
        let taskDatabaseRef = firebase.database().ref(`${user}/task`);
        
        // task 
        if(task){
            taskDatabaseRef.push({
                title: task, 
                deadline: '', 
                note: '', 
                issueDate: issueDate,
                completeDate: '', 
                order: issueDate
            });
        }

        //  task 
        this.updateTaskDatabase();
    }

    //  Task
    modifyTask = (params) => {
        let {user} = this.state; 
        let {id, taskTitle, deadline, comment, order} = params;
        let taskRef = firebase.database().ref(`${user}/task/${id}`);

        // 
        taskRef.child('title').set(taskTitle);
        taskRef.child('deadline').set(deadline);
        taskRef.child('note').set(comment);
        taskRef.child('order').set(order);
        
        //  task 
        this.updateTaskDatabase();
    }

    //  Task
    deleteTask = (id) => {
        let {user} = this.state; 
        let taskDatabaseRef = firebase.database().ref(`${user}/task`);

        //  Task
        taskDatabaseRef.child(id).remove();

        //  task 
        this.updateTaskDatabase();
    }

    //  Task
    completeTask = (params) => {
        let {user} = this.state; 
        let {id, issueDate, title, deadline, note, order} = params;
        let taskDatabaseRef = firebase.database().ref(`${user}/task`);
        let completedTaskDatabaseRef = firebase.database().ref(`${user}/completed`);
        let completeDate = new Date().toJSON().slice(0,10);
        
        //  task complete 
        completedTaskDatabaseRef.push({
            title: title, 
            deadline: deadline, 
            note: note, 
            issueDate: issueDate,
            completeDate: completeDate,
            order: order
        });

        //  task  task ，
        taskDatabaseRef.child(id).remove();
        setTimeout(()=>{
            taskDatabaseRef.orderByChild('order').once('value', (snapshot) => {
                let orderTask = [];
                snapshot.forEach(function(item){
                    let obj = {key: item.key, content: item.val()};
                    orderTask.push(obj);
                });
                this.setState({taskDatabase: orderTask});
            });
        }, 2000);

        //  completed 
        this.updateCompletedDatabase();
    }

    // Completed 
    // 
    cancelComplete = (params) => {
        let {user} = this.state; 
        let {id, issueDate, title, deadline, note, order} = params;
        let taskDatabaseRef = firebase.database().ref(`${user}/task`);
        let completedDatabaseRef = firebase.database().ref(`${user}/completed`);

        //  task 
        taskDatabaseRef.push({
            title: title, 
            deadline: deadline, 
            note: note, 
            issueDate: issueDate,
            completeDate: '', 
            order: order
        });

        //  Completed  Task，
        completedDatabaseRef.child(id).remove();
        setTimeout(()=>{
            completedDatabaseRef.orderByChild('issueDate').once('value', (snapshot) => {
                let orderTask = [];
                snapshot.forEach(function(item){
                    let obj = {key: item.key, content: item.val()};
                    orderTask.push(obj);
                });
                this.setState({completedDatabase: orderTask});
            });
        }, 2000);

        //  task 
        this.updateTaskDatabase();
    }

    //  Task
    deleteTask_completed = (id) => {
        let {user} = this.state; 
        let completedDatabaseRef = firebase.database().ref(`${user}/completed`);

        //  Task
        completedDatabaseRef.child(id).remove();

        //  completed 
        this.updateCompletedDatabase();
    }

    render(){
        let MyTaskView = {display: this.state.MyTaskView};
        let CompletedView = {display: this.state.CompletedView};
        let class__MyTask = `${this.state.MyTask} nav__mytask`;
        let class__Completed = `${this.state.Completed} nav__completed`;

        let {user, taskDatabase, completedDatabase} = this.state;

        return (
            <div>
                <div className="nav">
                    <ul className="tabs">
                        <li className={class__MyTask} onClick={this.onMyTaskClick}>My tasks</li>
                        <li className={class__Completed} onClick={this.onCompletedClick}>Completed</li>
                    </ul>
                </div>

                <div className="tab__content">
                    <div style={MyTaskView} className="task__inprogress">
                        <MyTask 
                            user={user}
                            taskDatabase={taskDatabase}
                            onTaskSubmit={this.onTaskSubmit}
                            modifyTask={this.modifyTask}
                            deleteTask={this.deleteTask}
                            completeTask={this.completeTask}
                        />
                    </div>
                    <div style={CompletedView} className="task__completed">
                        <Completed 
                            user={user}
                            completedDatabase={completedDatabase}
                            cancelComplete={this.cancelComplete}
                            deleteTask_completed={this.deleteTask_completed}
                        />
                    </div>
                </div>
            </div>
        );
    }
} 

export default App;

