export const RangeInput = ({
  label,
  subLabel,
  min,
  max,
  onChange,
  state,
  labelMinValue,
  labelMaxValue,
}) => {
  return (
    <>
      <span className="title">{label}</span>
      <span className="title" style={{ textDecoration: "underline" }}>
        {subLabel}
      </span>
      <div>
        <input
          type="range"
          min={min}
          max={max}
          onChange={onChange}
          className="slider"
          value={state}
        />
        <div className="labels">
          <label>{labelMinValue || 0}</label>
          <b>{state || 0}</b>
          <label>{labelMaxValue || 0}</label>
        </div>
      </div>
    </>
  );
};
