export const stopAllCameras = () => {
    // Get all video elements in the document
    const videos = document.querySelectorAll('video');
    
    // Stop tracks for each video element
    videos.forEach(video => {
      if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => {
          track.stop();
        });
        video.srcObject = null;
      }
    });
    
    // Also try to stop any tracks that might be active
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        stream.getTracks().forEach(track => track.stop());
      })
      .catch(() => {
        // Ignore errors, this is just a cleanup attempt
      });
  };
  