import { useState } from "react";
import FormRenderer from "../../feedback/FormRenderer";
import type { FeedbackFormData } from "../../feedback/types/feedback";

function FormPreview({ formData }: { formData: FeedbackFormData; }) {
    const [answers, setAnswers] = useState<Record<number, any>>({});

    return (
        <div
            style={{
                maxWidth: "500px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
            }}
        >
            <span style={{ font: "700 1.25rem/2.125rem 'BC Sans'" }}>
                {"Tell us about your experience!"}
            </span>

            <FormRenderer
                formData={formData}
                answers={answers}
                setAnswers={setAnswers}
            />
        </div>
    );
}

export default FormPreview;