

interface HappinessSliderProps {
    value: number;
    onChange: (value: number) => void;
}

function HappinessSlider(
    {
        value,
        onChange
    }: HappinessSliderProps
) {

    return (
        <div>
            <label>How happy does the colour make you?</label>

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