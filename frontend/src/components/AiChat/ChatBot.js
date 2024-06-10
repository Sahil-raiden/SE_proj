import React, { useState } from 'react';
import './ChatBot.css';

const ChatBot = () => {
    const [error, setError] = useState("");
    const [value, setValue] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const surpriseOptions = [
        'Who won the IPL 2024?',
        'How to make a pizza?',
        'What is the capital of India?',
        'What is the latest news?',
        'How to tie a tie?',
        'What is the weather today?',
        'Tell me a joke.',
        'What is the population of the world?',
        'How to learn JavaScript?',
        'What are the benefits of meditation?',
        'What is the tallest building in the world?',
        'How to improve communication skills?',
        'Who is the President of the United States?',
        'What are the top 10 movies of all time?'
    ];

    const surprise = () => {
        const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
        setValue(randomValue);
    };

    const getResponse = async () => {
        if (!value) {
            setError("Error! Please ask a question!");
            return;
        }
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    history: chatHistory,
                    message: value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const response = await fetch('http://localhost:4000/gemini', options);
            const data = await response.text();
            
            // Remove asterisks from the response
            const cleanedData = data.replace(/\*/g, '');
            console.log(cleanedData);
            
            setChatHistory((oldChatHistory) => [
                ...oldChatHistory,
                {
                  role: "user",
                  parts: [{ text: value }],
                }, {
                  role: "model",
                  parts: [{ text: cleanedData }],
                },
              ]);
              
            setValue("");
        } catch (error) {
            console.error(error);
            setError("Something went wrong");
        }
    };

    const clear = () => {
        setError("");
        setValue("");
        setChatHistory([]);
    };

    return (
        <div className='app'>
            <div className='search-section'>
                <h1>Chat Bot</h1>
                <button onClick={surprise}>Surprise Me</button>
            </div>
            <div className='input-container'>
                <input value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='Who won the elections....?'>
                </input>
                <br></br>
                {!error && <button onClick={getResponse}>Ask Me</button>}
                {error && <button onClick={clear}>Clear</button>}
            </div>
            {error && <p>{error}</p>}
            <div className='search-result'>
                {chatHistory.map((chatItem, index) => (
                    <div key={index} className={`chat-message ${chatItem.role}`}>
                        <p>{chatItem.parts[0].text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatBot;
