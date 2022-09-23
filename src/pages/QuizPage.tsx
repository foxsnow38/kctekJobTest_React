import { Navigate } from "react-router-dom"
import { useState } from "react"

import Button from "@mui/material/Button"
import { toast } from "react-toastify"
import { useIndexDb } from "../data/Indexed/IndexedContext"
import Quiz from "../components/Quiz"
import Timer from "../utils/timer"

function QuizPage({ data, topic }: any) {
  const { user, setUser, setUserOnDb } = useIndexDb()
  const [answers, setAnswers] = useState({})
  const [isFinished, setIsFinished] = useState(false)
  const noteCalc = () => {
    const questionPointCalc = 100 / data.length
    let point = 0

    Object.entries(answers).forEach((item) => {
      if (item[1]) point += Math.ceil(questionPointCalc)
    })

    const newUser = user
    newUser.lessons[topic] = point
    setUser({ ...user, newUser })
    setIsFinished(true)

    toast.info(`YOU GET ${point} ON ${topic.toUpperCase()}`, {
      position: "top-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    setUserOnDb(newUser)
    localStorage.setItem(`user`, JSON.stringify(user))

    return <Navigate to="/main" />
  }

  return (
    <div style={{ position: `relative` }}>
      {!user && <Navigate to="/" />}
      <div>
        <div
          style={{
            width: `70px`,
            height: `40px`,
            border: `1px solid #ddd`,
            borderRadius: `5px`,
            position: `fixed`,
            top: 10,
            right: `49%`,
            alignItems: `center`,
            background: `#fff`,
          }}
        >
          <div
            style={{
              display: `flex`,
              justifyContent: "center",
              alignContent: "center",
              alignItems: `center`,
              height: `100%`,
            }}
          >
            {Timer(1000 * 60 * 10)}
          </div>
        </div>
      </div>
      <div>{!user && <Navigate to="/" />}</div>
      <div>{isFinished && <Navigate to="/main" />}</div>
      <div
        className="questions"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "baseline",
          flexWrap: `wrap`,
          border: `5px solid #DDD`,
          borderRadius: `5px`,
          margin: `10px`,
        }}
      >
        {data.map((item: any, index: any) => (
          <div
            key={index}
            style={{ width: `40%`, marginTop: `10px`, margin: `30px` }}
          >
            <Quiz
              quizQuestion={item}
              index={index}
              topic="Math"
              setAnwers={setAnswers}
            />
          </div>
        ))}
      </div>
      <div style={{ width: `100%` }}>
        <Button
          onClick={noteCalc}
          style={{ width: `100%` }}
          variant="contained"
        >
          SINAVI BITIR
        </Button>
      </div>
    </div>
  )
}

export default QuizPage

// Inspired from this projects
// https://github.com/nemanjamil/exam-project-react
// https://github.com/tilak-codes/RTO-Quiz-app
