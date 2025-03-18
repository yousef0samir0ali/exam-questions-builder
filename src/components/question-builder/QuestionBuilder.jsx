import { useEffect, useState } from "react";
import "./question-builder.css";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function QuestionForm({ addQuestion, editQuestion, questions }) {
  const { index } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [type, setType] = useState("text");

  useEffect(() => {
    if (index !== undefined && questions[index]) {
      const q = questions[index];
      setQuestion(q.question);
      setType(q.type);
      setCorrectAnswer(q.correctAnswer);
      setOptions(q.options > 0 ? [q.option] : [""]);
    }
  }, [index, questions]);

  const handleOptionChange = (i, value) => {
    const newOptions = [...options];
    newOptions[i] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = { question: question, options: options, correctAnswer: correctAnswer, type: type };
    if (index !== undefined) {
      editQuestion(index, newQuestion);
    } else {
      addQuestion(newQuestion);
    }
    navigate("/");
  };

  return (
    <div className="question">
      <header className="header">
        <h2 className="title"> {index !== undefined ? "Edit Question" : "Add New Question"} </h2>
        <Link className="link" to="/">
          Questions Page <i className="bi bi-arrow-right"></i>
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Question Text</label>
        <input
          type="text"
          id="text"
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <label htmlFor="">Question Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="text">Text Answer</option>
          <option value="true-false">True / False</option>
          <option value="on-choice">One Choice</option>
        </select>
        {type === "on-choice" && (
          <div className="options">
            <label htmlFor="">Options:</label>
            {options.map((opt, i) => (
              <input
                key={i}
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(i, e.target.value)}
                placeholder={`Enter Option ${i + 1}`}
                required
              />
            ))}
            <button type="button" onClick={handleAddOption}>
              Add Other Option
            </button>
          </div>
        )}
        <label htmlFor="">The Right Answer:</label>
        {type === "text" ? (
          <input type="text" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} />
        ) : type === "true-false" ? (
          <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        ) : (
          <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}>
            {options.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}

        <div className="submit">
          <button type="submit">{index !== undefined ? "Save Changes" : "Add Question"}</button>
        </div>
      </form>
    </div>
  );
}
