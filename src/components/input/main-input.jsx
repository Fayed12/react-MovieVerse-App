import "./input.css"

function InputLayout() {
    return (
      <div className="input-layout">
        <input
          type="text"
          placeholder="username"
          min={10}
          max={40}
          value={"mohamed"}
          onChange={(e) => e.target.value}
        />
      </div>
    );
}

export default InputLayout;