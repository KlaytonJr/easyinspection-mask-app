import React, { useState, useEffect, useRef } from "react";
import "easyinspection-mask";
import { stopAllCameras } from '../utils/cameraUtils';

const CameraMask = () => {
  const [mask, setMask] = useState("none");
  const [maskWidth, setMaskWidth] = useState("90%");
  const videoRef = useRef(null);
  const streamRef = useRef(null); // Use a ref instead of state for the stream

  useEffect(() => {
    const startCamera = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = userStream;
        }
        streamRef.current = userStream; // Store the stream in the ref
      } catch (err) {
        console.error("Erro ao acessar a câmera:", err);
      }
    };

    startCamera();

    // Cleanup function
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
        streamRef.current = null;
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, stop camera
        stopAllCameras();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>EasyInspection Mask Web Component</h1>
      <select onChange={(e) => setMask(e.target.value)} value={mask}>
        <option value="none">Sem máscara</option>
        <option value="chassi-motor">chassi-motor</option>
        <option value="odometer">odometer</option>
        <option value="small-vehicle-front">small-vehicle-front</option>
        <option value="small-vehicle-side-left">small-vehicle-side-left</option>
        <option value="small-vehicle-side-right">
          small-vehicle-side-right
        </option>
        <option value="motocycle-front">motocycle-front</option>
        <option value="motocycle-side-left">motocycle-side-left</option>
        <option value="motocycle-side-right">motocycle-side-right</option>
        <option value="big-vehicle-front">big-vehicle-front</option>
        <option value="bus-side-left">bus-side-left</option>
        <option value="bus-side-right">bus-side-right</option>
        <option value="truck-side-left">truck-side-left</option>
        <option value="truck-side-right">truck-side-right</option>
      </select>

      <br />
      <br />

      <label>
        Ajustar largura da máscara (%):
        <input
          type="number"
          value={parseInt(maskWidth)}
          onChange={(e) => setMaskWidth(`${e.target.value}%`)}
          style={{ marginLeft: "10px", width: "60px" }}
        />
      </label>

      <div
        style={{
          position: "relative",
          width: "600px",
          height: "300px",
          margin: "auto",
          marginTop: "30px",
        }}
      >
        {/* Máscara do Web Component */}
        <svg-mask maskName={mask} width={maskWidth}>
          {/* Câmera */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "100%", height: "100%", borderRadius: "15px" }}
          />
        </svg-mask>
      </div>
    </div>
  );
};

export default CameraMask;
