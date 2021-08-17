import './ValidationError.css'

const ValidationError = ({error}) => {

    return(<span className="error">{error}</span>);
}

export default ValidationError;