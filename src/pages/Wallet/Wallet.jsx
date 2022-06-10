import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import axioscf from '../../axios.cf';
import Loading from '../../components/Loadding';

const Wallet = () => {
   const [data, setData] = useState()
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      axioscf.get('/wallet')
         .then((response) => {
            setData(response.data)
         })
         .catch((error) => {
            console.error(error)
         })
         .finally(() => {
            setLoading(false)
         })
   }, [])
   const handleClick = (id) => {
      Swal.fire({
         title: 'Are you sure?',
         text: "You won't be able to revert this!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes!'
      }).then((result) => {
         if (result.isConfirmed) {
            axioscf.get('/wallet/' + id)
               .then(() => {
                  Swal.fire(
                     'Successfully!',
                     'Money has been added.',
                     'success'
                  )
               })
               .catch((err) => {
                  console.log(err)
                  Swal.fire(
                     'Failed!',
                     'Money not accept !',
                     'error'
                  )
               })
         }
      })
   }
   if (loading) {
      return <Loading />
   }
   else {
      return (
         <div>
            <div className="d-flex flex-row justify-content-between">
               <h1 className="text-primary text-muted" style={{ fontSize: 24 }}>Wallets</h1>
               {/* <button className="btn btn-primary btn-xs rounded" >Add Course</button> */}
            </div>
            <div className="container mt-5 d-flex">
               <div className="row">
                  <div className="col-md-12">
                     <div className="card card-outline card-primary">
                        <div className="card-header">
                           <h3 className="card-title">Recharge Pending</h3>
                           <div className="card-tools">
                              <button type="button" className="btn btn-tool" data-card-widget="collapse"><i
                                 className="fas fa-minus"></i>
                              </button>
                           </div>
                        </div>
                        <div className="card-body">
                           <div className="table-responsive">
                              <table className="table table-bordered table-striped table-hover">
                                 <thead>
                                    <tr>
                                       <th>#</th>
                                       <th>UUID</th>
                                       <th>USERNAME</th>
                                       <th>AMOUNT</th>
                                       <th>CREATED AT</th>
                                       <th>STATUS</th>
                                       <th>ACTION</th>
                                    </tr>
                                 </thead>
                                 <tbody>

                                    {data.pending.map((item, index) =>
                                       <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>{item.uuid}</td>
                                          <td>{item.user.email}</td>
                                          <td>{item.amount}</td>
                                          <td>{item.time}</td>
                                          <td>{item.status}</td>
                                          <td><button type="button" onClick={() => handleClick(item.id)}
                                             className="btn btn-primary"><i className="fa fa-check"></i>
                                             <span></span></button></td>

                                       </tr>
                                    )}

                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-12">
                     <div className="card card-outline card-primary">
                        <div className="card-header">
                           <h3 className="card-title">Recharge</h3>
                           <div className="card-tools">
                              <button type="button" className="btn btn-tool" data-card-widget="collapse"><i
                                 className="fas fa-minus"></i>
                              </button>
                           </div>
                        </div>
                        <div className="card-body">
                           <div className="table-responsive">
                              <table id="datatable" className="table table-bordered table-striped table-hover">
                                 <thead>
                                    <tr>
                                       <th>#</th>
                                       <th>UUID</th>
                                       <th>USERNAME</th>
                                       <th>AMOUNT</th>
                                       <th>CREATED AT</th>
                                       <th>STATUS</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {data.recharge.map((item, index) =>
                                       <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>{item.uuid}</td>
                                          <td>{item.user.email}</td>
                                          <td>{item.amount}</td>
                                          <td>{item.time}</td>
                                          <td>{item.status}</td>
                                       </tr>
                                    )}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default Wallet