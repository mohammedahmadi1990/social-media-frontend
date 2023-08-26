import React, { useEffect, useState } from 'react';

function ProtectedImage({ imgPath }) {
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(imgPath, {
                    headers: {
                        "x-auth-token": localStorage.getItem('authToken'),
                    },
                });

                const blob = await response.blob();
                setImgSrc(URL.createObjectURL(blob));
            } catch (error) {
                console.error("Error fetching protected image:", error);
            }
        };

        fetchImage();
    }, [imgPath]);

    return imgSrc ? <img src={imgSrc} alt="Protected content" /> : null;
}

export default ProtectedImage;
