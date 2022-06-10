
import { Link } from 'react-router-dom';
import './404.scss'
const NotFound = () => (
   <>
      <div className="number">404</div>
      <div className="text"><span>Ooops...</span> <br /> page not found</div>
      <Link className="me" to="/" target="_blank">Go Home Page</Link>
   </>
);

export default NotFound;
