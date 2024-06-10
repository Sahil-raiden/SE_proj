import './newsdetails.css'
import { useNewsContext } from '../hooks/usenewsContext'

const NewsDetails = ({news})=>{
    const {dispatch} =useNewsContext()

const handleClick = async ()=>{
    const response = await fetch('/api/news/'+news._id,{
        method:'DELETE'
    })
    const json = await response.json()
    if(response.ok){
        dispatch({type : 'DELETE_NEWS',payload:json})
    }
}



    return (
        <div className="news details">
            <h4>{news.title}</h4>
            <p><strong>Content : </strong>{news.content}</p>
            <p>{news.date}</p>
            <button className="btn btn-success" onClick={handleClick}>Delete</button>
        </div>
    )
}

export default NewsDetails;