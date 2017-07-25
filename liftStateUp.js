class TempretureConverter extends React.Component {
	  constructor(props){
      super(props);
      this.state = {c: '', f: ''};
    }
                   
   render(){
     return <div>
              <TempretureInput label='Celsius' tempreture={this.state.c} customFunction={celsius => this.setState({f:(celsius * 9 / 5) + 32, c:celsius})}/>
              <TempretureInput label='Fahrenheit' tempreture={this.state.f} customFunction={fahrenheit => this.setState({f:fahrenheit, c:(fahrenheit - 32) * 5 / 9})}/>
       </div>  
   }
}

class TempretureInput extends React.Component {
  render(){
     return <label> {this.props.label} : 
       <input value={this.props.tempreture} onChange={e => this.props.customFunction(e.target.value) }/> 
     </label>
   }
}

ReactDOM.render(
  <TempretureConverter />,
  document.getElementById('root')
);
