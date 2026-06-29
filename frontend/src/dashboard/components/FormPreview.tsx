import { useState } from "react";
import FormRenderer from "../../feedback/FormRenderer";
import type { FeedbackFormData } from "../../feedback/types/feedback";

const styles = {
    container: {
        maxWidth: "500px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column" as const,
        gap: "1rem",
    },
    heading: {
        font: "700 1.25rem/2.125rem 'BC Sans'",
    },
};

function FormPreview({ formData }: { formData: FeedbackFormData }) {
    const [answers, setAnswers] = useState<Record<number, any>>({});

    return (
        <div style={styles.container}>
            <span style={styles.heading}>Tell us about your experience!</span>

            <FormRenderer
                formData={formData}
                answers={answers}
                setAnswers={setAnswers}
            />
        </div>
    );
}

export default FormPreview;