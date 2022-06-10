
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Lession = ({ title, id, inde, handleDelete }) => {
   return (
      <div className="card " >
         <div className="card-body">
            <div className="row">
               <div className="col-md-2">
                  <h5 className="card-title">{inde}</h5>
               </div>
               <div className="col-md-8">
                  <h5 className="card-title">{title}</h5>
               </div>
               <div className="col-md-2">
                  <button type="submit" onClick={() => { handleDelete(id) }} className="btn btn-danger btn-sm mx-1"><FontAwesomeIcon icon="fa-solid fa-trash" /></button>
               </div>
            </div>
         </div>
      </div >
   )
}

export default Lession