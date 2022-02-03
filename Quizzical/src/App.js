import React from "react"
import Questions from "./components/Questions"
import {nanoid} from "nanoid"


export default function App() {

    const [startQuiz, setStartQuiz] = React.useState(false)
    const [checkAnwser, setcheckAnwser] = React.useState(false)
    const [playState, setplayState] = React.useState(false)
    const [quiz, setQuiz] = React.useState([])

    const shuffleArray = arr => arr
            .map(a => [Math.random(), a])
            .sort((a, b) => a[0] - b[0])
            .map(a => a[1]);

    React.useEffect(function() {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setQuiz(data.results.map(quiz => ({
                ...quiz,
                id: nanoid(),
                choice: shuffleArray(quiz.incorrect_answers.concat(quiz.correct_answer))
            }))))
    }, [playState])


    const quizElements = quiz.map(item => {
        return <Questions 
        question={item.question}
        correctanswer={item.correct_answer}
        choice={item.choice}
        key={nanoid()}
        id={item.id}
        selectAnswer={selectAnswer}
        selectedAnswer={item.selectedAnswer}
        checkAnwser={checkAnwser}
        />
    })

    function selectAnswer(anwser, id) {
        setQuiz(prevState => prevState.map(quiz => {
            return quiz.id === id
                    ? {...quiz, selectedAnswer: anwser}
                    : quiz
        }))
    }

    const finalScore = quiz.filter(q => q.selectedAnswer === q.correct_answer).length
    
    function toggleStart() {
        setStartQuiz(prevState => !prevState)
    }

    function toggleCheck() {
        setcheckAnwser(prevState => !prevState)
    }

    function toggleRestart() {
        setStartQuiz(prevState => !prevState)
        setcheckAnwser(prevState => !prevState)
        setplayState(prevState => !prevState)
    }

    return (
        <div className="container">
            <div className="quiz">
            { !startQuiz &&
                <div className="quiz--start">
                    <h1 className="quiz--title">Quizzical</h1>
                    <p className="quiz--desc">Some desctiption if needed</p>
                    <button onClick={toggleStart} className="quiz--btn">Start quiz</button>
                </div>
            }
            { startQuiz &&
                <div className="quiz--start">
                    {quizElements}
                    { checkAnwser 
                        ? <div className="quiz--footer">
                            <h2 className="quiz--score">Your scored {finalScore}/{quiz.length} correct answers</h2>
                            <button onClick={toggleRestart} className="quiz--btn--again">Play Again</button>
                            </div>
                        : <button onClick={toggleCheck} className="quiz--btn">Check Answers</button>
                         
                    }
                </div>
            }
            </div>
        </div>
    )
}