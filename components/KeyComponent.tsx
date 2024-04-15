interface Key {
    label: string;
    value: string;
}
const KeyComponent = ({label, value}: Key) => {
    const testClick = (value: string) => {
        console.log(value)
    }
    return (
        <div className="key-wrapper">
            <button onClick={() => testClick(value)}><b>{value}</b> ----&gt; {label}</button>
        </div>
    );
};

export default KeyComponent;