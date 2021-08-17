import NotAuthorized from '../TypesOfErrors/NotAuthorized/NotAuthorized';
import PageNotFound from '../TypesOfErrors/PageNotFound/PageNotFound';
import ServerError from '../TypesOfErrors/ServerError/ServerError';
import DefaultError from '../TypesOfErrors/DefaultError/DefaultError';

const ErrorPage = ({error}) => {
    
    const statusCode =  error.response.status;
    if(statusCode === 401 || statusCode === 403){
        return (<NotAuthorized statusCode={statusCode}/>)
    }
    else if(statusCode < 500){
        if(statusCode === 404){
            return (<PageNotFound/>)
        }
        else{
            return(<DefaultError statusCode={statusCode} msg={error.response.statusText}/>)
        }
    }
    else{
        return (<ServerError statusCode={statusCode}/>)
    }
}

export default ErrorPage;

