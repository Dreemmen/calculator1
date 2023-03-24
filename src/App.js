import "./App.css"
import { useState } from "react";

function App() {
  const [outputScreen, setOutputScreen] = useState('0')
  const [formulaScreen, setFormulaScreen] = useState('')
  const [lastIsOperation, setLastIsOperation] = useState(false)

  const handleClear = () => {
    setLastIsOperation(false)
    setOutputScreen('0')
    setFormulaScreen('')
  }

  const handleNumber = event => {
    if(formulaScreen != '') setFormulaScreen('')
    setLastIsOperation(false)
    const number = event.target.textContent;
    (outputScreen == '0')?setOutputScreen(number):setOutputScreen(outputScreen + number)
  }

  const handleOperator = event => {
    if(formulaScreen != '') setFormulaScreen('')
    const operator = event.target.textContent;
    const array = (outputScreen.split(' ')).filter(item => item)
    const laseElement = array[array.length - 1]
    if(laseElement == '.'){
      setOutputScreen(outputScreen.substring(0, outputScreen.length-1) + ' ' + operator + ' ' )
    }else if(isNaN(laseElement) && operator != '-'){
      setOutputScreen(outputScreen.substring(0, outputScreen.length-3) + ' ' + operator + ' ' )
    }else{
      setOutputScreen(outputScreen + ' ' + operator + ' ' )
    }
    setLastIsOperation(true)
  }

  const handleEquals = () => {
    if(!lastIsOperation){
      setFormulaScreen(outputScreen)
      const result = eval(outputScreen)
      setOutputScreen((isNaN(result))?'0':result.toString())
      setLastIsOperation(false)
    }
  }
const handleDecimal = () => {
  const array = outputScreen.split(' ')
  const laseElement = array[array.length - 1]

  if(!laseElement.includes('.') && !isNaN(parseInt(laseElement))){
    setOutputScreen(outputScreen + '.')
  }
}

  return (
    <div className="App">
      <div className='display'>
        <div className="formulaScreen" >{formulaScreen}</div>
        <div id="display" className="outputScreen">{outputScreen}</div>
      </div>

      <div id="clear" className='button ac-button' onClick={handleClear}>All Clear</div>
      <div id="divide" className='button divide-button oper-button' onClick={handleOperator}>/</div>

      <div id="one" className='button button1 num-button' onClick={handleNumber}>1</div>
      <div id="two" className='button button2 num-button' onClick={handleNumber}>2</div>
      <div id="three" className='button button3 num-button' onClick={handleNumber}>3</div>
      <div id="multiply" className='button multiply-button oper-button' onClick={handleOperator}>*</div>

      <div id="four" className='button button4 num-button' onClick={handleNumber}>4</div>
      <div id="five" className='button button5 num-button' onClick={handleNumber}>5</div>
      <div id="six" className='button button6 num-button' onClick={handleNumber}>6</div>
      <div id="add" className='button plus-button oper-button' onClick={handleOperator}>+</div>

      <div id="seven" className='button button7 num-button' onClick={handleNumber}>7</div>
      <div id="eight" className='button button8 num-button' onClick={handleNumber}>8</div>
      <div id="nine" className='button button9 num-button' onClick={handleNumber}>9</div>
      <div id="subtract" className='button minus-button oper-button' onClick={handleOperator}>-</div>

      <div id="decimal" className='button period-button' onClick={handleDecimal}>.</div>
      <div id="zero" className='button button0 num-button' onClick={handleNumber}>0</div>
      <div id="equals" className='button eval-button' onClick={handleEquals}>=</div>
    </div>
  );
}

export default App;
