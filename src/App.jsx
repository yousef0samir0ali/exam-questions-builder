import "./App.css";
import QuestionListing from "./components/question-listing/QuestionListing";
import QuestionBuilder from "./components/question-builder/QuestionBuilder";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [questions, setQuestions] = useState([
    // Static Data For Testing
    {
      question: "React uses the Virtual DOM to improve performance.",
      options: [],
      correctAnswer: "",
      type: "true-false",
    },
    {
      question: "What is the main purpose of React?",
      options: [],
      correctAnswer: "",
      type: "text",
    },
    {
      question: "How do you correctly update state when using useState?",
      options: ["state = newValue;", "this.state.value = newValue;", "setState(newValue);", "useState(newValue);"],
      correctAnswer: "",
      type: "on-choice",
    },
  ]);

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const editQuestion = (index, updatedQuestion) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };

  return (
    <Routes>
      <Route path="/" element={<QuestionListing questions={questions} deleteQuestion={deleteQuestion} />} />
      <Route
        path="/question-builder"
        element={<QuestionBuilder addQuestion={addQuestion} editQuestion={editQuestion} questions={questions} />}
      />
      <Route
        path="/question-edit/:index"
        element={<QuestionBuilder addQuestion={addQuestion} editQuestion={editQuestion} questions={questions} />}
      />
    </Routes>
  );
}

export default App;
