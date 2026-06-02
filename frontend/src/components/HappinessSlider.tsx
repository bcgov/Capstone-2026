import {
    Button,
    Dialog,
    Modal
} from "@bcgov/design-system-react-components";

import { useState } from "react";

interface HappinessSliderProps {
    isOpen: boolean;
    onSelect: (rating: number) => void;
}

function HappinessSlider({
    isOpen,
    onSelect
}: HappinessSliderProps) {

    const [value, setValue] = useState(3);

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen}>
            <Dialog aria-label="Happiness rating">
                <div style={{ padding: "1rem" }}>
                    <h2>How was your experience?</h2>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            marginTop: "1rem"
                        }}
                    >
                        <span style={{ fontSize: "2rem" }}>😡</span>

                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            value={value}
                            onChange={(e) =>
                                setValue(Number(e.target.value))
                            }
                            style={{ flex: 1 }}
                        />

                        <span style={{ fontSize: "2rem" }}>😁</span>
                    </div>

                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "1rem"
                        }}
                    >
                        Rating: {value}
                    </p>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "1rem"
                        }}
                    >
                        <Button
                            onPress={() => onSelect(value)}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Dialog>
        </Modal>
    );
}

export default HappinessSlider;