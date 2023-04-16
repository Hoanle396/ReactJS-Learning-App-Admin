import { Box, Button, FormControl, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axioscf from '../../axios.cf';
import Loading from '../../components/Loadding';

const AddLession = () => {
   let params = useParams();
   const navigate = useNavigate()
   const id = params.id
   const [loading, setLoading] = useState(true);
   const [selectedOption, setSelectedOption] = useState(null);
   const [description, setDescription] = useState();
   const [numerical, setNumerical] = useState();
   const [video, setVideo] = useState();
   const [options, setOption] = useState([])
   const [uploading, setUploading] = useState(false);
   useEffect(() => {
      setOption([])
      axioscf.get('/course')
         .then((response) => {
            response.data.map((item) => setOption(pre => [...pre, { value: item.id, label: item.title }]))
            setSelectedOption(response.data.find(x => x.id == id).id)
         })
         .catch((error) => navigate('/course'))
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
               <div className="row d-flex justify-content-center">
                  <div className="col-md-6 position-relative">
                     <Box className="mb-4">
                        <FormControl fullWidth>
                           <TextField
                              select
                              disabled
                              label="Course"
                              defaultValue={selectedOption}
                              onChange={setSelectedOption}
                              MenuProps={{
                                 style: {
                                    minWidth: '25vw',
                                    maxWidth: '25%',
                                 },
                              }}
                           >
                              {options.map((option, i) => (<MenuItem key={i} value={option.value}>{option.label}</MenuItem>))}
                           </TextField>
                        </FormControl>
                     </Box>
                     <div className="mb-4">
                        <TextField type="text" label="Numerical" value={numerical} onChange={(e) => { setNumerical(e.target.value) }} className="form-control rounded" id="Numerical" />
                     </div>
                     <div className="mb-4">
                        <TextField type="text" label="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} className="form-control rounded" id="des" />
                     </div>
                     <div className="mb-4">
                        <TextField type="file" label="Video" accept="video/mp4,video/x-m4v,video/*" onChange={(e) => { setVideo(e.target.files[0]) }} className="form-control rounded h-100" id="video" />
                     </div>
                     <Button type="button" onClick={uploadvideo} variant='contained' >
                        {uploading && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        Submit
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default AddLession