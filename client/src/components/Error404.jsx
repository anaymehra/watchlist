import { Link } from "react-router-dom";

function Error() {
    return ( 
        <div>
           Error 404, Page does not exist.
            <Link to="/"/>
        </div>
     );
}

export default Error;