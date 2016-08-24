import React, { Component } from 'react';
import TodoListItem from "./TodoListItem";
import $ from "jquery";

export default class TodoList extends Component {

	constructor(props) {

		super(props);
		this.editItem = this.editItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.updateItemProperty = this.updateItemProperty.bind(this);

	}

	editItem(item) {

		this.props.fillForm(item);

	}

	deleteItem(item) {

		var self = this;
		var items = this.props.items;
		var index = items.getIndexBy("_id", item._id);

		if (index != -1) {

				this.serverRequest = $.ajax({
				url: "/delete/" + item._id,
				dataType: 'json',
				type: 'post',
				cache: false,
				success: function(data) {
					if (!data.err) {
						items.splice(index, 1);
						self.props.setItems(items);
					}
				}
			});
		}
	}

	updateItemProperty(item, property, value) {
		var self = this;
		var items = this.props.items;
		var index = items.getIndexBy("_id", item._id);

		if (index != -1) {

			this.serverRequest = $.ajax({
				url: "/update_property/" + item._id + "/" + property + "/" + value,
				dataType: 'json',
				type: 'post',
				cache: false,
				success: function(data) {
					items[index][property] = data.item[property];
					self.props.setItems(items);
				}
			});
		}
	}

	render(){
		var self = this;
		return (
			<div className="list">
				{this.props.items.map(function(result){
        	return <TodoListItem key={result._id} data={result} deleteItem={self.deleteItem} editItem={self.editItem} updateItemProperty={self.updateItemProperty} ></TodoListItem>;
        })}
			</div>
		);
	}

}