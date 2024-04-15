import React from "react";

interface Props {
    setInput: React.Dispatch<React.SetStateAction<string>>
}

const InputBox: React.FC<Props> = ({setInput}) => {
    const message = 'Lorem ipsum some bullshit popsums'

    return (
        <div className="input-box">
            <textarea
                placeholder="Message"
                value={message}
                onChange={e => setInput(e.target.value)}
            />
        </div>
    );
};

export default InputBox;