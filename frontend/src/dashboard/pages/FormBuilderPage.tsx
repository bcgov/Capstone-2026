import { useState } from "react";
import { Footer, Header, Button } from "@bcgov/design-system-react-components";
import FormDetailsEditor from "../components/FormDetailsEditor";
import QuestionList from "../components/QuestionList";
import type { FeedbackFormData } from "../../feedback/types/feedback";
import { QuestionType } from "../../feedback/types/feedback";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "../../feedback/FeedbackProvider";

function FormBuilderPage() {
    const navigate = useNavigate();
    const { apiBaseUrl } = useFeedback();

    const [form, setForm] = useState<FeedbackFormData>({
        id: 0,
        name: "",
        description: "",
        questions: []
    });

    const addQuestion = () => {
        setForm((prev) => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    id: Date.now(),
                    question_text: "",
                    questionType: QuestionType.TEXTAREA,
                    is_required: false,
                    display_order: prev.questions.length + 1,
                    options: []
                }
            ]
        }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/api/form`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                const savedForm = await response.json();
                console.log("Form saved successfully:", savedForm);
                setForm(savedForm);
            } else {
                console.error("Failed to save form:", await response.text());
            }
        } catch (error) {
            console.error("Error saving form:", error);
        }
    };
    return (
        <>
            <div style={{ margin: 0 }}>
                <Header title={"Capstone 2026 - Form Builder"}>
                    <Button
                        variant="primary"
                        onPress={() => navigate("/")}
                    >
                        Test App
                    </Button>
                </Header>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.2fr 1fr",
                        gap: "1.5rem",
                        padding: "1.5rem",
                        boxSizing: "border-box",
                        background: "#f9f9f9",
                        fontFamily: "BC Sans"
                    }}
                >
                    {/* LEFT PANEL - BUILDER */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            paddingRight: "1rem"
                        }}
                    >

                        {/* FORM SETTINGS */}
                        <div
                            style={{
                                background: "white",
                                padding: "1rem",
                                borderRadius: "8px",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                            }}
                        >
                            <FormDetailsEditor form={form} setForm={setForm} />
                        </div>

                        {/* QUESTIONS */}
                        <div
                            style={{
                                background: "white",
                                padding: "1rem",
                                borderRadius: "8px",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                            }}
                        >
                            <QuestionList form={form} setForm={setForm} />
                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: "0.75rem",
                                alignItems: "center",
                                justifyContent: "flex-start"
                            }}
                        >
                            <Button
                                onPress={addQuestion}
                                style={{ width: "auto" }}
                            >
                                + Add Question
                            </Button>

                            <Button
                                variant="secondary"
                                onPress={handleSave}
                                style={{ width: "auto" }}
                            >
                                Save Form
                            </Button>
                        </div>
                    </div>

                    {/* RIGHT PANEL - JSON PREVIEW */}
                    <div
                        style={{
                            background: "white",
                            borderRadius: "8px",
                            padding: "1rem",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                        }}
                    >
                        <h2 style={{ fontFamily: "BC Sans" }}>Preview JSON</h2>

                        <pre
                            style={{
                                background: "#f4f4f4",
                                padding: "1rem",
                                overflow: "auto"
                            }}
                        >
                            {JSON.stringify(form, null, 2)}
                        </pre>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>

            </div>
        </>
    );
}

export default FormBuilderPage;