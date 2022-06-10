import React from 'react'

const Loading = () => {
   return (
      <div className="d-flex justify-content-center">
         <div className="spinner-border spinner-border-lg text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
         </div>
      </div>
   )
}

export default Loading