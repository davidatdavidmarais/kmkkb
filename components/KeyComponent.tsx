interface Props {
    label: string;
    value: string;
    onSelectedItem: (value: string)=> void
}
const KeyComponent = ({label, value, onSelectedItem}: Props) => {
    const testClick = (value: string) => {
        console.log(value)
        onSelectedItem(value)
    }
    return (
        <div className="key-wrapper">
            <button onClick={() => testClick(value)}><b>{value}</b> ----&gt; {label}</button>
        </div>
    );
};

export default KeyComponent;