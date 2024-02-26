"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";



export default function QuizPage() {
    const [questions, setQuestions] = useState<{ question: string, options: string[], _id: string }[]>([]);
    const [index, setIndex] = useState(0);
    const [answer, setAnswer] = useState('')
    const [isCorrect, setIsCorrect] = useState(false)
    const [isWrong, setIsWrong] = useState(false)
    const [score, setScore] = useState(0)
    const [optionSelected, setOptionSelected] = useState(false);
    const getQuestions = async () => {
        try {
            const result = await axios.get('/api/quiz');
            setQuestions(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    const sendAnswer = async (answer: string, id: string) => {
        try {
           const result =  await axios.post('api/answer', {id, answer})
           console.log(result.data)
           if(result.data.message === 'Correct answer'){
               setAnswer(result.data.answer)
               setIsCorrect(true)
               setScore(prevCount => prevCount +100)
               toast.success(result.data.message)
           }else{
            setIsWrong(true)
            setIsCorrect(false)
            setScore(prevCount => prevCount  - 100)
            toast.error(result.data.message)
           }
           setOptionSelected(true);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getQuestions();
    }, []);

    const currentQuestion = questions[index] || null;

    const handleNext = () => {
        if (index < questions.length - 1) {
            setIndex(index + 1);
            setIsCorrect(false)
            setIsWrong(false)
            setOptionSelected(false);
        }
    };

    const handlePrevious = () => {
        if (index > 0) {
            setIndex(index - 1);
            setIsCorrect(false)
            setIsWrong(false)
            setOptionSelected(false);
        }
    };

    return (
        <>
          <div className="fixed right-4 top-4">
          <h1 className={`text-3xl ${index + 1 === questions.length ? 'hidden' : 'block'}`}>Score: {score}</h1>
          </div>
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className={`text-3xl ${index + 1 === questions.length ? 'hidden' : 'block'}`}>Quiz</h1>
            {index+1 === questions.length ? (
                <div className="flex flex-col items-center gap-3">
                 <h1 className="text-3xl">Your Score:</h1>
                 <h1 className="text-3xl">{score}</h1>
                </div>
            ) : (
                currentQuestion && (
                    <>
                        <div key={currentQuestion._id} className="w-3/6">
                            <h1 className="text-xl text-center p-2">Q{index + 1}: {currentQuestion.question}</h1>
                        </div>
                        <div className="w-3/6 grid grid-cols-2 grid-rows-2 justify-items-center p-2 gap-2">
                            {currentQuestion.options.map((option, optionIndex) => (
                                                                 <div
                                                                 key={optionIndex}
                                                                 onClick={() => sendAnswer(option, currentQuestion._id)}
                                                                 className={`w-5/6 border border-white border-solid text-center p-2 rounded 
                                                                     ${optionSelected ? 'pointer-events-none opacity-50' : 'pointer-events-auto'} // Disable pointer events and reduce opacity
                                                                     hover:bg-white hover:text-black hover:cursor-pointer
                                                                     ${isCorrect && option === answer ? 'bg-green-500' : 'bg-black'}
                                                                     ${isWrong && option !== answer ? 'bg-red-500' : 'bg-black'}
                                                                 `}
                                                             >
                                                                 <h1>{option}</h1>
                                                             </div>
                         
                            ))}
                        </div>
                    </>
                )
            )}

           

            <div className="flex items-center gap-2 mt-2">
                <button className={`border border-solid border-white p-2 rounded ${index + 1 === questions.length ? 'hidden' : 'block'}`} onClick={handlePrevious}>Previous</button>
                 <h1 className={`${index + 1 === questions.length ? 'hidden' : 'block'}`}>{index+1}/{questions.length - 1}</h1>
                <button className={`border border-solid border-white p-2 rounded ${index + 1 === questions.length ? 'hidden' : 'block'}`} onClick={handleNext}>Next</button>
            </div>
            <div className={`${index + 1 !== questions.length ? 'hidden' : 'block'}`}>
                <button onClick={() => {setIndex(0), setScore(0)}}>
                <i className="fa-solid fa-rotate-right text-white mt-8 text-3xl"></i>
                </button>
            </div>
        </div>
        </>
        
    );
}