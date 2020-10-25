import React, { Component } from "react"
import './App.css';
import  Button from "./Button"; 
import { Display } from "./Display";
import { OpDisplay } from "./OpDisplay";



class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      currentOperand: "",
      previousOperand: "",
      currentOperator: "",
      decimalOperand: false,
      newOperation: false,
    }
  }

  addNumber = number => {
    if (! this.state.newOperation) {
      if (number === ".") {
        if (!this.state.decimalOperand) {
          this.setState(
            {        
              currentOperand: this.state.currentOperand + number,
              decimalOperand: true
            },
            );
          
        } else {
          this.setState(
            {        
              currentOperand: this.state.currentOperand
            },
            );
        }
      } else {
        this.setState(
          {        
            currentOperand: this.state.currentOperand + number
          },
        );
      }
    } else {
      this.setState(
        {
          currentOperand: number,
          currentOperator: "",
          previousOperand: "",
          newOperation: false
        }
      )
    }
  }

  addOperator = operator => {
      if (this.state.newOperation === false) {
        this.setState(
        {
          previousOperand: this.state.currentOperand,
          currentOperator: operator,
          currentOperand: ""
        }
      );
    }
  }

  clearDisplay = clear => {
    this.setState(
      {
        currentOperand: "",
        previousOperand: "",
        currentOperator: ""
      }
    );
  }

  showResult = equal => {
    if (this.state.currentOperand !== "" && this.state.previousOperand !== "" && this.state.currentOperator !== "") {
      var operand_1 = parseFloat(this.state.previousOperand);
      var operand_2 = parseFloat(this.state.currentOperand);
      var result = 0.0;
      if (this.state.currentOperator === "+") {
            result = operand_1 + operand_2;
      }
      if (this.state.currentOperator === "-") {
        result = operand_1 - operand_2;
      }
      if (this.state.currentOperator === "*") {
        result = operand_1 * operand_2;
      }
      if (this.state.currentOperator === "/") {
        result = operand_1 / operand_2;
      }
    this.setState(
        {
          currentOperand: result,
          currentOperator: "",
          previousOperand: "",
          newOperation: true
        }
      )
    }
  }
  
  render() {
    return (
      <div className='App'>
        <div className="calc-wrapper">
          <OpDisplay opdisplay={this.state.previousOperand + this.state.currentOperator}/>
          <Display display={this.state.currentOperand}/>
          <div className='row'>
            <Button aoClicar={this.addNumber}>7</Button>
            <Button aoClicar={this.addNumber}>8</Button>
            <Button aoClicar={this.addNumber}>9</Button>
            <Button aoClicar={this.addOperator}>/</Button>
          </div>
          <div className='row'>
            <Button aoClicar={this.addNumber}>4</Button>
            <Button aoClicar={this.addNumber}>5</Button>
            <Button aoClicar={this.addNumber}>6</Button>
            <Button aoClicar={this.addOperator}>*</Button>
          </div>
          <div className='row'>
            <Button aoClicar={this.addNumber}>1</Button>
            <Button aoClicar={this.addNumber}>2</Button>
            <Button aoClicar={this.addNumber}>3</Button>
            <Button aoClicar={this.addOperator}>+</Button>
          </div>
          <div className='row'>
            <Button aoClicar={this.addNumber}>.</Button>
            <Button aoClicar={this.addNumber}>0</Button>
            <Button aoClicar={this.clearDisplay}>AC</Button>
            <Button aoClicar={this.addOperator}>-</Button>
          </div>
          <div className='row'>
            <Button aoClicar={this.showResult}>=</Button>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
