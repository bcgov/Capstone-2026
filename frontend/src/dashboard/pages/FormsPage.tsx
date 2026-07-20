import { useEffect, useState } from "react";
import { Footer, Header, Button, Modal, Dialog } from "@bcgov/design-system-react-components";
import "@bcgov/bc-sans/css/BC_Sans.css";
import { useFeedback } from "../../feedback/FeedbackProvider";
import { useNavigate } from "react-router-dom";
import FormPreview from "../components/FormPreview";
import type { FeedbackFormData } from "../../feedback/types/feedback";
import { useAuth } from "../../auth/AuthContext";
import { MetabaseDashboard } from "./MetabaseDashboard";

export interface FormSummary {
    id: number;
    name: string;
    description: string;
    is_active?: boolean;
    version?: number;
}

interface FormsPageProps {
  forms: FormSummary[];
  setForms: React.Dispatch<React.SetStateAction<FormSummary[]>>;
}

const styles = {
    page: {
        padding: "2rem",
        fontFamily: "BC Sans",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    grid: {
        display: "grid",
        gap: "1rem",
    },
    formCard: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: "#fff",
    },
    formCardInactive: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        opacity: 0.6,
    },
    formCardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.5rem",
    },
    formCardHeading: {
        margin: 0,
    },
    badges: {
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
    },
    idBadge: {
        backgroundColor: "#f3f3f3",
        padding: "0.25rem 0.5rem",
        borderRadius: "4px",
        fontSize: "0.875rem",
    },
    inactiveBadge: {
        backgroundColor: "#e0e0e0",
        color: "#888",
        padding: "0.25rem 0.5rem",
        borderRadius: "4px",
        fontSize: "0.875rem",
    },
    formCardActions: {
        display: "flex",
        gap: "0.5rem",
        marginTop: "1rem",
    },
    previewModal: {
        padding: "1.5rem",
        fontFamily: "BC Sans",
        maxHeight: "80vh",
        overflowY: "auto" as const,
        overflowX: "hidden" as const,
    },
};

export const FormsPage: React.FC<FormsPageProps> = ({ forms, setForms }) => {
    const navigate = useNavigate();
    const { apiBaseUrl } = useFeedback();
    const { logout, isAuthenticated, userId } = useAuth();
//const [forms, setForms] = useState<FormSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedForm, setSelectedForm] = useState<FeedbackFormData | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    useEffect(() => {
        if (!userId) return;

        fetch(`${apiBaseUrl}/api/form/owner/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setForms(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load forms", err);
                setLoading(false);
            });
    }, [userId]);

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

    const handleEdit = async (id: number) => {
        try {
            const response = await fetch(`${apiBaseUrl}/api/form/${id}`);
            const data = await response.json();
            navigate("/dashboard/formBuilder", { state: { editForm: data } });
        } catch (error) {
            console.error("Failed to load form for editing", error);
        }
    };

    const deleteForm = async (id: number) => {
        if (!window.confirm("Deleting this form will irreversibly delete all submissions and collected user data with it. Are you sure you want to conitue?")) return;

        try {
            const response = await fetch(`${apiBaseUrl}/api/form/${id}`, { method: "DELETE" });
            if (response.ok) {
                setForms((prev) => prev.filter((form) => form.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const activeForms = forms.filter((f) => f.is_active);
    const inactiveForms = forms.filter((f) => !f.is_active);
    const sortedForms = [...activeForms, ...inactiveForms];

    return (
        <div style={{ margin: 0 }}>
            <Header title="Capstone 2026 - All Forms">
                <Button variant="primary" onPress={() => navigate("/")}>
                    Test App
                </Button>
                <Button variant="primary" onPress={() => navigate("/dashboard/formBuilder")}>
                    Form Builder
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

            <div style={styles.page}>
                {loading && <p>Loading forms...</p>}
                {!loading && forms.length === 0 && <p>No forms found.</p>}

                <div style={styles.grid}>
                    {sortedForms.map((form) => (
                        <div
                            key={form.id}
                            style={form.is_active ? styles.formCard : styles.formCardInactive}
                        >
                            <div style={styles.formCardHeader}>
                                <h3 style={styles.formCardHeading}>{form.name}</h3>
                                <div style={styles.badges}>
                                    {!form.is_active && (
                                        <span style={styles.inactiveBadge}>Inactive</span>
                                    )}
                                    <span style={styles.idBadge}>ID: {form.id}</span>
                                </div>
                            </div>

                            <p>{form.description}</p>

                            <div style={styles.formCardActions}>
                                <Button variant="secondary" onPress={() => handleView(form.id)}>
                                    View
                                </Button>
                                <Button variant="primary" onPress={() => navigate(`/dashboard/metabase/${form.id}`)}>
                                    View Dashboard
                                </Button>
                                {form.is_active && (
                                    <Button variant="secondary" onPress={() => handleEdit(form.id)}>
                                        Edit
                                    </Button>
                                )}
                                <Button variant="secondary" onPress={() => deleteForm(form.id)}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal isOpen={isPreviewOpen} onOpenChange={setIsPreviewOpen} isDismissable>
                <Dialog isCloseable aria-label="Form Preview">
                    <div style={styles.previewModal}>
                        {selectedForm && <FormPreview formData={selectedForm} />}
                    </div>
                </Dialog>
            </Modal>

            <Footer />
        </div>
    );
}

export default FormsPage;