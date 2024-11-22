export const NumberInput = ({ state, setState, title }) => {
  return (
    <>
      <span className="title">{title}</span>
      <input
        type="number"
        value={state}
        onChange={(e) => setState(e?.target?.value)}
      />
    </>
  );
};
