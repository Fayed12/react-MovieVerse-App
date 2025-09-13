function InputLayout({ type, placeholder, userValue, setValue, min = 10, max=50 }) {
  return (
    <div className="input-layout">
      <input
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