import React, { Fragment } from "react";
import axios from 'axios'
import { useEffect } from "react";
import { useState } from "react";
import {AiFillPlayCircle} from 'react-icons/ai'
import {AiOutlineClose} from 'react-icons/ai'
import NoImg from './aa.jpg'
import {Container} from './NavBar' 
import { useContext } from "react";
import '../Styles/Videos.css'
import TrailerMovies from "../Trailer/TrailerTvShows";


function TvShows() {
    const {toggle, inputValue} = useContext(Container)
    const [showData, setShowData]= useState ([])
    const [trailer, setTrailer]= useState(true)
    const [title, setTitle]= useState('')
    const input = inputValue
    const Shown = input ? 'search' : 'discover'
    const Api = `https://api.themoviedb.org/3/${Shown}/tv`
    const Images= "https://image.tmdb.org/t/p/w500"

    const TvShows = async() => {
        const data = await axios.get(Api,{
            params: {
                api_key: 'e9e9d8da18ae29fc430845952232787c',
                query: input
            }
        })
        const results= (data.data.results)
        setShowData(results)
        }

        useEffect(() => {
            setTimeout(()=> {
                TvShows()

            },100)
            
        },[input])
        console.log(showData)
        const TvShowTitle = (shows) => {
        setTitle (shows.name)
        setTrailer(!trailer)
        }
    return (
        <Fragment>
            <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
            <div className="movies-container">
            {showData.map((shows) => {
                return (
                    <Fragment key={shows.id}>
                        <div id={ trailer ? 'container': 'NoContainer'}>
                            <AiFillPlayCircle color ='#fff' fontSize={40}  id={trailer ? "playIcon" : 'hire'} onClick={()=> TvShowTitle(shows)}/>
                            <img src ={shows.poster_path ? `${Images}${shows.poster_path}`: NoImg} alt= "" onClick={()=> TvShowTitle(shows)}/>
                            <h3 id= {shows.name.length > 28 ? 'smaller-Text': ''} className={toggle ? 'mainColor' : 'secondaryColor'}> {shows.name}</h3>
                        </div>
                    </Fragment>
                )
            })}
            {trailer ? console.log : <TrailerMovies TvTitle={title}/>}
            <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={55}markerEnd color='#fff' curson={'pointer'} onClick={() => setTrailer(true)}/>
            </div>
            </div>
        </Fragment>
    )
}

export default TvShows