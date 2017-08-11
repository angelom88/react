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
       
const AddToDo = ({inputRef,onAddToDo}) => <div><input ref={inputRef}/><button onClick={onAddToDo}>Add Todo </button> </div>
       
const ShowToDos = ({toDos, onClick}) => 
      <ul>{toDos.map(item => <ToDo text={item.text} key={item.id} className={item.completed? 'completed': 'incompleted'} onClick={() => onClick(item.id)}/>)}</ul>
       
const ToDo = ({onClick,className,text}) => <li onClick={onClick} className={className}>{text}</li>


const Footer = ({filters, selectedFilter, onFilterChange}) =>
      <div>Show: { filters.map((item, i) => <Filter name={item} key={i} selected={item == selectedFilter} onFilterChange={() => onFilterChange(item)}/>) } </div>


const Filter = ({selected, name, onFilterChange}) => 
	<span> {selected ? name :  <a href="#" onClick={onFilterChange}>{name}</a>} </span>

ReactDOM.render(<App/>, document.getElementById('root'));