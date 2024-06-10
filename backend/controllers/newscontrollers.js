const News = require('../models/newsmodel')
const mongoose = require('mongoose')


const getNews = async (req, res) => {
    const newss = await News.find({}).sort({ createdAT: -1 })

    res.status(200).json(newss)
}

const getNew = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "no such news" })
    }
    const newss = await News.findById(id)

    if (!newss) {
        return res.status(400).json({ error: "no such news" })
    }

    res.status(200).json(newss)
}

const createNews = async (req, res) => {
    const { title, content, date } = req.body

    let emptyFields=[]
    if(!title){
        emptyFields.push("Title")
    }
    if(!content){
        emptyFields.push("Content")
    }
    if(!date){
        emptyFields.push("Date")
    }
        if (emptyFields.length >0){
            return res.status(400).json({error :"Please fill in all the fields",emptyFields})
        }
    
    try {
        const news = await News.create({ title, content, date })
        res.status(200).json(news)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deletenews = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "no such news" })
    }
    const newss = await News.findOneAndDelete({ _id: id })
    if (!newss) {
        return res.status(400).json({ error: error.message })
    }
    res.status(200).json(newss)
}

const updateNews = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "no such news" })
    }
    const newss = await News.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!newss) {
        return res.status(400).json({ error: error.message })
    }
    res.status(200).json(newss)

}

module.exports = {
    createNews,
    getNews,
    getNew,
    deletenews,
    updateNews
}