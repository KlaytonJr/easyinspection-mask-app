import React, { useState } from "react";
import { captureFullscreenPhoto } from "easyinspection-mask";

function CameraFunction() {
  const [mask, setMask] = useState("none");
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCapture = async () => {
    setLoading(true);
    setError(null);

    try {
      const image = await captureFullscreenPhoto({
        maskName: mask,
        width: "50%",
        marginSize: 0,
        labels: {
          title: "Capturar foto do veículo",
          captureButton: "Tirar foto",
          cancelButton: "Cancelar",
        },
      });

      setCapturedImage(image);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>EasyInspection Camera with Mask Function</h1>

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

      <p>Clique no botão para abrir a câmera</p>
      <button onClick={handleCapture} disabled={loading}>
        {loading ? "Carregando..." : "Capturar Foto do Veículo"}
      </button>

      {error && <p className="error">{error}</p>}

      {capturedImage && (
        <div className="preview">
          <h3>Foto Capturada:</h3>
          <img src={capturedImage} alt="Veículo capturado" />
        </div>
      )}
    </div>
  );
}

export default CameraFunction;
