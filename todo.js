class App extends React.Component{
  constructor(state){
    	super(state);
    	this.state = {toDos:[], filter:'ALL', newTodoText: ''};
  }
  
  onAddToDoTextChange(text){
    this.setState({newTodoText:text});
  }
  
  onAddToDo(){
    this.setState({toDos: this.state.toDos.concat({text: this.state.newTodoText}), newTodoText : ''});
  }
  
  render(){
     return <div>
       <AddToDo text={this.state.newTodoText} onAddToDoTextChange={text => this.onAddToDoTextChange(text)} onAddToDo={e => this.onAddToDo()}/>
       <ShowToDos toDos={this.state.toDos}/>
     </div>
  }
  
}
       
function AddToDo(props){
      return <div><input value={props.text} onChange={e => props.onAddToDoTextChange(e.target.value)} />
        <button onClick={e => props.onAddToDo()}>Add Todo </button> </div>
}
       
function ShowToDos(props){
      return <ul>{props.toDos.map((item, i) => <ToDo text={item.text} key={i}/>)}</ul>
}
       
function ToDo(props){
      return <li>{props.text}</li>
}

ReactDOM.render(<App />, document.getElementById('root'));