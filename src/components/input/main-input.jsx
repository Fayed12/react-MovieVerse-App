function InputLayout({id="", type, placeholder, userValue, setValue, min = 5, max=60 }) {
  return (
    <div className="input-layout">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        value={userValue}
        onChange={setValue}
      />
    </div>
  );
}

export default InputLayout;