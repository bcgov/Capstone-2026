import { useState } from "react";
import FormRenderer from "../../feedback/FormRenderer";
import type { FeedbackFormData } from "../../feedback/types/feedback";

function FormPreview({ formData }: { formData: FeedbackFormData; }) {
    const [answers, setAnswers] = useState<Record<number, any>>({});

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
            }}
        >
            <h3 style={{ fontFamily: "BC Sans" }}>
                {formData.name || "Untitled Form"}
            </h3>

            <p style={{ fontFamily: "BC Sans" }}>
                {formData.description}
            </p>

            <FormRenderer
                formData={formData}
                answers={answers}
                setAnswers={setAnswers}
            />
        </div>
    );
}

export default FormPreview;