"use client"
import { useState } from "react"



export default function CreateQuestion() {
       const [question , setQuestion] = useState('')
       const [answer, setAnswer] = useState('')
       const [options, setOptions] = useState<string[]>([]);

       const handleOptionChange = (index:number, value:string) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value || '';
        setOptions(updatedOptions);
    };

    const postQuestion = async () => {
        try {
          const result = await fetch('/api/quiz', {
            method: 'POST',
            body: JSON.stringify({ question, answer, options }),
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await result.json();
          console.log(data);
          setQuestion('')
          setAnswer('')
          setOptions([]);
          document.querySelectorAll('input').forEach(input => input.value = '');
        } catch (error) {
          console.log(error);
        }
      };


     return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-2">
            <h1 className="text-3xl">Creat a Question!</h1>
            <div className="flex flex-col gap-2">
                <label className="text-center">Question:</label>
                <input 
                className="text-black"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                />
                <label className="text-center">Answer:</label>
                <input 
                className="text-black"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                />
            </div>
              <label className="text-center">Add Options:</label>
            <div className="w-3/6 grid grid-cols-2 grid-rows-2 justify-items-center p-2 gap-2">
            <input 
                    className="text-black"
                    value={options[0]}
                    onChange={(e) => handleOptionChange(0, e.target.value)}
                />
                <input 
                    className="text-black"
                    value={options[1]}
                    onChange={(e) => handleOptionChange(1, e.target.value)}
                />
                <input 
                    className="text-black"
                    value={options[2]}
                    onChange={(e) => handleOptionChange(2, e.target.value)}
                />
                <input 
                    className="text-black"
                    value={options[3]}
                    onChange={(e) => handleOptionChange(3, e.target.value)}
                />
            </div>

            <button onClick={postQuestion}>Submit</button>
        </div>
     )    
}