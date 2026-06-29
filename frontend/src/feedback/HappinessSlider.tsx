interface HappinessSliderProps {
    question: string;
    value: number;
    onChange: (value: number) => void;
}

const styles = {
    label: {
        font: "var(--typography-regular-small-body)",
        color: "var(--typography-color-primary)",
    },
    row: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    },
    emoji: {
        display: "flex",
        justifyContent: "center",
    },
    caption: {
        font: "var(--typography-regular-small-body)",
        color: "var(--typography-color-primary)",
        margin: 0,
    },
};

function HappinessSlider({ question, value, onChange }: HappinessSliderProps) {
    return (
        <div>
            <label style={styles.label}>{question}</label>

            <div style={styles.row}>
                <div>
                    <span style={styles.emoji}>😡</span>
                    <p style={styles.caption}>Not Satisfied</p>
                </div>

                <input
                    type="range"
                    min={1}
                    max={5}
                    step={0.1}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                />

                <div>
                    <span style={styles.emoji}>😁</span>
                    <p style={styles.caption}>Very Satisfied</p>
                </div>
            </div>
        </div>
    );
}

export default HappinessSlider;