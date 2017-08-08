class App extends React.Component{
  constructor(state){
    super(state);
    this.state = {toDos:[], filter:'All', newTodoText: ''};
  }
  
  onAddToDoTextChange(text){
    this.setState({newTodoText:text});
  }
  
  onFilterChange(filter){
    this.setState({filter:filter});
  }
  
  onToggleToDo(id){
     this.setState((preState,props) => {
       return {toDos: preState.toDos.map(todo => this.toggleComplete(todo,id))}
     });
  }
  
  onAddToDo(){
    this.setState((preState,props) => {
      return {toDos: preState.toDos.concat({text: preState.newTodoText, completed: false, id: preState.toDos.length + 1}), newTodoText : ''}
    });
  }
  
  toggleComplete(todo, id){
		 return todo.id !=id ? todo : Object.assign({},todo,{completed: !todo.completed});
  }
  
  render(){
    let filter= this.state.filter;
    let newToDos= this.state.toDos.filter(i => filter == 'All' || i.completed == (filter == 'Complete'));
     return <div>
       <AddToDo text={this.state.newTodoText} onAddToDoTextChange={text => this.onAddToDoTextChange(text)} onAddToDo={e => this.onAddToDo()}/>
       <ShowToDos toDos={newToDos} onClick={id => this.onToggleToDo(id)}/>
       <Footer onFilterChange={filter => this.onFilterChange(filter)} filters={['All', 'Active', 'Complete']} selectedFilter={filter} />
     </div>
  }
  
}
       
function AddToDo(props){
      return <div><input value={props.text} onChange={e => props.onAddToDoTextChange(e.target.value)} />
        <button onClick={e => props.onAddToDo()}>Add Todo </button> </div>
}
       
function ShowToDos(props){
      return <ul>{props.toDos.map(item => <ToDo text={item.text} key={item.id} id={item.id} className={item.completed? 'completed': 'incompleted'} onClick={id => props.onClick(id)}/>)}</ul>
}
       
function ToDo(props){
      return <li id={props.id} onClick={e => props.onClick(e.target.id)} className={props.className}>{props.text}</li>
}

function Footer(props){
      return <div>Show: { props.filters.map((item, i) => <Filter name={item} key={i} selected={item == props.selectedFilter} onFilterChange={filter => props.onFilterChange(filter)}/>) } </div>
}

function Filter(props){
	return props.selected ? <span> {props.name} </span> :  <span> <a href="#" onClick={e=> props.onFilterChange(props.name)}>{props.name}</a></span>
}
ReactDOM.render(<App />, document.getElementById('root'));