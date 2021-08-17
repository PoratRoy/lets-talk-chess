import "./Btn.css";

const Btn = ({style,handleSubmit, children}) => {
  return (
    <button
      className={`btn ${style}`}
      type="submit"
      onSubmit={handleSubmit}
    >
      {children}
    </button>
  );
};

export default Btn;
