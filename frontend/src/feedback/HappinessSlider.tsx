const smallBodyStyle = {
  font: "var(--typography-regular-small-body)",
  color: "var(--typography-color-primary)"
};

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
            <label  style={smallBodyStyle}>{question}</label>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem"
                }}
            >
                <div>
                    <span style={{display: "flex", justifyContent: "center"}}>😡</span>
                    <p style={{...smallBodyStyle, margin: 0}}>Not Satisfied</p>
                </div>

                <input
                    type="range"
                    min={1}
                    max={5}
                    step={0.1}
                    value={value}
                    onChange={(e) =>
                        onChange(Number(e.target.value))
                    }
                />
                <div>
                    <span style={{ display: "flex", justifyContent: "center" }}>😁</span>
                    <p style={{...smallBodyStyle, margin: 0}}>Very Satisfied</p>
                </div>
            </div>
        </div>
    );
}

export default HappinessSlider;