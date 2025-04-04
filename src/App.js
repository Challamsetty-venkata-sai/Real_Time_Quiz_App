import { useEffect, useReducer } from "react"

const initialstate={
  questions:[],
  status:"loading",
  index:0,
  selectedAnswer:null,
  points:0,
  secondsRemaining:300,
}

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, status: "ready", questions: action.payload };
    case "dataNotReceived": 
      return { ...state, status: "error" };
    case "active":
      return {...state,status:"active"};

    case "next" :
      if(state.index+1>=state.questions.length){
        return {...state,status:"finish"};
      }

      return {...state,index:action.payload,selectedAnswer:null};
    
    case "selectedAnswer":
      return {...state,selectedAnswer:action.payload,points:state.points+action.point};
    case "finish":
      return {...state,status:"finish"};
    case "tick":
      if(state.secondsRemaining===0)
      {
        return {...state,status:"finish"}
      }
      return {...state,secondsRemaining:state.secondsRemaining-1};
    case "restart":
      return {...state,status:"ready",secondsRemaining:action.payload,index:0,points:0,selectedAnswer:null}
    default:
      throw new Error("No such Status is Available");
  }
}
export function App()
{
  
  const [{questions,status,index,selectedAnswer,points,secondsRemaining},dispatch]=useReducer(reducer,initialstate);
  
    const ActualQuestion=questions[index]

  
  
  
  useEffect(function(){
    fetch("http://localhost:8000/questions")
    .then((response)=>response.json())
    .then((data)=>dispatch({type:"dataRecieved",payload:data}))
    .catch((error)=>{
      dispatch({type:"dataNotReceived"});
    })

  },[])
  function HandlingRestart()
  {
    dispatch({type:"restart",payload:300})
  }
  function HandlingStart()
  {
    dispatch({type:"active"})

  }
  function HandlingNext()
  {
    dispatch({type:"next",payload:index+1})

  }
  function HandlingClick(index)
  {
    let points=index=== ActualQuestion.correctOption ? ActualQuestion.points :0
    dispatch({type:"selectedAnswer",payload:index,point:points})
    
  }
  return (
    <div className="grid-container">
      <Header/>
      <Main status={status} 
      onstart={HandlingStart} 
      onquestions={ActualQuestion} 
      onNext={HandlingNext} 
      qui={index} 
      onselect={HandlingClick}
      onselectedAnswer={selectedAnswer}
      onpoints={points}
      ondispatch={dispatch}
      onseconds={secondsRemaining}
      onrestart={HandlingRestart}/>
      
      
    </div>
  )
}

function Header()
{
  return (
    <header className="header">
       
          <img src="favicon.ico" alt=""></img>
          <h1>REACT QUIZ APP</h1>
        
        
        
    </header>
  )
}
function Main({status,onstart,onquestions,onNext,qui,onselect,onselectedAnswer,onpoints,ondispatch,onseconds,onrestart}){
  return (
    <main className="main">
       {status==="loading" && <p>Loading !....</p>}
       {status==="error" && <p>Feteching Error Is Detected</p>}
       {status==="ready" && <Message onHandlingStart={onstart}/> }
       {status==="active" && <Questions questions={onquestions} 
       Next={onNext}
        onqui={qui}
         onselection={onselect} 
         selectedAnswer={onselectedAnswer} 
         onpoint={onpoints}
         dispatch={ondispatch}
         onremaining={onseconds}/>}
       {status==="finish" && <Finish ontotalpoints={onpoints} onrestart={onrestart}/>}


       

    </main>
  )
}
function Finish({ontotalpoints,onrestart})
{
  return (
    <div className="totalpoints">
      <h1>Congragulations You Finished your Test</h1>
      <h2>Your Score out of 280 is {ontotalpoints}</h2>
      <button onClick={()=>onrestart()}>ReStart</button>
    </div>
  )
}
function Message({onHandlingStart})
{
  return (
    <div className="quizdetails">
          <h1>Welcome To The Quiz</h1>
          <div>
            <h2>Lets get Started </h2>
            <button onClick={()=>onHandlingStart()}>Start</button>
          </div>
        </div>

  )
}
function Questions({questions,Next,onqui,onselection,selectedAnswer,onpoint,dispatch,onremaining})
{


  let option=questions.options;
  
  return (
    
  
  <div className="questionbox">
          <div className="questiondetails">
            <div>QuestionNo {onqui+1}</div>
            <div>{onpoint}/280</div>
          </div>
          <h2>{questions.question}</h2>
          <div className="options">

            {
              option.map((option,index)=>(
                <Button option={option} index={index} onquestion={questions} onsel={onselection} onselectedAnswer={selectedAnswer}></Button>
              ))
            }
             
            
</div>
          <div className="next">
             <Timmer ondispatch={dispatch} onsecondsremaining={onremaining}/>
            <button onClick={()=>Next()}>Next</button>
          </div>
         
       </div>
  )
        

}
function Timmer({ondispatch,onsecondsremaining})
{
  let min=Math.floor(onsecondsremaining/60);
  let sec=onsecondsremaining%60;
  useEffect(function(){
    const id=setInterval(function(){
      ondispatch({type:"tick"})

    },1000)

    return ()=>clearInterval(id);
  },[ondispatch]
)
  return (
    <p>{min>=0 && "0"}{min}:{sec<10 && "0"}{sec}</p>
  )
}
function Button({option,index,onquestion,onsel,onselectedAnswer})
{
  const isSelected = onselectedAnswer !== null && index === onselectedAnswer;
  const isCorrect = isSelected && onselectedAnswer === onquestion.correctOption;

  return (
    <button
      className={isSelected ? (isCorrect ? "green" : "red") : "normal"}
      style={{
      
        pointerEvents: onselectedAnswer !== null ? "none" : "auto",
      }}
      onClick={() => onsel(index)}
    >
      ({index + 1}) {option}
    </button>)
}