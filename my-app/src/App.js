// import './App.css';

import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      newTodo: '',
    }
  }

  handleChange = (event) => {
    this.setState({ newTodo: event.target.value })
    console.log(this.state)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { todos, newTodo } = this.state;
    if (newTodo.trim() === '') return;
    const updateTodo = [...todos, newTodo];
    this.setState({ todos: updateTodo, newTodo: '' })
  }

  handleDelete = (index) => {
    const { todos } = this.state;
    const updateTodo = todos.filter((todo, todoIndex) => todoIndex !== index);
    this.setState({ todos: updateTodo })
  }

  render() {
    const { todos, newTodo } = this.state
    return (
    <div>
      <h1>To-do-list</h1>
        <form onSubmit={this.handleSubmit}>
          <input type='text' onChange={this.handleChange} value={newTodo} placeholder="Add new todo..." />
          <input type='submit' value='Submit' />
        </form>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}
              <button onClick={()=> this.handleDelete(index)}>-</button>
            </li>
          ))}
        </ul>
    </div> 
    )
  }
}

