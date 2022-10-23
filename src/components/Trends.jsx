import React, { Fragment } from "react";
import axios from 'axios'
import { useEffect } from "react";
import { useState } from "react";
import {AiFillPlayCircle, AiOutlineClose} from 'react-icons/ai'
import '../Styles/Videos.css'
import NoImg from './aa.jpg'
import {Container} from './NavBar' 
import { useContext } from "react";
import TrailerMovies from "../Trailer/TrailerTrending";

function Trends () {
    const {toggle, inputValue} = useContext(Container)
    const input = inputValue
    const [moviesData, setMoviesData] = useState([])
    const [trailer, setTrailer] = useState(true)
    const [trendTitle, setTrendTitle]= useState ('')
    const Api = 'https://api.themoviedb.org/3'
    const Images= "https://image.tmdb.org/t/p/w500"
    const TrendsShow ='/trending/all/day'

    const Trends = async () => {
        const data= await axios.get (`${Api}${TrendsShow}`, {
            params: {
                api_key: 'e9e9d8da18ae29fc430845952232787c',
                query: input
            }
        })
        const results = data.data.results
        setMoviesData(results)
    }
    useEffect(() => {
        setTimeout(()=> {
            Trends()
        },100)
        
    },[input])
    const TrendTitle = (trend) => {
        setTrendTitle(trend.title)
        setTrailer(!trailer)

    } 
    return (
        <Fragment>
            <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
            <div className="movies-container">
            {moviesData.map((trend) => {
                return (
                    <Fragment>
                        <div id={trailer ? 'container': 'NoContainer'}>
                        <AiFillPlayCircle color='white' fontSize={40} id= {trailer ? "playIcon" : 'hire'} onClick={() => TrendTitle(trend)}/ >
                        <img src= {trend.poster_path ? `${Images}${trend.poster_path}` : NoImg} alt='' onClick={() => TrendTitle(trend)}/ >
                        <h3 id='smaller-Text' className={toggle ? 'mainColor': 'secondaryColor'}>{trend.title}{trend.name}</h3>
                        </div>
                    </Fragment>
                )
            })}
            {trailer ? console.log : <TrailerMovies TrailerTrending={trendTitle}/>}
            <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={55}markerEnd color='#fff' curson={'pointer'} onClick={() => setTrailer(true)}/>
            </div> 
            </div>
          
        </Fragment>
    )
}
export default Trends


