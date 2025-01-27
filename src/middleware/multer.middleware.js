import multer from "multer";
const storage = multer.memoryStorage();
const filefilter = (req,file,cb)=>{
    const allowedTypes = ["image/jpeg","image.png"];
    if(!allowedTypes.includes(file.mimeType)){
        return cb(new Error("Invalid file type"),false);
    }
    cd(null,true);
};
const upload = multer({
    storage,
    filefilter,
}).fields([
    {name:"avatar",maxCount:1},
]);
export default upload;