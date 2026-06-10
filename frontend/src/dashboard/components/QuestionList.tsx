import type { FeedbackFormData } from "../../feedback/types/feedback";
import QuestionEditor from "./QuestionEditor";

interface Props {
    form: FeedbackFormData;
    setForm: React.Dispatch<React.SetStateAction<FeedbackFormData>>;
}

function QuestionList({
    form,
    setForm
}: Props) {
    return (
        <div>
            <h2 style={{ fontFamily: "BC Sans" }}>Questions</h2>

            {form.questions.map((question) => (
                <QuestionEditor
                    key={question.id}
                    question={question}
                    setForm={setForm}
                />
            ))}
        </div>
    );
}

export default QuestionList;