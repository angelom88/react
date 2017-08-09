class App extends React.Component{
  constructor(state){
    super(state);
    this.state = {toDos:[], filter:'All'};
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
    let newTodo = this.newAddTodo.value;
    this.newAddTodo.value = '';
    this.setState((preState,props) => {
      return {toDos: preState.toDos.concat({text: newTodo, completed: false, id: preState.toDos.length + 1})}
    });
  }
  
  toggleComplete(todo, id){
		 return todo.id !=id ? todo : Object.assign({},todo,{completed: !todo.completed});
  }
  
  render(){
    let filter= this.state.filter;
    let newToDos= this.state.toDos.filter(i => filter == 'All' || i.completed == (filter == 'Complete'));
     return <div>
       <AddToDo inputRef={input => this.newAddTodo = input} onAddToDo={() => this.onAddToDo()}/>
       <ShowToDos toDos={newToDos} onClick={id => this.onToggleToDo(id)}/>
       <Footer onFilterChange={filter => this.onFilterChange(filter)} filters={['All', 'Active', 'Complete']} selectedFilter={filter} />
     </div>
  }
  
}
       
function AddToDo(props){
      return <div><input ref={props.inputRef}/>
        <button onClick={props.onAddToDo}>Add Todo </button> </div>
}
       
function ShowToDos(props){
      return <ul>{props.toDos.map(item => <ToDo text={item.text} key={item.id} className={item.completed? 'completed': 'incompleted'} onClick={() => props.onClick(item.id)}/>)}</ul>
}
       
function ToDo(props){
      return <li onClick={props.onClick} className={props.className}>{props.text}</li>
}

function Footer(props){
      return <div>Show: { props.filters.map((item, i) => <Filter name={item} key={i} selected={item == props.selectedFilter} onFilterChange={() => props.onFilterChange(item)}/>) } </div>
}

function Filter(props){
	return <span> {props.selected ? props.name :  <a href="#" onClick={props.onFilterChange}>{props.name}</a>} </span>
}
ReactDOM.render(<App/>, document.getElementById('root'));