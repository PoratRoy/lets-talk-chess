import './Row.css';

const Row = ({justify, children}) => {
    return(
        <div className="row" justify={justify}>
            {children}
        </div>
    );
}

export default Row;