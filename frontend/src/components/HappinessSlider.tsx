import {
    Button,
    Dialog,
    Modal
} from "@bcgov/design-system-react-components";

import React, { useState } from 'react';
import Slider from '@mui/material/Slider';


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

    const emojis = [
        "😡",
        "🙁",
        "😐",
        "🙂",
        "😁"
    ];

    const handleSliderChange = (newValue: number) => {
        setValue(newValue);
        console.log(newValue);
    }

    const EmojiHandle = (props: any) => {
        const handleValue = props.value;

        return (
            <div
                {...props}
                style={{
                    width: "40px",
                    height: "40px",
                    fontSize: "2rem",
                    background: "transparent",
                    border: "none",
                    cursor: "grab",
                    textAlign: "center",
                    lineHeight: "40px",
                    marginTop: "-10px"
                }}
            >
                {emojis[handleValue - 1]}
            </div>
        );
    };


    return (
        <Modal isOpen={isOpen}>
            <Dialog aria-label="Happiness rating">
                <div style={{ padding: "1rem" }}>
                    <h2>How was your experience?</h2>

                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "center"
                        }}
                    >
                        {emoji[value - 1]}
                    </div>
                    <Slider
                        min={1}
                        max={5}
                        step={1}
                        value={value}

                        onChange={(newValue) =>
                            handleSliderChange(newValue as number)
                        }
                        onChangeComplete={(newValue) =>
                            onSelect(newValue as number)
                        }
                        handleRender={(node, props) => (
                            <EmojiHandle {...props} />
                        )}
                    />

                    <div>
                        style=={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "1rem",
                            fontSize: "2rem"
                        }}

                        {emojis.map((emoji) => (
                            <span key={emoji}>{emoji}</span>
                        ))}

                    </div>
                </div>
            </Dialog>
        </Modal>
    );
}


export default HappinessSlider;