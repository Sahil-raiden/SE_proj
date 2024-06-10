import { useState } from "react"
import { useNewsContext } from "../hooks/usenewsContext"
import './newsform.css'

const Newsform = () => {
    const { dispatch } = useNewsContext()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setemptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const news = { title, content, date }

        const response = await fetch('/api/news', {
            method: "POST",
            body: JSON.stringify(news),
            headers: {
                'content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setemptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setContent('')
            setDate('')
            setError(null)
            setemptyFields([])
            console.log('new news addded', json)
            dispatch({ type: 'CREATE_NEWS', payload: json })
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add news</h3>
            <label>News Title :</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)}
                value={title} 
                className={emptyFields.includes('Title')? 'error':''}
                />

            <label>News Content :</label>
            <input type="text" onChange={(e) => setContent(e.target.value)}
                value={content} 
                className={emptyFields.includes('Content')? 'error':''}
                />
            <label>News date published :</label>
            <input type="text" onChange={(e) => setDate(e.target.value)}
                value={date} 
                className={emptyFields.includes('Date')? 'error':''}
                />
            <button>Add News</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Newsform;