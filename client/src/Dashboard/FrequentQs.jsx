import React, { useState } from 'react';

function FrequentQs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [questions, setQuestions] = useState([
    { question: 'What is global warming', link: 'index5.html' },
    { question: 'What is the Weather mostly experienced mostly in the afternoon', link: 'index.html' },
    {question: 'Whwt is dodays temperature' ,link:'index.html'},
    {question: 'is it likely to be rainny in the afternoon' ,link:'index.html'},
    {question: 'tomorrows weather best activities for children' ,link:'index.html'},
    {question: 'when is planting rain likely to set in' ,link:'index.html'},
    {question: 'effects of high temperature in greenhouses' ,link:'index.html'},
    {question: 'how can i prepare rof adversre seasons' ,link:'index.html'}
  ]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = questions.filter((q) =>
      q.question.toLowerCase().includes(term)
    );
    setFilteredQuestions(filtered);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the question to the database
    if (searchTerm.trim()) {
      // Assuming sendQuestionToDatabase is a function to send data to the database
      sendQuestionToDatabase(searchTerm);
      const newQuestion = { question: searchTerm, link: '' };
      setQuestions([...questions, newQuestion]);
      setSearchTerm('');
    }
  };

  const sendQuestionToDatabase = (question) => {
    // Perform database operation here, such as an API call
    // Example:
    // fetch('api_endpoint', {
    //   method: 'POST',
    //   body: JSON.stringify({ question }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));
    console.log("Question sent to database:", question);
  };

  return (
    <div style={{ fontSize: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh', backgroundColor: 'lightblue' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Type to search..."
        />
        <button type="submit">Search</button>
      </form>
      {filteredQuestions.length > 0 && (
        <div>
          <h2>Similar Questions</h2>
          <ul>
            {filteredQuestions.map((q, index) => (
              <li key={index}>
                <a href={q.link}>{q.question}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FrequentQs;
