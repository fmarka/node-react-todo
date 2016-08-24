import React, { Component } from 'react';

export default class TodoListItem extends Component {

	constructor(props) {
		super(props);
		//this.updateItemProperty = this.updateItemProperty.bind(this);
	}

	deleteItem(item) {
		if (typeof confirm == "function")
			if (confirm("Do You really want to delete item?")) {
				this.props.deleteItem(item);
			} else
				this.props.deleteItem(item);
	}

	editItem(item) {
		this.props.editItem(item);
	}

	updateItemProperty(item) {
		var completed;
		if (typeof item.completed != undefined && item.completed) {
			completed = false;
		} else
			completed = true;

		this.props.updateItemProperty(item, "completed", completed);
	}

	render(){
		var item = this.props.data;
		var checkClassName = item.completed ? "fa fa-check-square-o" : "fa fa-square-o";
		var itemClassName = item.completed ? "item item_completed" : "item";

		return (
			<div className={itemClassName} >
				<div className="check_con" >
					<div className="check" onClick={this.updateItemProperty.bind(this, item ) } ><i className={checkClassName}></i></div>
				</div>
				<div className="texts">
					<div className="title">
						{item.title}
					</div>
					<div>
						{item.text}
					</div>
					<div className="delete" onClick={this.deleteItem.bind(this, item ) } ><i className="fa fa-times"></i></div>
					<div className="edit" onClick={this.editItem.bind(this, item ) } ><i className="fa fa-pencil"></i></div>
				</div>
			</div>
		);
	}

}