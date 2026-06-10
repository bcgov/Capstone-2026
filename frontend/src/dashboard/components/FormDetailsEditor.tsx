import { TextField } from "@bcgov/design-system-react-components";
import type { FeedbackFormData } from "../../feedback/types/feedback";

interface Props {
    form: FeedbackFormData;
    setForm: React.Dispatch<React.SetStateAction<FeedbackFormData>>;
}

function FormDetailsEditor({
    form,
    setForm
}: Props) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                fontFamily: "BC Sans"
            }}
        >

            <h2 style={{ fontFamily: "BC Sans", margin: "10px 0px" }}>Form Details</h2>

            <TextField
                label="Form Name"
                value={form.name}
                onChange={(value) =>
                    setForm((prev) => ({
                        ...prev,
                        name: value
                    }))
                }
            />

            <TextField
                label="Description"
                value={form.description}
                onChange={(value) =>
                    setForm((prev) => ({
                        ...prev,
                        description: value
                    }))
                }
            />
        </div>
    );
}

export default FormDetailsEditor;