import React, { Component } from 'react';
import './App.css';

class Button extends Component {
  render = () =>
    <input type="button" className={this.props.type} value={this.props.value}
     onClick = {() => this.props.onClick()}
    />
  }

class Screen extends Component {
  render = () =>
    <input type="text" className="screen" value={this.props.value} />
}

class Calc extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: 0,
      memory: 0,
      operation: "",
    }
  }

  resultOperation = (arg1, arg2, op) => {
    let res = 0;
    switch (op) {
      case "+":
         res = parseFloat(arg1) + parseFloat(arg2);
         break;
      case "-":
         res =  parseFloat(arg1) - parseFloat(arg2);
         break;
      case "*":
         res = parseFloat(arg1) * parseFloat(arg2);
         break;
      case "/":
         res = parseFloat(arg1) / parseFloat(arg2);
         break;
      default:
         res = 0;
    }
    return res;
  }

  wasInputed = (val) => {
    if ("0123456789".indexOf(val) > -1){
      if (this.state.operation === "="){
        this.setState({
          value: parseFloat(val),
          operation: "",
        })
      }
      else{
        this.setState({
          value: parseFloat(this.state.value + val)
        })
      }
    }
    else {
      switch (val) {
        case 'C':
          this.setState({
            value:0,
            memory:0,
            operation: "",
          });
          break;
        case '+':
          this.setState({
            memory:this.state.value,
            value: 0,
            operation: "+"
          })
          break;
        case '-':
          this.setState({
            memory:this.state.value,
            value: 0,
            operation: "-"
          });
          break;
        case '*':
          this.setState({
            memory:this.state.value,
            value: 0,
            operation: "*"
          });
          break;
        case '/':
          this.setState({
            memory:this.state.value,
            value: 0,
            operation: "+"
          });
          break;
        case '=':
          this.setState({
            value: this.resultOperation(this.state.memory, this.state.value, this.state.operation),
            memory: 0,
            operation: "=",
          })
          break;
        default:
          break;
      }
    }
  }

  renderButton = (type, value) =>
    <Button type={type}
            value={value}
            onClick={() => this.wasInputed(value)}
    />

  render = () =>
    <div id="calc">
      <div className="screen">
        <Screen value={this.state.value} />
      </div>
      <div className="calc-row" >
        {this.renderButton("num", "7")}
        {this.renderButton("num", "8")}
        {this.renderButton("num", "9")}
        {this.renderButton("act", "+")}
      </div>
      <div className="calc-row" >
        {this.renderButton("num", "4")}
        {this.renderButton("num", "5")}
        {this.renderButton("num", "6")}
        {this.renderButton("act", "-")}
      </div>
      <div className="calc-row" >
        {this.renderButton("num", "1")}
        {this.renderButton("num", "2")}
        {this.renderButton("num", "3")}
        {this.renderButton("act", "*")}
      </div>
      <div className="calc-row" >
        {this.renderButton("num", "0")}
        {this.renderButton("act", "C")}
        {this.renderButton("act", "=")}
        {this.renderButton("act", "/")}
      </div>
      <div className="calc-row-mem">
        <div>state.value: {this.state.value}</div>
        <div>state.memory: {this.state.memory}</div>
        <div>state.operation: {this.state.operation}</div>
      </div>
    </div>
}

class App extends Component {
  render() {
    return (
      <div className="Calc">
        <Calc />
      </div>
    );
  }
}

export default App;
