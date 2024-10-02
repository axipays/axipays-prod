import React, { useState } from 'react';
import '../../styles/coming-soon.css';

const ComingSoonFaq = () => {
    // Initialize with the first question's id
    const [selectedQuestion, setSelectedQuestion] = useState(1);

    const faqs = [
        { id: 1, question: 'When will axipays officially launch its services?', answer: 'We’re putting the final touches on Axipays and will unveil our launch date soon. Stay tuned!' },
        { id: 2, question: 'What can we expect from Axipays payment solutions?', answer: "Axipays is an intelligent payment solution designed to provide comprehensive, all-in-one services for every market. "},
        { id: 3, question: 'What market will axipays cover with its payment technology?', answer: "Axipays is set to transform the payment industry by serving a wide range of  industries, from traditional sectors to innovative fields that push the limits of what's possible. " },
        { id: 4, question: 'What Axipays has in store for you?', answer: "Axipays is about to unleash innovation, transforming the way you transact forever! Expect a perfect flow of card processing, crypto, APM’s with features like robust security and reliability." },
        { id: 5, question: 'Which exciting features will Axipays launch?', answer: "Axipays is poised to revolutionize the payment landscape with its amazing features! Imagine a universal gateway that unlocks endless possibilities. Unlock transaction excellence with payment pulse’s real-time insights, and transform customer experience with personalization. But that’s not it - More secrets are waiting to be revealed." },
       
    ];

    const handleQuestionChange = (e) => {
        const selectedId = parseInt(e.target.value);
        setSelectedQuestion(selectedId);  // Update the selected question
    };

    return (
        <div className='comingsoonfaq'>
            <select
                value={selectedQuestion}
                onChange={handleQuestionChange}
                className='question'
            >
                {faqs.map((ques) => (
                    <option key={ques.id} value={ques.id}>
                        {ques.question}
                    </option>
                ))}
            </select>
            {/* Display the answer corresponding to the selected question */}
            <div className='answer'>
                {faqs.find((ques) => ques.id === selectedQuestion)?.answer}
            </div>
        </div>
    );
};

export default ComingSoonFaq;
