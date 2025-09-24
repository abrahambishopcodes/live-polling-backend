const multer = require('multer');
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../", "uploads"))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.random() * 1E9}`
    const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })
module.exports = upload;