import React, { Component } from 'react';


// Structure
// - Title: To-Do List
// - Sign in/out button

// Props
// - signInOut: Callback function for sign in/out button
// - isSignedIn: Whether the button is a sign in or sign out


class Header extends Component {
	render () {
		const signInOutText = this.props.isSignedIn ? "Sign Out" : "Sign In";

		return (
			<div className="container header">
				<h1>To-Do List</h1>
				<button
					className="btn-blue"
					onClick={this.props.signInOut}>
					{signInOutText}
				</button>
			</div>
		);
	}
}


export default Header;