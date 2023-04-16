import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axioscf from '../../axios.cf';
import Lession from '../../components/Lession';
import Loading from '../../components/Loadding';

const CourseDetail = () => {
   const [data, setData] = useState()
   let params = useParams();
   const navigate = useNavigate()
   const id = params.id
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      loadData()
   }, [])
   const loadData = () => {
      axioscf.get('/course/' + id)
         .then((response) => {
            setData(response.data)
         })
         .catch((error) => {
            alert(error.message)
         })
         .finally(() => {
            setLoading(false)
         })
   }
   const handleDelete = (id) => {
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
            axioscf.delete('/course/detail/' + id)
               .then(() => {
                  Swal.fire(
                     'Deleted!',
                     'Your Course has been deleted.',
                     'success'
                  )
                  loadData()
               })
               .catch((err) => {
                  console.log(err)
                  Swal.fire(
                     'Deleted! failed',
                     'Your Course not deleted.',
                     'error'
                  )
               })
         }
      })
   }
   const addLession = () => {
      navigate('/course/lession/new/' + id)
   }
   if (loading) {
      return <Loading />
   }
   else {
      return (
         <div>
            <div className="d-flex flex-row justify-content-between">
               <h1 className="text-primary text-muted" style={{ fontSize: 24 }}>{data.title}</h1>
               <button className="btn btn-primary btn-xs rounded" onClick={addLession}>Add Lession</button>
            </div>
            <div className="container mt-5 d-flex justify-content-center align-center">
               <div className="row">
                  <div className="col-md-5">
                     <div className="card " >
                        <img className="card-img-top img-fluid mx-100" src={data.image} width="50" alt={data.title} />
                        <div className="card-body">
                           <h5 className="card-title">{data.title}</h5>

                        </div>
                     </div >
                  </div>
                  <div className="col-md-7 mt-5">
                     {data.detail.map((item, index) =>
                        <Lession key={index} inde={index + 1} title={item.description} id={item.id} handleDelete={handleDelete} />
                     )}
                  </div>
               </div>
            </div>
         </div>
      )
   }

}

export default CourseDetail