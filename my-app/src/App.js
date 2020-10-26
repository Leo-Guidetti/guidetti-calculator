import React, { Component } from "react"
import './App.css';
import  Button from "./components/Button/Button"; 
import { Display } from "./components/Display/Display";
import { OpDisplay } from "./components/OpDisplay/OpDisplay";
import  Memory  from "./components/Memory/Memory";



class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      currentOperand: "",
      previousOperand: "",
      currentOperator: "",
      decimalOperand: false,
      newOperation: false,
      memory: []
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
      if (! this.state.newOperation) {
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
          currentOperand: String(result),
          currentOperator: "",
          previousOperand: "",
          newOperation: true
        }
      )
    }
  }

  memoryOperationButtons = save => {
    var AuxMemory = this.state.memory
    if (save === 'MS') {
      AuxMemory.push(this.state.currentOperand)
      this.setState(
          {
            memory: AuxMemory,
            currentOperand: ""
          }
        )
    }
    if (save === 'M+' && this.state.currentOperand !== "" && AuxMemory.length > 0) {
      var sumElement = parseFloat(AuxMemory[AuxMemory.length-1]);
      var CurrentElement = parseFloat(this.state.currentOperand);
      this.setState(
        {
          currentOperand: String(CurrentElement + sumElement)
        }
      )
    }
    if (save === 'MR') {
      this.setState(
        {
          currentOperand: AuxMemory[AuxMemory.length-1],
          newOperation: false
        }
      )
    }
    if (save === 'MC') {
      this.setState(
        {
          memory: []
        }
      )
    }
  }

  memoryOperationElements = MemIndex => {
    var AuxMemory = this.state.memory;
    var mem = MemIndex.slice(0,2);
    var index = (AuxMemory.length-parseInt(MemIndex.slice(-1))-1); // O index pega o valor do índice do elemento na memória, e faz o cálculo como se a lista estivesse revertida
    if (mem === "MC") {
      AuxMemory.splice(index, 1);
      this.setState(
        {
          memory: AuxMemory
        }
      )
    }
    if (mem === "MR") {
      var newOperand = parseFloat(AuxMemory.slice(index));
      this.setState(
        {
          currentOperand: newOperand,
          newOperation: false
        }
      )
    }
    }

  
  
  render() {
    return (
      <div className='App'>
        <div className='general-content'>
          <div className='calculator-side'>
            <div className="calc-wrapper">
              <OpDisplay opdisplay={this.state.previousOperand + this.state.currentOperator}/>
              <Display display={this.state.currentOperand}/>
              <div className='row'>
                <Button aoClicar={this.memoryOperationButtons}>MC</Button>
                <Button aoClicar={this.memoryOperationButtons}>MR</Button>
                <Button aoClicar={this.memoryOperationButtons}>M+</Button>
                <Button aoClicar={this.memoryOperationButtons}>MS</Button>
              </div>
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
          <div className="memory-side">
            <div className='memory-title'>
              Memória
            </div>
            {this.state.memory.reverse().map((value, index) => <Memory key={index} item={value} index={index} aoClicar={this.memoryOperationElements} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
