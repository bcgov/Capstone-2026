import {
    Button,
    Dialog,
    Modal
} from "@bcgov/design-system-react-components";

import React, {useState} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


interface HappinessSliderProps {
    isOpen: boolean;
    onSelect: (rating: number) => void;
}

function HappinessSlider({
    isOpen,
    onSelect
}: HappinessSliderProps) {

    if (!isOpen) return null;

    const [value, setValue]= useState(3);

    const emojis = [
        "😡",
        "🙁" ,
        "😐",
        "🙂",
        "😁"
    ];

    const currentEmoji = emojis[value-1];

    const handleSliderChange = (newValue: number) => {
        setValue(newValue);
        console.log(newValue);
    }

    const EmojiHandle = (props:any) => {
        const {value, dragging, index, ...restProps } = props;
    
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
                            <Slider value={value} onChange={handleSliderChange}/>
                        
                        </div>
                    </div>
                </Dialog>
            </Modal>
        );
    }
}

export default HappinessSlider;