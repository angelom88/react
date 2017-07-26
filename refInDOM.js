class TempretureConverter extends React.Component{
  render(){
     return <div>
              <TempretureInput label='Celsius' inputRef={input => this.cInput = input} syncTemature={ celsius => this.fInput.value = (celsius * 9 / 5 + 32).toFixed(0) }/>
              <TempretureInput label='Fahrenheit' inputRef={input => this.fInput = input} syncTemature={fahrenheit => this.cInput.value = ((fahrenheit - 32) * 5 / 9).toFixed(0) }/>
       </div>
  }
}

function TempretureInput(props) {
     return <label> {props.label} : <input onChange={e => props.syncTemature(e.target.value) } ref={props.inputRef} /></label>
}

ReactDOM.render(
  <TempretureConverter />,
  document.getElementById('container')
);