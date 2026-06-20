import { useEffect, useState } from "react";
import { Footer, Header, Button, Modal, Dialog } from "@bcgov/design-system-react-components";
import "@bcgov/bc-sans/css/BC_Sans.css";
import { useFeedback } from "../../feedback/FeedbackProvider";
import { useNavigate } from "react-router-dom";
import FormPreview from "../components/FormPreview";
import type { FeedbackFormData } from "../../feedback/types/feedback";


interface FormSummary {
    id: number;
    name: string;
    description: string;
    is_active?: boolean;
    version?: number;
}

function FormsPage() {
    const navigate = useNavigate();
    const [forms, setForms] = useState<FormSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const { apiBaseUrl } = useFeedback();
    const [selectedForm, setSelectedForm] = useState<FeedbackFormData | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handleView = async (id: number) => {
        try {
            const response = await fetch(`${apiBaseUrl}/api/form/${id}`);
            const data = await response.json();
            setSelectedForm(data);
            setIsPreviewOpen(true);
        } catch (error) {
            console.error("Failed to load form", error);
        }
    };

    useEffect(() => {
        fetch(`${apiBaseUrl}/api/form`)
            .then((res) => res.json())
            .then((data) => {
                setForms(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load forms", err);
                setLoading(false);
            });
    }, []);

    const deleteForm = async (id: number) => {
        if (!window.confirm("Delete this form?")) { return; }

        try {
            const response = await fetch(`${apiBaseUrl}/api/form/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (response.ok) {
                setForms((prev) =>
                    prev.filter((form) => form.id !== id)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div style={{ margin: 0 }}>
                <Header title={"Capstone 2026 - All Forms"}>
                    <Button
                        variant="primary"
                        onPress={() => navigate("/")}
                    >
                        Test App
                    </Button>
                    <Button
                        variant="primary"
                        onPress={() => navigate("/dashboard/formBuilder")}
                    >
                        Form Builder
                    </Button>
                </Header>
                <div
                    style={{
                        padding: "2rem",
                        fontFamily: "BC Sans",
                        maxWidth: "1200px",
                        margin: "0 auto"
                    }}
                >
                    {loading && <p>Loading forms...</p>}

                    {!loading && forms.length === 0 && (
                        <p>No forms found.</p>
                    )}

                    <div
                        style={{
                            display: "grid",
                            gap: "1rem"
                        }}
                    >
                        {forms.map((form) => (
                            <div
                                key={form.id}
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    padding: "1rem",
                                    backgroundColor: "#fff"
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "0.5rem"
                                    }}
                                >
                                    <h3 style={{ margin: 0 }}>
                                        {form.name}
                                    </h3>

                                    <span
                                        style={{
                                            backgroundColor: "#f3f3f3",
                                            padding: "0.25rem 0.5rem",
                                            borderRadius: "4px",
                                            fontSize: "0.875rem"
                                        }}
                                    >
                                        ID: {form.id}
                                    </span>
                                </div>

                                <p>{form.description}</p>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "0.5rem",
                                        marginTop: "1rem"
                                    }}
                                >
                                    <Button
                                        variant="secondary"
                                        onPress={() =>
                                            handleView(form.id)
                                        }
                                    >
                                        View
                                    </Button>

                                    <Button
                                        variant="secondary"
                                        onPress={() =>
                                            deleteForm(form.id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Modal
                    isOpen={isPreviewOpen}
                    onOpenChange={setIsPreviewOpen}
                    isDismissable
                >
                    <Dialog
                        isCloseable
                        aria-label="Form Preview"
                    >
                        <div
                            style={{
                                padding: "1.5rem",
                                fontFamily: "BC Sans",
                                maxHeight: "80vh",
                                overflowY: "auto",
                                overflowX: "hidden"
                            }}
                        >
                            {selectedForm && (
                                <FormPreview formData={selectedForm} />
                            )}
                        </div>
                    </Dialog>
                </Modal>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default FormsPage;