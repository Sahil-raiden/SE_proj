import { useEffect} from "react";
import { useNewsContext } from "../../hooks/usenewsContext";
import Newshome from '../newshome'
import Newsform from '../newsform'

const Home=()=>{
    const {news,dispatch}=useNewsContext()

useEffect(()=>{
    const fetchNews = async()=>{
        const response = await fetch('/api/news')
        const json = await response.json()

        if(response.ok){
        dispatch({type:'SET_NEWS',payload :json})
        }
    }
    fetchNews()
},[])


    return(
        <div className="home">
            <div className="News">
                {news && news.map((news)=>(
                   <Newshome key={news.title} news={news} />
                ))}
            </div>
            <Newsform/>
        </div>
    )
}

export default Home;