import React from 'react';

function Question({ index, question, onChange }) {
  return (
    <div className="question-block">
      <h4>{question.text}</h4>
      {question.options.map((option, i) => (
        <div key={i}>
          <input
            type="radio"
            name={`q${index + 1}`}
            value={String.fromCharCode(97 + i)} // 'a', 'b', 'c'
            onChange={(e) => onChange(index, e.target.value)}
          />
          <label>{option}</label>
        </div>
      ))}
    </div>
  );
}

export default Question;
