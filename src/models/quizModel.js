import mongoose from 'mongoose'

const quizSchema = mongoose.Schema({
    question: {
        type: String
    },
    options: [{
        type: String
    }],
    answer: {
        type: String
    }

})

const Quiz = mongoose.models.quiz || mongoose.model('quiz', quizSchema)

export default Quiz

