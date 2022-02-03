export default function Questions(props) {
    const answer_choice = props.choice.map((item) => (
        <span 
            onClick={() => {
                !props.checkAnwser && props.selectAnswer(item, props.id)
            }} 
            className={`answer--btn 
            ${
                props.selectedAnswer === item ? "answer--selected" : ""
            }
            ${
                props.checkAnwser && props.correctanswer === props.selectedAnswer && props.selectedAnswer === item ? "answer--correct" : ""
            }
            ${
                props.checkAnwser && props.correctanswer !== item ? "answer--other" : ""
            }
            ${
                props.checkAnwser && props.correctanswer !== props.selectedAnswer && props.selectedAnswer === item ? "answer--incorrect" : ""
            }
            ${
                props.checkAnwser && props.correctanswer === item ? "answer--correct" : ""
            }
            `}>
                {item}
        </span>
        ))
 
    return (
        <>
        <div className="quiz--box">
            <h2 className="quiz--question">{props.question}</h2>
            <div className="quiz--choice">
                {answer_choice}
            </div>
            
        </div>
        </>
    )
}