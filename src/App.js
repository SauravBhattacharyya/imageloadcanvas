import React, { useEffect, useState } from "react";
import CanvasFreeDraw from "canvas-free-drawing";
import { IMAGES } from "./Images";

const App = () => {
  const [cfd, setCFD] = useState(null);
  const [index, setIndex] = useState(0);
  const [localArray, setLocalArray] = useState(IMAGES);

  useEffect(() => {
    const loadImg = (image, index) => {
      return new Promise((resolve, reject) => {
        let temp = [...localArray];
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const img = new Image();
        canvas.width = 500;
        canvas.height = 500;
        img.crossOrigin = "*";
        img.src = image.url;
        img.onload = () => {
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          temp[index].localUrl = canvas.toDataURL();
          setLocalArray(temp);
          resolve(image.url);
        };
        img.onerror = (err) => reject(err);
      });
    };
    Promise.all(IMAGES.map((image, index) => loadImg(image, index)))
      .then(() => console.log("Loaded ", localArray))
      .catch((err) => console.log("Error occured ", err));
  }, []);
  useEffect(() => {
    setCFD(
      new CanvasFreeDraw({
        elementId: "canvasDraw",
        height: 500,
        width: 500,
      })
    );
  }, []);

  useEffect(() => {
    const canvasDraw = document.querySelector("#canvasDraw");
    const context = canvasDraw.getContext("2d");
    const img = new Image();
    img.crossOrigin = "*";
    img.src = localArray[index].url;
    img.onload = () => {
      context.drawImage(img, 0, 0, canvasDraw.width, canvasDraw.height);
    };
  }, [index]);

  const prevImg = () => {
    setIndex(index - 1);
  };

  const nextImg = () => {
    setIndex(index + 1);
  };

  return (
    <div>
      <h1>Image Load</h1>
      <canvas id="canvasDraw"></canvas>
      <button onClick={prevImg}>Previous</button>
      <button onClick={nextImg}>Next</button>
    </div>
  );
};

export default App;

// useEffect(()=>{
//   const loadImage=(image,index)=>{
//     console.log(image,index)
//     return new Promise((resolve,reject)=>{
//       const canvas=document.createElement('canvas')
//       const imgLoad=new Image()
//       const context=canvas.getContext('2d')
//       let tempArray=[...localSlide]
//       canvas.width=800
//       canvas.height=600
//       imgLoad.crossOrigin="*"
//       imgLoad.src=`${GLOBAL_API}/${image.slide_path}`
//       imgLoad.onload=()=>{
//         context.drawImage(imgLoad,0,0,canvas.width,canvas.height)
//         tempArray[index].localImageUrl=canvas.toDataURL()
//         setLocalSlide(tempArray)
//         resolve(image.slide_path)
//       }
//       imgLoad.onerror=(err)=>reject(err)
//     })
//   }
//   Promise.all(localSlide.map((image,index)=>loadImage(image,index)))
//     .then(()=>console.log(localSlide))
//     .catch((err)=>console.log("Error ",err))
// },[])
