import React, { Fragment, useDeferredValue } from "react";
import {useState} from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';
import '../Styles/TrailerMovie.css'
import { useEffect } from "react";

function TrailerTrending({moviesTitle}) {
    const [video, setVideo]= useState ("inception");
    const [videoURL, setVideoURL]= useState ("https://www.youtube.com/watch?v=3y0KM5jUnmk");

    function handleSearch() {
        setVideo(moviesTitle)
        movieTrailer(video).then((res) => {
            setVideoURL(res);
        });

    }
    useEffect (() => {
        // handleSearch()
    },[videoURL]) 
    return (  
        <Fragment>
            <div className="Container">
            </div>
            <div className="player">
            <ReactPlayer url ={videoURL} controls= {true} width={"1000px"} height={"700px"} muted={false}/>
            </div>
        </Fragment>
    )
}

export default TrailerTrending