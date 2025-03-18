import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) { 
    // console.log(file);    
    cb(null,`${Date.now()}-${file.originalname}`)
  },
});

//file validation
const fileFilter = (req,file,cb) => {
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/jpg' || file.mimetype==='image/png' || file.mimetype==='video/mp4'){
        cb(null,true)
    }
    else{
        cb({message:"Unsupported file format"},false)
    }
}


export const upload = multer({
  storage,
  fileFilter
});
