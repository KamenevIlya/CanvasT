
import {useEffect, useRef, useState} from "react";


let startP={x:10,y:10};
let endP={x:10,y:10};

const App=(props)=>{
    const canvasRef=useRef(null)
    const contextRef=useRef(null)
    const [isDrawing, setIsDrawing]=useState(false)
    useEffect(()=>{
        const canvas=canvasRef.current;
        canvas.width=window.innerWidth*2;
        canvas.height=window.innerHeight*2;
        canvas.style.height=`${window.innerHeight}px`;
        canvas.style.height=`${window.innerHeight}px`;
        const context=canvas.getContext('2d');
        context.scale(2,2);
        context.lineCap='square';
        context.strokeStyle='black'
        context.lineWidth=3;
        contextRef.current=context;
    },[])


    const startDrawing=({nativeEvent})=>{
        const {offsetX,offsetY}=nativeEvent;
        startP= {x:offsetX, y: offsetY};
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX,offsetY);
        setIsDrawing(true)
    }

    const finishDrawing=({nativeEvent})=>{
        const {offsetX,offsetY}=nativeEvent;
        endP={x:offsetX,y:offsetY};
        setIsDrawing(false);
        contextRef.current.closePath();
        drawRectangle();
    }

    const drawRectangle = () => {
        contextRef.current.lineTo(startP.x, endP.y);
        contextRef.current.lineTo(endP.x, endP.y);
        contextRef.current.lineTo(endP.x, startP.y);
        contextRef.current.lineTo(startP.x, startP.y);
        contextRef.current.stroke();
    }

    return(
        <div>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                ref={canvasRef}
            />
        </div>
    )
}

export default App;
