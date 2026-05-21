import { Box, Button, Typography } from '@mui/material'
import { useRef, useState } from 'react'

const CameraView = () => {
    const videoRef = useRef(null)
    const streamRef = useRef(null)

    const [opened, setOpened] = useState(false)
    const [error, setError] = useState(null)

    const startCamera = async () => {
        setError(null)

        try {
            if (!navigator.mediaDevices?.getUserMedia) {
                throw new Error('getUserMedia не поддерживается в этом браузере')
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: { exact: 'environment' }, // задняя камера iPhone
                },
                audio: false,
            })

            streamRef.current = stream
            setOpened(true)

            const video = videoRef.current

            if (video) {
                video.srcObject = stream
                video.setAttribute('playsinline', true)
                video.setAttribute('webkit-playsinline', true)
                video.muted = true

                // iOS требует явного play()
                await video.play().catch(() => {})
            }
        } catch (e) {
            console.error(e)
            setError(e.message || 'Камера недоступна')
        }
    }

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop())
        }

        streamRef.current = null
        setOpened(false)
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: 420,
                position: 'relative',
                background: '#000',
                borderRadius: 3,
                overflow: 'hidden',
            }}
        >
            {!opened && (
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Button variant="contained" onClick={startCamera}>
                        Открыть камеру
                    </Button>

                    {error && <Typography sx={{ color: 'red', fontSize: 12 }}>{error}</Typography>}
                </Box>
            )}

            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: opened ? 'block' : 'none',
                }}
            />

            {opened && (
                <Button
                    onClick={stopCamera}
                    variant="contained"
                    color="error"
                    sx={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                        borderRadius: 2,
                    }}
                >
                    Закрыть
                </Button>
            )}
        </Box>
    )
}

export default CameraView
