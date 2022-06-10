const cloudinary = require("cloudinary");
cloudinary.config({
   cloud_name: 'vku-study-app',
   api_key: '617866323265373',
   api_secret:'Rqia-Gu0GKlx1SvGBzL14rK8ogU',
   secure: true,
});
export default cloudinary;