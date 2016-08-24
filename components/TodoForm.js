import React, { Component } from 'react';
import jQuery from "jquery";
import Functions from '../libs/functions';

export default class TodoForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      errors: false,
      edit: false
    }

    this.onChange = this.onChange.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var self = this;
    var url = '/';

    if (this.state.edit)
      url += 'edit/' + self.state.id;
    else
      url += 'add';

    jQuery.ajax({
      url: url,
      dataType: 'json',
      type: 'post',
      data: this.state,
      cache: false,
      success: function(data) {
        console.log("ajax response");

        if (typeof data.errors != "undefined") {
          self.setState({
            errors: data.errors
          });
        } else {

          var items = self.props.items;

          // Update Item
          if (self.state.edit) {

            var index = items.getIndexBy("_id", self.state.id);
            if (index != -1) {
              items[index].title = data.item.title;
              items[index].text = data.item.text;
            }
          }
          // Create Item
          else {
            items.unshift(data.item);
          }

          self.props.setItems(items);
          self.setState({
            title: '',
            text: '',
            errors: false,
            edit: false
          });
        }
      },
    });

    return;
  }

  onChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value
    });
  }

  render() {
    var fields = ['title', 'text'];
    var fieldsClassNames = {};
    var fieldsReports = {};

    var buttonTitle = this.state.edit ? "Edit" : "Add";

    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];

      if (typeof this.state.errors[field] != "undefined") {
        fieldsClassNames[field] = "report";
        fieldsReports[field] = this.state.errors[field];
      } else {
        fieldsClassNames[field] = "report hidden";
        fieldsReports[field] = "";
      }
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label >Title:</label>
        <input type='text' ref='title' onChange={this.onChange} value={this.state.title} />
        <div className={ fieldsClassNames.title } ref="message_title" >{ fieldsReports.title }</div>
        <label >Text:</label>
        <textarea ref='text' onChange={this.onChangeText} value={this.state.text} />
        <div className={fieldsClassNames.text } ref="message_text" >{fieldsReports.text }</div>
        <input type='submit' value={ buttonTitle } />
      </form>
    );
    
  }
}