import React from "react"
import ReactDom from 'react-dom';
import TodoApp from "./components/TodoApp"

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML)

ReactDom.render(
  <TodoApp items={initialState}/>,
  document.getElementById('react-app')
);