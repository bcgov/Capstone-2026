import { Button, TextField } from "@bcgov/design-system-react-components";
import type { Option, Question } from "../../feedback/types/feedback";

interface Props {
    question: Question;
    setForm: React.Dispatch<React.SetStateAction<any>>;
}

function OptionEditor({ question, setForm }: Props) {
    const options = question.options || [];

    const updateOption = (id: number, value: string) => {
        setForm((prev: any) => ({
            ...prev,
            questions: prev.questions.map((q: Question) =>
                q.id === question.id
                    ? {
                        ...q,
                        options: q.options?.map((o: Option) =>
                            o.id === id
                                ? { ...o, optionText: value, optionValue: value }
                                : o
                        )
                    }
                    : q
            )
        }));
    };

    const addOption = () => {
        setForm((prev: any) => ({
            ...prev,
            questions: prev.questions.map((q: Question) =>
                q.id === question.id
                    ? {
                        ...q,
                        options: [
                            ...(q.options || []),
                            {
                                id: Date.now(),
                                optionText: "",
                                optionValue: "",
                                displayOrder: (q.options?.length || 0) + 1
                            }
                        ]
                    }
                    : q
            )
        }));
    };

    const deleteOption = (id: number) => {
        setForm((prev: any) => ({
            ...prev,
            questions: prev.questions.map((q: Question) =>
                q.id === question.id
                    ? {
                        ...q,
                        options: q.options?.filter((o) => o.id !== id)
                    }
                    : q
            )
        }));
    };

    return (
        <div style={{ marginTop: "1rem", fontFamily: "BC Sans" }}>
            <h4 style={{ fontFamily: "BC Sans" }}>Options</h4>

            {options.map((option) => (
                <div
                    key={option.id}
                    style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}
                >
                    <TextField
                        value={option.optionText}
                        label="Option"
                        onChange={(value) => updateOption(option.id, value)}
                    />

                    <Button variant="secondary" onPress={() => deleteOption(option.id)}>
                        Delete
                    </Button>
                </div>
            ))}

            <Button onPress={addOption}>Add Option</Button>
        </div>
    );
}

export default OptionEditor;