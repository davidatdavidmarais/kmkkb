interface Key {
    label: string;
    value: string;
}
const KeyComponent = ({label, value}: Key) => {
    return (
        <div className="stories-wrapper">
            <b>{value}</b> ----&gt; {label}
        </div>
    );
};

export default KeyComponent;