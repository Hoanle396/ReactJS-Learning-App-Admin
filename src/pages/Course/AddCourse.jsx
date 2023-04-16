import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axioscf from '../../axios.cf';
import { Button, TextField } from '@mui/material';
const AddCourse = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [background, setBackground] = useState('#FFFFFF');
  const [discount, setDiscount] = useState();
  const [image, setImage] = useState();
  const [upload, setUpload] = useState();

  const navigate = useNavigate()
  const handleSubmit = () => {
    console.log(upload)
    axioscf.post('/course', { title: title, description: description, discount: Number(discount), background: background, files: upload }, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then(res => {
        console.log(res)
        Swal.fire(
          'Added!',
          'Your Course has been Add.',
          'success'
        )
      })
      .catch(err => {
        console.log(err)
        Swal.fire(
          'Addd!',
          'Your Course not has added.',
          'error'
        )
      })
      .finally(() => {

      })
  }
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setUpload(img)
      setImage(URL.createObjectURL(img))
    }
  }
  const handleClick = () => {
    navigate('/courses')
  }
  return (
    <div>
      <div className="d-flex flex-row justify-content-between">
        <h1 className="text-primary text-muted" style={{ fontSize: 24 }}>Add Course</h1>
        <button className="btn btn-primary btn-xs rounded" onClick={handleClick}>Course</button>
      </div>
      <div className="container mt-5 d-flex justify-content-center">
        <div className="row d-flex align-center justify-content-center">
          <form className="col-md-6">
            <div className="mb-3">
              <label for="Title" className="form-label">Tiltle</label>
              <TextField type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} className="form-control rounded" id="Title" />
            </div>
            <div className="mb-3">
              <label for="des" className="form-label">DesCription</label>
              <TextField type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} className="form-control rounded" id="des" />
            </div>
            <div className="mb-3">
              <label for="dis" className="form-label">Discount</label>
              <TextField type="text" value={discount} onChange={(e) => { setDiscount(e.target.value) }} className="form-control rounded" id="dis" />
            </div>
            <div className="mb-3">
              <label for="color" className="form-label">Background Color</label>
              <TextField type="color" value={background} onChange={(e) => { setBackground(e.target.value) }} className="form-control rounded" id="color" />
            </div>
            <div className="mb-3">
              <label for="img" className="form-label">Image Icon</label>
              <TextField type="file" onChange={onImageChange} className="form-control rounded" id="img" />
            </div>
            <div className="mb-3">
              {image && <img width="220"
                height="320"
                src={image} alt="..." />}
            </div>
            <Button type="button" onClick={handleSubmit} variant='contained' size='large'>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddCourse