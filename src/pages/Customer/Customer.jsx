import React, { useEffect, useState } from 'react'
import axioscf from '../../axios.cf';
import Loading from '../../components/Loadding';

const Customer = () => {
   const [data, setData] = useState()
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      axioscf.get('/auth/all')
         .then((response) => {
            setData(response.data)
            console.log(response.data)
         })
         .catch((error) => {
            console.error(error)
         })
         .finally(() => {
            setLoading(false)
         })
   }, [])
   if (loading) {
      return <Loading />
   }
   else {

      return (
         <div>
            <div className="d-flex flex-row justify-content-between">
               <h1 className="text-primary text-muted" style={{ fontSize: 24 }}>Customer</h1>
               {/* <button className="btn btn-primary btn-xs rounded" >Add Course</button> */}
            </div>
            <div className="container mt-5 d-flex">
               <div className="row">
                  <table className="table table-striped">
                     <thead>
                        <tr>
                           <th scope="col">ID</th>
                           <th scope="col">First</th>
                           <th scope="col">Last</th>
                           <th scope="col">Email</th>
                           <th scope="col">Avatar</th>
                           <th scope="col">Money</th>
                           <th scope="col">Role</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data.map((item, index) => 
                           <tr key={index}>
                              <th scope="row">{index+1}</th>
                              <td>{item.firstName}</td>
                              <td>{item.lastName}</td>
                              <td>{item.email}</td>
                              <td><img src={item.avatarUrl} style={{width:'30px', height:'30px'}}  alt={item.email} /></td>
                              <td>{item.money}</td>
                              <td>{item.roles}</td>
                           </tr>
                        )}
                     </tbody>
                  </table>

               </div>
            </div>
         </div>
      )
   }
}

export default Customer