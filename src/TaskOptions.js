import React, { Component } from 'react';


// Structure
// - Input: New task title
// - Add task button
// - Clear tasks button: Clears all tasks

// Props
// - addTask: Callback function for add task button
// - clear: Callback function for clear button


class TaskOptions extends Component {

	inputElement = React.createRef();

	// Lifecycle Methods
	// Autofocus on add task input
	componentDidMount() {

		this.inputElement.current.focus();
	}

	//////////////////////////////////////////////////////////////////////////////

	// Callback Functions
	// Add task: Call the props callback function & reset the input's value
	addTask = (e) => {

		e.preventDefault();	
		this.props.addTask(this.inputElement.current.value);
		this.inputElement.current.value = "";
	}

	//////////////////////////////////////////////////////////////////////////////

	render() {
		
		return (
			<div className="container task-options">
				<div>
					<form>
						<input
							type="text"
							ref={this.inputElement} />
						<button
							type="submit"
							className="btn-green round"
							onClick={this.addTask}>
							+
						</button>
					</form>
					<button
						className="btn-pink"
						onClick={this.props.clear}>
						Clear
					</button>
				</div>
			</div>
		);
	}
}


export default TaskOptions;