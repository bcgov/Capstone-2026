import { useState } from "react";
import { Footer, Header, Button } from "@bcgov/design-system-react-components";
import FormDetailsEditor from "../components/FormDetailsEditor";
import QuestionList from "../components/QuestionList";
import type { FeedbackFormData } from "../../feedback/types/feedback";
import { QuestionType } from "../../feedback/types/feedback";
import { useNavigate, useLocation } from "react-router-dom";
import { useFeedback } from "../../feedback/FeedbackProvider";
import { useAuth } from "../../auth/AuthContext";
import SubmissionConfirmationModal from "../../feedback/SubmissionConfirmation";
import FormPreview from "../components/FormPreview";

const EMPTY_FORM: FeedbackFormData = {
    id: 0,
    name: "",
    description: "",
    questions: [],
};


const styles = {
    layout: {
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        alignItems: "start",
        gap: "2rem",
        padding: "2rem",
        boxSizing: "border-box" as const,
        fontFamily: "BC Sans",
    },
    editorColumn: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "1.5rem",
        paddingRight: "1rem",
    },
    card: {
        background: "white",
        padding: "1.5rem",
        borderRadius: "8px",
        border: "1px solid #ddd",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    previewColumn: {
        position: "sticky" as const,
        top: "1.5rem",
        alignSelf: "start",
    },
    actions: {
        display: "flex",
        gap: "0.75rem",
        alignItems: "center",
        justifyContent: "flex-start",
    },
};

function FormBuilderPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { apiBaseUrl } = useFeedback();
    const { logout, isAuthenticated, userId } = useAuth();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationTitle, setConfirmationTitle] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [confirmationVarient, setConfirmationVarient] = useState("");

    const editForm = location.state?.editForm as FeedbackFormData | undefined;
    const [form, setForm] = useState<FeedbackFormData>(
        editForm
            ? { ...editForm, id: 0 }
            : EMPTY_FORM
    );
    const oldFormId = editForm?.id ?? null;

    const handleLogout = () => {
        logout();
        navigate("/");
    }

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
                    options: [],
                },
            ],
        }));
    };

    const handleSave = async () => {
        if (!userId) {
            setConfirmationVarient("error");
            setConfirmationTitle("Not Logged In");
            setConfirmationMessage("You must be logged in to save a form.");
            setShowConfirmation(true);
            return;
        }

        if (!form.name.trim() || !form.description.trim()) {
            setConfirmationVarient("error");
            setConfirmationTitle("Missing Fields");
            setConfirmationMessage("Please provide both a form name and description before saving.");
            setShowConfirmation(true);
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/api/form`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, id: 0, ownerId: Number(userId) }),
            });

            if (response.ok) {
                const savedForm = await response.json();

                if (oldFormId) {
                    await fetch(`${apiBaseUrl}/api/form/${oldFormId}/deactivate`, {
                        method: "PATCH",
                    });
                }
                setConfirmationVarient("confirmation");
                setConfirmationTitle("Form Saved");
                setConfirmationMessage(
                    `Your form "${savedForm.name}" was saved successfully.\n(ID: ${savedForm.id})`
                );
                setForm(EMPTY_FORM);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                setConfirmationVarient("error");
                setConfirmationTitle("Save Failed");
                setConfirmationMessage(await response.text());
            }
            setShowConfirmation(true);
        } catch (error) {
            console.error("Error saving form:", error);
        }
    };

    return (
        <>
            <div style={{ margin: 0 }}>
                <Header title={oldFormId ? "Capstone 2026 - Edit Form" : "Capstone 2026 - Form Builder"}>
                    <Button variant="primary" onPress={() => navigate("/")}>
                        Test App
                    </Button>
                    <Button variant="primary" onPress={() => navigate("/dashboard/forms")}>
                        View Forms
                    </Button>
                    <Button variant="primary" onPress={() => navigate("/dashboard/metabase/1")}>
                        View Dashboards
                    </Button>
                    {isAuthenticated ? (
                        <Button variant="secondary" onPress={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button variant="primary" onPress={() => navigate("/login")}>
                            Login
                        </Button>
                    )}
                </Header>

                <div style={styles.layout}>
                    <div style={styles.editorColumn}>
                        <div style={styles.card}>
                            <FormDetailsEditor form={form} setForm={setForm} />
                        </div>
                        <div style={styles.card}>
                            <QuestionList form={form} setForm={setForm} />
                        </div>
                        <div style={styles.actions}>
                            <Button onPress={addQuestion} style={{ width: "auto" }}>
                                + Add Question
                            </Button>
                            <Button variant="secondary" onPress={handleSave} style={{ width: "auto" }}>
                                {oldFormId ? "Save New Version" : "Save Form"}
                            </Button>
                        </div>
                    </div>

                    <div style={styles.previewColumn}>
                        <h2>Preview Form</h2>
                        <div style={styles.card}>
                            <FormPreview formData={form} />
                        </div>
                    </div>
                </div>

                <Footer />
            </div>

            <SubmissionConfirmationModal
                isOpen={showConfirmation}
                title={confirmationTitle}
                message={confirmationMessage}
                onClose={() => {
                    setShowConfirmation(false);
                    if (confirmationTitle === "Form Saved") navigate("/dashboard/forms");
                }}
                variant={confirmationVarient}
            />
        </>
    );
}

export default FormBuilderPage;