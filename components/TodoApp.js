import React, { Component } from 'react';
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default class TodoApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: props.items
    };
    this.setItems = this.setItems.bind(this);
    this.fillForm = this.fillForm.bind(this);
  }

  setItems(items) {
    this.setState({
      items: items
    });
  }

  fillForm(item) {
    var form = this.refs.todoForm;
    form.setState({
      title: item.title,
      text: item.text,
      edit: true,
      id: item._id
    });
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <TodoForm items={this.state.items} setItems={this.setItems} ref="todoForm" />
        <TodoList items={this.state.items} setItems={this.setItems} fillForm={this.fillForm} />
      </div>
    )
  }

}