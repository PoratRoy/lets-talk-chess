import './Line.css';

const Line = ({justify, children}) => {
    return(
        <div className="line" justify={justify}>
            {children}
        </div>
    );
}

export default Line;