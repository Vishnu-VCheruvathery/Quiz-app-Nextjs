import Quiz from "@/models/quizModel";
import { NextResponse, NextRequest } from "next/server";


export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {id, answer} = reqBody

        const question = await Quiz.findById(id)

        if(!question){
            return NextResponse.json({error: 'No Question found'})
        }
        
        if(answer !== question.answer){
            return NextResponse.json({message: 'Wrong answer'})
        }

        return NextResponse.json({message: 'Correct answer', answer: question.answer})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}