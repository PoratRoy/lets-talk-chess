import Row from "../Row/Row";
import { Link } from "react-router-dom";
import Error from "../../../app-components/Errors/TypesOfErrors/ValidationError/ValidationError";
import "./Form.css";

const Form = ({ handelSubmit, title, error, children, btn, link, linkTxt }) => {
  return (
    <form onSubmit={handelSubmit}>
      <div className="form">
        <Row justify="center">
          <h1 className={`form-title ${title}`}>{title}</h1>

          {error && <Error error={error} />}

          {children}

          <button
            className={`form-btn ${btn}`}
            type="submit"
          >
            {btn}
          </button>

          <Link className={`link ${btn}`} to={link}>
            {linkTxt}
          </Link>
        </Row>
      </div>
    </form>
  );
};

export default Form;
