import React,{useState, useEffect} from 'react';
// import faceapi from 'face-api';

export default function StartUp(props) {
  async function warmUp() {
    const img = await faceapi.fetchImage();
    const faceDescription = await faceapi.
  } 

  return (
    <div className="view" onLoad={}>
      <div>
        {/* TITLE */}
      </div>
      {/* LOGO */}
      <div className="f">
        {/* SPINNER */}
      </div>
      <div className="f">
        {/* LOADING */}
      </div>
    </div>
  )
}