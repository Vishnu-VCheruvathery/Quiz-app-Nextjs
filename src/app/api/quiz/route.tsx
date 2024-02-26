import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Quiz from '@/models/quizModel'

connect()

export async function GET() {
    try {
        const quizzes = await Quiz.find({})
        
        return NextResponse.json(quizzes)
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        console.log(reqBody)
        const {question, options, answer} = reqBody


        const newQuestion = new Quiz({
            question: question,
            options: options,
            answer: answer
        })


        newQuestion.save()

        return NextResponse.json({message: 'Question added!'})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

