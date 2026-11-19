import React, { useEffect, useRef } from 'react';

interface ServiceHeroMediaProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  autoPlay: boolean;
  poster?: string;
  preload?: 'none' | 'metadata' | 'auto';
  extendRightEdge?: boolean;
  sampleEdges?: boolean;
  children: React.ReactNode;
}

type Edge = 'top' | 'bottom' | 'right';

const edgeWidth = 640;
const edgeHeight = 24;
const edgeFadeStops = [[0, 1], [0.06, 1], [0.22, 0.82], [0.55, 0.35], [0.8, 0.08], [1, 0]] as const;

function paintEdge(
  canvas: HTMLCanvasElement,
  media: HTMLVideoElement | HTMLImageElement,
  video: HTMLVideoElement,
  edge: Edge,
  detail: CanvasRenderingContext2D,
  palette: CanvasRenderingContext2D,
) {
  const context = canvas.getContext('2d');
  if (!context) return;
  const mediaWidth = media instanceof HTMLVideoElement ? media.videoWidth : media.naturalWidth;
  const mediaHeight = media instanceof HTMLVideoElement ? media.videoHeight : media.naturalHeight;
  if (!mediaWidth || !mediaHeight) return;
  const { width, height } = canvas;
  const right = edge === 'right';
  const bottom = edge === 'bottom';

  context.globalCompositeOperation = 'source-over';
  context.clearRect(0, 0, width, height);
  if (right) {
    if (!canvas.clientHeight) return;
    // Match the right edge at the video's height and continue its corner colors above and below.
    const scale = height / canvas.clientHeight;
    const top = video.offsetTop * scale;
    const body = video.clientHeight * scale;
    const end = Math.min(height, top + body);
    context.drawImage(media, mediaWidth - 1, 0, 1, 1, 0, 0, width, top + 1);
    context.drawImage(media, mediaWidth - 1, mediaHeight - 1, 1, 1, 0, end - 1, width, height - end + 1);
    context.drawImage(media, mediaWidth - 1, 0, 1, mediaHeight, 0, top, width, body);

    const corners = context.createLinearGradient(0, 0, 0, height);
    for (const [distance, opacity] of edgeFadeStops) {
      corners.addColorStop(Math.max(0, Math.min(1, top * (1 - distance) / height)), `rgb(0 0 0 / ${opacity})`);
      corners.addColorStop((end + (height - end) * distance) / height, `rgb(0 0 0 / ${opacity})`);
    }
    context.globalCompositeOperation = 'destination-in';
    context.fillStyle = corners;
    context.fillRect(0, 0, width, height);
  } else {
    const row = bottom ? mediaHeight - 1 : 0;
    // Keep the exact source edge at the join and carry only its broad colors farther out.
    const sharpEdge = detail.canvas;
    const broadEdge = palette.canvas;
    palette.globalCompositeOperation = 'copy';
    palette.drawImage(media, 0, row, mediaWidth, 1, 0, 0, broadEdge.width, 1);
    context.drawImage(broadEdge, 0, 0, width, height);
    detail.globalCompositeOperation = 'copy';
    detail.drawImage(media, 0, row, mediaWidth, 1, 0, 0, width, height);
    const detailFade = detail.createLinearGradient(0, bottom ? 0 : height, 0, bottom ? height : 0);
    detailFade.addColorStop(0, '#000');
    detailFade.addColorStop(0.06, '#000');
    detailFade.addColorStop(0.14, '#0008');
    detailFade.addColorStop(0.4, 'transparent');
    detail.globalCompositeOperation = 'destination-in';
    detail.fillStyle = detailFade;
    detail.fillRect(0, 0, width, height);
    context.drawImage(sharpEdge, 0, 0);
  }

  const fade = context.createLinearGradient(0, edge === 'top' ? height : 0, right ? width : 0, edge === 'top' || right ? 0 : height);
  for (const [distance, opacity] of edgeFadeStops) {
    fade.addColorStop(distance, `rgb(0 0 0 / ${opacity})`);
  }
  context.globalCompositeOperation = 'destination-in';
  context.fillStyle = fade;
  context.fillRect(0, 0, width, height);
}

export const ServiceHeroMedia: React.FC<ServiceHeroMediaProps> = ({ videoRef, autoPlay, poster, preload = 'auto', extendRightEdge = false, sampleEdges = true, children }) => {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sampleEdges) return;
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video || !frame) return;
    const canvases = frame.querySelectorAll<HTMLCanvasElement>('canvas');
    const detailCanvas = document.createElement('canvas');
    detailCanvas.width = edgeWidth;
    detailCanvas.height = edgeHeight;
    const paletteCanvas = document.createElement('canvas');
    paletteCanvas.width = 16;
    paletteCanvas.height = 1;
    const detail = detailCanvas.getContext('2d');
    const palette = paletteCanvas.getContext('2d');
    if (!detail || !palette) return;
    palette.imageSmoothingQuality = 'high';

    const paint = (media: HTMLVideoElement | HTMLImageElement) => {
      canvases.forEach((canvas) => paintEdge(canvas, media, video, canvas.dataset.edge as Edge, detail, palette));
    };
    const paintVideo = () => {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) paint(video);
    };
    const image = poster ? new Image() : null;
    if (image && poster) {
      image.onload = () => {
        if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) paint(image);
      };
      image.src = poster;
    }
    const resize = new ResizeObserver(() => {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) paint(video);
      else if (image?.complete && image.naturalWidth) paint(image);
    });
    resize.observe(frame);

    video.addEventListener('loadeddata', paintVideo);
    paintVideo();
    let frameId: number | undefined;
    let lastPaint = -Infinity;
    let visible = false;
    const update = (now: number) => {
      frameId = undefined;
      if (now - lastPaint >= 66) {
        paintVideo();
        lastPaint = now;
      }
      scheduleFrame();
    };
    const scheduleFrame = () => {
      if (visible && frameId === undefined && video.requestVideoFrameCallback) {
        frameId = video.requestVideoFrameCallback(update);
      }
    };
    const stopFrames = () => {
      if (frameId === undefined) return;
      video.cancelVideoFrameCallback(frameId);
      frameId = undefined;
    };
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        paintVideo();
        scheduleFrame();
      } else {
        stopFrames();
      }
    });
    visibility.observe(frame);
    const paintIfVisible = () => { if (visible) paintVideo(); };
    video.addEventListener('seeked', paintVideo);
    if (!video.requestVideoFrameCallback) video.addEventListener('timeupdate', paintIfVisible);
    return () => {
      if (image) image.onload = null;
      resize.disconnect();
      visibility.disconnect();
      video.removeEventListener('loadeddata', paintVideo);
      video.removeEventListener('seeked', paintVideo);
      video.removeEventListener('timeupdate', paintIfVisible);
      stopFrames();
    };
  }, [poster, extendRightEdge, sampleEdges, videoRef]);

  return (
    <div className="service-hero-media pointer-events-none" aria-hidden="true">
      <div ref={frameRef} className="service-hero-frame">
        {sampleEdges && (
          <>
            <canvas data-edge="top" width={edgeWidth} height={edgeHeight} />
            <canvas data-edge="bottom" width={edgeWidth} height={edgeHeight} />
            {extendRightEdge && <canvas data-edge="right" width={16} height={180} />}
          </>
        )}
        <video
          ref={videoRef}
          className="service-hero-video"
          width={1280}
          height={720}
          autoPlay={autoPlay}
          muted
          loop
          playsInline
          poster={poster}
          preload={preload}
          tabIndex={-1}
        >
          {children}
        </video>
      </div>
    </div>
  );
};
