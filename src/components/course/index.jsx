import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({ id, url, name, del }) => {
   const navigate = useNavigate()
   return(
   <div className="card" >
      <img className="card-img-top img-fluid" src={url} width="50" alt={name} />
      <div className="card-body">
         <h5 className="card-title">{name}</h5>
         <button type="submit" onClick={() => { navigate('/courses/' + id) }} className="btn btn-danger btn-sm mx-1"><FontAwesomeIcon icon="fa-solid fa-eye" /></button>
         <button type="submit" onClick={() => { navigate('/courses/edit/' + id) }} className="btn btn-danger btn-sm mx-1"><FontAwesomeIcon icon="fa-solid fa-pen" /></button>
         <button type="submit" onClick={()=>{del(id)}} className="btn btn-danger btn-sm mx-1"><FontAwesomeIcon icon="fa-solid fa-trash" /></button>

      </div>
   </div >
   )
}