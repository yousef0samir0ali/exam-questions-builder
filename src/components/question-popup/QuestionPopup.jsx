import "./question-popup.css";
export default function QuestionPopup({ questionPopup, setOpenPopup, openPopup }) {
  return (
    <div className={`question-popup-overlay ${openPopup ? "show" : ""} `} onClick={() => setOpenPopup(false)}>
      <div className="question-popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{questionPopup.question}</h2>
        {questionPopup.type === "text" && <input type="text" placeholder="Write your answer here" />}
        {questionPopup.type === "true-false" && (
          <>
            <div>
              <input type="radio" id="true" name="select" />
              <label htmlFor="true">True</label>
            </div>
            <div>
              <input type="radio" id="false" name="select" />
              <label htmlFor="false">False</label>
            </div>
          </>
        )}
        {questionPopup.type === "on-choice" && (
          <div>
            {questionPopup.options.map((option, index) => (
              <div key={index}>
                <input type="radio" id={option} name="select" />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        )}
        <div className="send-container">
          <div className="send">Send</div>
        </div>
        <i className=" close bi bi-x-circle-fill" onClick={() => setOpenPopup(false)}></i>
      </div>
    </div>
  );
}
