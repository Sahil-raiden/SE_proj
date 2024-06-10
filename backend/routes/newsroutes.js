const express = require('express')
const router = express.Router()
const {
    createNews,
    getNews,
    getNew,
    deletenews,
    updateNews
} =require('../controllers/newscontrollers')

router.get('/',getNews)

router.get('/:id',getNew)

router.post('/',createNews)
router.delete('/:id',deletenews)
router.patch('/:id',updateNews)

module.exports=router