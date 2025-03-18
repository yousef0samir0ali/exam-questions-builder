import { Link } from "react-router-dom";
import "./question-listing.css";
import QuestionPopup from "../question-popup/QuestionPopup";
import { useState } from "react";

export default function QuestionListing({ questions, deleteQuestion }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [questionPopup, setQuestionPopup] = useState();

  const handlePopup = (question) => {
    setQuestionPopup(question);
    setOpenPopup(true);
  };

  return (
    <div className="questions-listing-container">
      <header className="header">
        <h2 className="title">Questions Listing</h2>
        <Link className="link" to="/question-builder">
          Add New Question
        </Link>
      </header>
      <div className="questions-list">
        {questions.map((question, index) => (
          <div key={index} className="question-item">
            <div className="question-text">{question.question}</div>
            <div className="question-icon">
              <Link to={`/question-edit/${index}`}>
                <i className="bi bi-pen-fill"></i>
              </Link>
              <i onClick={() => deleteQuestion(index)} className="bi bi-archive-fill"></i>
              <i onClick={() => handlePopup(question)} className="bi bi-eye-fill"></i>
            </div>
          </div>
        ))}
      </div>
      {openPopup && <QuestionPopup questionPopup={questionPopup} setOpenPopup={setOpenPopup} openPopup={openPopup} />}
    </div>
  );
}
