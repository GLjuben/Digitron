import { useState }from 'react';






function App () {
  // this is what is shown on the display;
  const [ calc, setCalc ] = useState('');
  
  // this state will store the result;
  const [ result, setResult ] = useState('');

  // this state will store the operators;
  const operations = ['/', '*', '+', '-', '.'];


  // All of our buttons hold a value, and when they will be clicked
  //  the value will basically apply to our calc;
  const updateCalc = value => {

    // if our operators includes the value AND the calculation is currently equal to nothing
    // or if the operators include the value AND the operators include the last value we entered;
    // Basically we say if the last value is an operator and the calculation has nothing 
    // OR the value is an operator and the last value is also an operator we will return nothing;
    // In essence,this will limit the number of operators and the dot/equal to one that we can use subsequently
    if (
      operations.includes(value) && calc === '' ||
      operations.includes(value) && operations.includes(calc.slice(-1))
    ) {
      return;
    }
    setCalc(calc + value)

    // How do we update results?
    // If the last value was not an operator we will set the result 
    // to the eval function which will evaluate the 


    if (!operations.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };



  // inside this function we will create all the numbers from 1 to 9;
  //  it will be an empty as an initial value;
  const createDigits = () => {
    // the array where the numbers will be stored;
    const digits = [];


    // This will create the buttons from 1 to 9;
    // We are basically saying for each of the numbers that are less than 10
    //  we will create a separate button;
    // We parse the numbers as strings before they are passed to updateCalc
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={()=>{ updateCalc(i.toString())}} key={i}> {i} </button>
      )
    };
    return digits;
  };


  // This function will evalaute the whole operations by clicking on the equal sign
  // we will evaluate our calculation and then we will return it
  const calculation = () => {
    setCalc(eval(calc).toString())
  }

  // Function to manage the delete button
  // we just slice the last digit/value from the calc and 
  // set the new value again on the calc state;

  const deleteButton = () => {
    if ( calc == ''){
      return ;
    };

    const value = calc.slice(0, -1);
    setCalc(value);
  }



  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {/* this will display the little result;
            this says if there is a value show the result*/}
          {result? <span>({result})</span> : ''  } &nbsp; {calc || "0" }
        </div>
        <div className="operators">
          <button onClick={()=>{ updateCalc('/')}}>/</button>
          <button onClick={()=>{ updateCalc('*')}}>*</button>
          <button onClick={()=>{ updateCalc('+')}}>+</button>
          <button onClick={()=>{ updateCalc('-')}}>-</button>

          <button onClick={deleteButton}>DEL</button>
        </div>

        <div className="digits">
          { createDigits() }
          <button onClick={()=>{ updateCalc('0')}} > 0 </button>
          <button onClick={()=>{ updateCalc('.')}} > . </button>

          <button onClick={calculation}> = </button>
        </div>
      </div>
    </div>
  );
};

export default App;
