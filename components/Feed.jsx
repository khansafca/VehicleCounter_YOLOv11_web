

export default function Feed({ videoRef, canvasRef, handleRunInference }) {
    return (
        <div className='flex flex-col items-center'>
            <div id="main" className='flex justify-center items-center relative w-[640px] h-[480px] bg-gray-100 aspect-video rounded-md'>
                <p className='text-gray-400'>No Feed</p>
                <video ref={videoRef} id="webcam" autoPlay playsInline width="640" height="480" className='absolute w-full h-full'></video>
                <canvas ref={canvasRef} id="outputCanvas" className='absolute w-full h-full z-20'></canvas>
            </div>
            <button onClick={handleRunInference} className='cursor-pointer text-lg px-4 py-2 text-white bg-[#362222] rounded-md hover:bg-[#362222]/90 mt-10'>Run Inference</button>
        </div>
    )
}

