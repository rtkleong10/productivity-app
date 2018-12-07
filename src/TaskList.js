import React, { Component } from 'react';

// Structure
// - Uncompleted tasks
// 		- Checkbox
//		- Task name
//		- Trash button
// - Completed: Click to collapse & expand
// - Completed tasks (same structure as uncompleted tasks)

// Props
// - tasks: dictionary of tasks (key {name: taskName, isDone: true/false})
// - toggleDone: Callback function for checkbox button
// - deleteTask: Callback function for trash button

// State
// - showCompleted: Whether to show completed tasks

class TaskList extends Component {

	collapsibleContentRef = React.createRef();

	// Lifecycle Methods
	constructor(props) {

		super(props);
		this.state = {
			showCompleted: false
		};
	}

	//////////////////////////////////////////////////////////////////////////////

	// Callback Functions
	// Toggle the showing of completed tasks
	toggleCompleted = () => {

		// Toggle state value
		const showCompleted = this.state.showCompleted
		this.setState({
			showCompleted: !showCompleted
		});

		// Toggle visibility
		// Hide
		if (this.collapsibleContentRef.current.style.maxHeight) {

			this.collapsibleContentRef.current.style.maxHeight = null;

		// Show
		} else {

			this.collapsibleContentRef.current.style.maxHeight = this.collapsibleContentRef.current.scrollHeight + "px";
		}
	}

	//////////////////////////////////////////////////////////////////////////////

	render() {

		let tasks = this.props.tasks;
		let taskDoneDivs = [];
		let taskNotDoneDivs = [];

		// Fill up taskDoneDivs & taskNotDoneDivs
		for (let key in tasks) {

			const task = tasks[key];

			if (task.isDone) {

				taskDoneDivs.push(
					<div className="task" key={key}>
						<div className="icon done" onClick={() => this.props.toggleDone(key)}></div>
						<p>{task.name}</p>
						<div className="icon trash" onClick={() => this.props.deleteTask(key)}></div>
					</div>
				);

			} else {

				taskNotDoneDivs.push(
					<div className="task" key={key}>
						<div className="icon not-done" onClick={() => this.props.toggleDone(key)}></div>
						<p>{task.name}</p>
						<div className="icon trash" onClick={() => this.props.deleteTask(key)}></div>
					</div>
				);
			}
		}

		// Completed Tasks
		if(taskDoneDivs.length !== 0) {

			return (
				<div className="container task-list">
					<div>
						{taskNotDoneDivs}
					</div>
					<button className="collapsible" onClick={this.toggleCompleted}>Completed</button>
					<div className="collapsible-content" ref={this.collapsibleContentRef}>
						{taskDoneDivs}
					</div>
				</div>
			);

		// No completed tasks
		} else {

			return (
				<div className="container task-list">
					<div>
						{taskNotDoneDivs}
					</div>
				</div>
			);
		}
	}
}


export default TaskList;