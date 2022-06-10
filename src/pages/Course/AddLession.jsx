import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axioscf from '../../axios.cf';
import Select from 'react-select';
import Swal from 'sweetalert2';
import Loading from '../../components/Loadding';
import axios from 'axios';
const options = []
const AddLession = () => {
   const navigate = useNavigate()
   const [loading, setLoading] = useState(true);
   const [selectedOption, setSelectedOption] = useState(null);
   const [description, setDescription] = useState();
   const [numerical, setNumerical] = useState();
   const [url, setUrl] = useState();
   const [video, setVideo] = useState();
   const [uploading, setUploading] = useState(false);
   useEffect(() => {
      axioscf.get('/course')
         .then((response) => {
            response.data.map((item) => { options.push({ value: item.id, label: item.title }) })
         })
         .catch((error) => console.log(error))
         .finally(() => setLoading(false))
   }, [])
   const uploadvideo = () => {
      const formData = new FormData()
      formData.append('file', video)
      formData.append('upload_preset', 'kbjkmb01')
      setUploading(true)
      axios.post('https://api.cloudinary.com/v1_1/vku-study-app/video/upload', formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         }
      })
         .then((response) => {
            axioscf.post('/course/lession', { lesson: selectedOption.value, description: description, lessonUrl: response.data.url, numerical: numerical })
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
         .finally(() => { setUploading(false) })
   }
   if (loading) {
      return <Loading />
   }
   else {

      return (
         <div>
            <div className="d-flex flex-row justify-content-between">
               <h1 className="text-primary text-muted" style={{ fontSize: 24 }}>Add Lession</h1>
               <button className="btn btn-primary btn-xs rounded" onClick={() => { navigate('/courses') }}> Course</button>
            </div>
            <div className="container mt-5 d-flex">
               <div className="row d-flex align-center justify-content-center">
                  <div className="col-md-6">
                     <Select
                        placeholder="Course"
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                     />
                     <div className="mb-3">
                        <label for="Numerical" className="form-label">Numerical</label>
                        <input type="text" value={numerical} onChange={(e) => { setNumerical(e.target.value) }} className="form-control rounded" id="Numerical" />
                     </div>
                     <div className="mb-3">
                        <label for="des" className="form-label">DesCription</label>
                        <input type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} className="form-control rounded" id="des" />
                     </div>
                     <div className="mb-3">
                        <label for="video" className="form-label">Video</label>
                        <input type="file" accept="video/mp4,video/x-m4v,video/*" onChange={(e) => { setVideo(e.target.files[0]) }} className="form-control rounded h-100" id="video" />
                     </div>
                     <button type="button" onClick={uploadvideo} className="btn btn-primary">
                        {uploading && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        Submit
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default AddLession