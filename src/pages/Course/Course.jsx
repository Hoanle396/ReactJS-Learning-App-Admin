
import React, { useEffect, useState } from 'react'
import { ProductCard } from '../../components/course'
import img from '../../assets/images/avt.jpg'
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loadding';
import axioscf from '../../axios.cf';
import Swal from 'sweetalert2';
const Course = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRow] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    loadData()
  }, [])
  const loadData = () => {
    axioscf.get('/course')
      .then((response) => {
        setRow(response.data)
      })
      .catch((error) => {
        alert(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const handleClick=() => {
    navigate('/courses/add')
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
        axioscf.delete('/course/'+id)
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
              'Your Course not deleted. Because have user learn it',
              'error'
            )
          })

      }
    })
  }
  if (loading) {
    return <Loading />;
  }
  else {

    return (
      <div>
        <div className="d-flex flex-row justify-content-between">
          <h1 className="text-primary text-muted" style={{ fontSize: 24 }}>Course</h1>
          <button className="btn btn-primary btn-xs rounded" onClick={handleClick}>Add Course</button>
        </div>
        <div className="container mt-5 d-flex">
          <div className="row">
            {rows.map((item, index) => <div key={index} className="col-md-3 mt-2 rounded">
              <ProductCard id={item.id} url={item.image} name={item.title} del={handleDelete} />
            </div>)}

          </div>
        </div>
      </div>
    )
  }
}

export default Course