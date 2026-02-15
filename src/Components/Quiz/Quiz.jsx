import React, {useState, useRef} from 'react'
import './Quiz.css'
import { data } from '../../assets/data'
const Quiz = () => {

  let [index, setIndex] = useState(0)
  let [score, setScore] = useState(0)
  let [question, setQuestion] = useState(data[index].question)
  let[lock, setLock] = useState(false)
  let[result, setResult] = useState(false)

  let Option1 = useRef(null)
  let Option2 = useRef(null)
  let Option3 = useRef(null)
  let Option4 = useRef(null)

  let option_array = [Option1, Option2, Option3, Option4]

  const checkAns = (e, ans) => {
    if (lock === false)
    {
      if (ans == data[index].answer)
      {
        e.target.classList.add("correct")
        setScore(prev=>prev + 1 )
      }
      else{
        e.target.classList.add("wrong")
        option_array[data[index].answer-1].current.classList.add("correct")
      }
      setLock(true)
    }
  }

  const next = () => {
    if (lock === true)
    {
      if (index === data.length - 1) 
      {
        setResult(true)
        return 0
      }
      setIndex(index + 1)
      setQuestion(data[index + 1].question)
      setLock(false)
      option_array.map(option => {
        option.current.classList.remove("correct", "wrong")
        return null
      })
    }
  }

  const reset = () => {
    setIndex(0)
    setQuestion(data[0].question)
    setScore(0)
    setLock(false)
    setResult(false)
  }

  return (
    <div className="container">
        <h1>Quiz App</h1>
        <hr/>
        {result? <> </>: <>
          <div className="question">
            <h2>{index + 1}. {question}</h2>
            <div className="options">
                <li ref={Option1} className="option" onClick={(e) => checkAns(e, 1)}> {data[index].options1}</li>
                <li ref={Option2} className="option" onClick={(e) => checkAns(e, 2)}>{data[index].options2}</li>
                <li ref={Option3} className="option" onClick={(e) => checkAns(e, 3)}>{data[index].options3}</li>
                <li ref={Option4} className="option" onClick={(e) => checkAns(e, 4)}>{data[index].options4}</li>
            </div>
            <button className="submit" onClick={next}>Next</button>
            <div className="index">Question {index + 1} of {data.length}</div>
            
          </div>
         </>
         }
         {result?<>
         <h2> You Scored {score} out of {data.length}</h2>
        <button onClick={reset} className="submit">Reset</button>
         </>:<> </>
         }
        
    </div>
  )
}

export default Quiz