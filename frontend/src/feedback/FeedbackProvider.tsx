import { createContext, useContext, useState, type ReactNode } from "react";
import FeedbackForm from "./FeedbackForm";
import FeedbackPrompt from "./FeedbackPrompt";
import type { FeedbackFormData } from "./types/feedback";

type FeedbackContextType = {
    apiBaseUrl: string;
    openFeedbackForm: (formId: number) => void;
    closeFeedback: () => void;
};

const FeedbackContext = createContext<FeedbackContextType | null>(null);

export function useFeedback() {
    const ctx = useContext(FeedbackContext);
    if (!ctx) throw new Error("useFeedback must be used within FeedbackProvider");
    return ctx;
}

interface Props {
    children: ReactNode;
    apiBaseUrl: string;
}

export function FeedbackProvider({ children, apiBaseUrl }: Props) {
    const [formData, setFormData] = useState<FeedbackFormData | null>(null);
    const [isPromptOpen, setIsPromptOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openFeedbackForm = async (formId: number) => {
        try {
            const res = await fetch(`${apiBaseUrl}/api/form/${formId}`);
            const data = await res.json();
            setFormData(data);
            setIsPromptOpen(true);
        } catch (err) {
            console.error("Failed to load feedback form:", err);
        }
    };

    const closeFeedback = () => {
        setIsPromptOpen(false);
        setIsFormOpen(false);
        setFormData(null);
    };

    return (
        <FeedbackContext.Provider value={{ apiBaseUrl, openFeedbackForm, closeFeedback }}>
            {children}

            {formData && (
                <>
                    <FeedbackPrompt
                        isOpen={isPromptOpen}
                        setIsOpen={setIsPromptOpen}
                        onAccept={() => setIsFormOpen(true)}
                    />

                    <FeedbackForm
                        isFormOpen={isFormOpen}
                        setIsFormOpen={setIsFormOpen}
                        formData={formData}
                        apiBaseUrl={apiBaseUrl}
                        onSuccess={(id) => console.log("Submission:", id)}
                    />
                </>
            )}
        </FeedbackContext.Provider>
    );
}