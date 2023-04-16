
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import axioscf from '../../axios.cf';
import Loading from '../../components/Loadding';
import { Button, Card, TextField } from '@mui/material';

const Gitf = () => {
   const [data, setData] = useState([])
   const [loading, setLoading] = useState(true);
   const [code, setCode] = useState();
   const [percent, setPercent] = useState()
   const [from, setFrom] = useState();
   const [to, setTo] = useState();
   useEffect(() => {
      loadData()
   },[])
   const loadData = () => {
      axioscf.get('/gift')
         .then(response => {
            setData(response.data)})
         .catch(error => {
            console.log(error)
         })
         .finally(() => {
            setLoading(false)
         })
   }
   const handleSubmit = () => {
      if(!code||!percent||!from||!to){
         alert('data is not valid')
      }
      else{
         axioscf.post('/gift',{giftcode:code,sale:percent,startDate:new Date(from),endDate:new Date(to)})
         .then(() => {
            Swal.fire(
               'Successfully!',
               'Gift has been added.',
               'success'
            )
         })
         .catch((err) => {
            console.log(err)
            Swal.fire(
               'Failed!',
               'GIft not accept !',
               'error'
            )
         })
         .finally(() =>loadData())
      }
   }
   const handleClick = (id) => { 
      Swal.fire({
         title: 'Are you sure?',
         text: "You won't be able to revert this!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!'
       }).then((result) => {
         if (result.isConfirmed) {
           axioscf.delete('/gift/'+id)
             .then(() => {
               Swal.fire(
                 'Deleted!',
                 'Your Gift has been deleted.',
                 'success'
               )
              loadData()
             })
             .catch((err) => {
               console.log(err)
               Swal.fire(
                 'Deleted! failed',
                 'Your GIft not deleted !',
                 'error'
               )
             })
   
         }
       })
   }
   const check = (start, end) => {
      const now= new Date()
      const starttime=new Date(start)
      const endtime= new Date(end)
      if(starttime<now && endtime>now){
         return <span style={{color:'#198754'}}>WORK</span>
      }
      if(starttime>now){
         return <span style={{color:'#fd7e14'}}>PENDING</span>
      }
      else{
         return <span style={{color:'#dc3545'}}>CANCEL</span>
      }
   }
   if (loading) {
      return <Loading />
   }
   else return (
      <div>
         <div className="d-flex flex-row justify-content-between">
            <h1 className="text-primary text-muted" style={{ fontSize: 24 }}>Gitf Voucher</h1>
         </div>
         <div className="container mt-5 d-flex">
            <div className="row d-flex align-center justify-content-center">
               <div className="col-md-6">
                  <Card>
                     <div className="card-header">
                        <h3 className="card-title">Add Voucher</h3>
                     </div>
                     <div className="card-body">
                        <div className="col-md-12">
                           <div className="mb-3 ">
                              <label for="gift" className="form-label">Gift Code</label>
                              <TextField value={code} onChange={(e) => setCode(e.target.value)} placeholder="Gift Code" id="gift" />
                           </div>
                           <div className="mb-3 ">
                              <label for="percent" className="form-label">Percent</label>
                              <TextField value={percent} onChange={(e) => setPercent(e.target.value)} id="percent" />
                           </div>
                           <div className="mb-3 ">
                              <label for="from" className="form-label">From day</label>
                              <TextField type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="form-control rounded h-100" id="from" />
                           </div>
                           <div className="mb-3">
                              <label for="to" className="form-label">To day</label>
                              <TextField type="date" value={to} onChange={(e) => setTo(e.target.value)} className="form-control rounded h-100" id="to" />
                           </div>
                        </div>
                        <Button type="button" variant='contained' onClick={handleSubmit} >Add Now</Button>
                     </div>
                  </Card>
               </div>
            </div>

         </div>
         <div className="row mt-5">
            <div className="col-md-12">
               <div className="card card-outline card-primary">
                  <div className="card-header">
                     <h3 className="card-title">Recharge Pending</h3>
                  </div>
                  <div className="card-body">
                     <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover">
                           <thead>
                              <tr>
                                 <th>#</th>
                                 <th>Gitf code</th>
                                 <th>Percent</th>
                                 <th>Start Time</th>
                                 <th>End Time</th>
                                 <th>Status</th>
                                 <th>Action</th>
                              </tr>
                           </thead>
                           <tbody>

                              {data.map((item, index) =>
                                 <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.giftcode}</td>
                                    <td>{item.sale}</td>
                                    <td>{item.startDate.slice(0, 10)}</td>
                                    <td>{item.endDate.slice(0, 10)}</td>
                                    <td>{check(item.startDate,item.endDate)}</td>
                                    <td><button type="button" onClick={() => handleClick(item.id)}
                                       className="btn btn-danger btn-xs"><i className="fa fa-trash"></i>
                                       <span></span></button></td>

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
   )
}

export default Gitf