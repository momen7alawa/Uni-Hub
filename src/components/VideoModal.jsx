// src/components/VideoModal.js
import React, { useEffect } from 'react';

const VideoModal = ({ isOpen, onClose, videoSrc }) => {
    // 4. Video Modal logic - controlled by props from App.js

    // Stop video and clear source when closing
    const handleClose = () => {
        onClose();
    };

    if (!isOpen) {
        return null;
    }
    
    // The videoSrc is intentionally empty in App.js when closed, 
    // and set to the full source when opened to handle autoplay/stop
    const currentVideoSrc = isOpen ? videoSrc : "";

    // Set class dynamically for styling (modal.show)
    const modalClass = `modal ${isOpen ? 'show' : ''}`;

    return (
        <div id="videoModal" className={modalClass}>
            <div className="modal-content">
                <span className="close-modal" onClick={handleClose}>&times;</span>
                <div className="video-container">
                    <iframe 
                        src={currentVideoSrc} // Will auto-play if src is set when modal opens
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;