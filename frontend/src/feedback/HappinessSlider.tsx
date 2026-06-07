

interface HappinessSliderProps {
    question: string;
    value: number;
    onChange: (value: number) => void;
}

function HappinessSlider(
    {
        question,
        value,
        onChange
    }: HappinessSliderProps
) {

    return (
        <div>
            <label>{question}</label>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem"
                }}
            >
                <span>😡</span>

                <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={value}
                    onChange={(e) =>
                        onChange(Number(e.target.value))
                    }
                />

                <span>😁</span>
            </div>
        </div>
    );
}

export default HappinessSlider;