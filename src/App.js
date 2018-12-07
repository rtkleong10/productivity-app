import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import Header from './Header';
import TaskOptions from './TaskOptions';
import TaskList from './TaskList';


// Database
// users
// - userID
// 		- taskKey
// 			- name: taskName
// 			- isDone: true/false (false by default)

// Structure
// - Header: title + sign in/out
// - TaskOptions: add tasks + clear tasks
// - TaskList: list of uncompleted & completed tasks

// State
// - uid: userID
// - tasks
// - tasksRef


class App extends Component {

	// Lifecycle methods
	constructor(props) {

		super(props)
		this.state = {
			uid: "",
			tasksRef: null,
			tasks: {}
		};
	}

	componentDidMount() {

		// Whenever the authentication state changes
		firebase.auth().onAuthStateChanged( user => {

			// Signed in
			if (user) {

				// Update uid
				this.setState({uid: user.uid});

				// Update tasksRef
				const userRef = firebase.database().ref().child("users").child(this.state.uid);
				this.setState({
					tasksRef: userRef
				});

				// Update tasks whenever tasksRef changes
				this.state.tasksRef.on("value", snap => {
					this.setState({
						tasks: snap.val()
					});
				});

			// Not signed in: Reset uid, tasks & tasksRef
			} else {

				this.setState({
					uid: "",
					tasksRef: null,
					tasks: {}
				});
			}
		});
	}

	//////////////////////////////////////////////////////////////////////////////

	// Callback functions (lambda functions used to automatically bind this)

	// Header
	// Sign in/out button
	signInOut = () => {
		
		// Sign in (using Google accounts)
		if (this.state.uid === "") {

			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider).catch((e) => {
				console.error(e);
			});

		// Sign out
		} else {

			firebase.auth().signOut().catch((e) => {
				console.error(e);
			});
		}
	};


	// TaskOptions
	// Add task button
	addTask = (taskName) => {

		// Get a new key for the task
		const newTaskRef = this.state.tasksRef.push();

		// Assign the taskName & set isDone to false by default
		newTaskRef.set({
			name: taskName,
			isDone: false
		});
	};

	// Clear button (remove all tasks by deleting the tasks ref)
	clear = () => {

		this.state.tasksRef.remove();
	};


	// TaskList
	// Checkbox button (toggle isDone)
	toggleDone = (key) => {

		const taskRef = this.state.tasksRef.child(key);
		taskRef.child("isDone").set(!this.state.tasks[key].isDone);
	};

	// Trash button (delete the task ref)
	deleteTask = (key) => {

		const taskRef = this.state.tasksRef.child(key);
		taskRef.remove();
	};

	// Dragging (swap values of fromPos & toPos)
	reorderTasks = (fromPos, toPos) => {

		this.state.tasksRef.child(toPos).set(this.state.tasks[fromPos]);
		this.state.tasksRef.child(fromPos).set(this.state.tasks[toPos]);
	};


	//////////////////////////////////////////////////////////////////////////////
	
	render() {

		// Signed in
		if (this.state.uid !== "") {

			return (
				<div>
					<Header
						signInOut={this.signInOut}
						isSignedIn={true} />
					<TaskOptions
						addTask={this.addTask}
						clear={this.clear} />
					<TaskList
						tasks={this.state.tasks}
						toggleDone={this.toggleDone}
						deleteTask={this.deleteTask}
						reorderTasks={this.reorderTasks} />
				</div>
			);

		// Not signed in (no TaskOptions & TaskList)
		} else {

			return (
				<div>
					<Header
						signInOut={this.signInOut}
						isSignedIn={false} />
				</div>
			);
		}
	}
}


export default App