import { createCanvas, loadImage, registerFont } from 'canvas';
import path from 'path';
import fs from 'fs';

const POSTER_TEMPLATE_PATH = path.join(process.cwd(), 'attached_assets', 'I_AM_ATTENDING_1765956431257.jpg');

interface PosterData {
  fullName: string;
  profilePhoto?: string | null;
}

export async function generateAttendingPoster(data: PosterData): Promise<Buffer | null> {
  try {
    const posterImg = await loadImage(POSTER_TEMPLATE_PATH);
    
    const canvas = createCanvas(posterImg.width, posterImg.height);
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(posterImg, 0, 0);
    
    let photoLoaded = false;
    if (data.profilePhoto) {
      try {
        const photoPath = path.join(process.cwd(), data.profilePhoto.replace(/^\//, ''));
        if (fs.existsSync(photoPath)) {
          const userImg = await loadImage(photoPath);
          
          const circleX = canvas.width * 0.42;
          const circleY = canvas.height * 0.32;
          const circleRadius = canvas.width * 0.18;
          
          ctx.save();
          ctx.beginPath();
          ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          
          const scale = Math.max(
            (circleRadius * 2) / userImg.width,
            (circleRadius * 2) / userImg.height
          );
          const scaledWidth = userImg.width * scale;
          const scaledHeight = userImg.height * scale;
          const imgX = circleX - scaledWidth / 2;
          const imgY = circleY - scaledHeight / 2;
          
          ctx.drawImage(userImg, imgX, imgY, scaledWidth, scaledHeight);
          ctx.restore();
          photoLoaded = true;
        }
      } catch (err) {
        console.error('Failed to load profile photo:', err);
        photoLoaded = false;
      }
    }
    
    if (!photoLoaded) {
      const circleX = canvas.width * 0.42;
      const circleY = canvas.height * 0.32;
      const circleRadius = canvas.width * 0.18;
      
      ctx.save();
      ctx.beginPath();
      ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = '#e5e7eb';
      ctx.fill();
      
      ctx.fillStyle = '#9ca3af';
      ctx.font = `bold ${canvas.width * 0.08}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const initials = data.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      ctx.fillText(initials, circleX, circleY);
      ctx.restore();
    }
    
    ctx.fillStyle = '#1a1a1a';
    ctx.font = `bold ${canvas.width * 0.035}px Arial, sans-serif`;
    ctx.textAlign = 'left';
    const nameX = canvas.width * 0.52;
    const nameY = canvas.height * 0.56;
    ctx.fillText(data.fullName.toUpperCase(), nameX, nameY);
    
    return canvas.toBuffer('image/png');
  } catch (err) {
    console.error('Failed to generate poster:', err);
    return null;
  }
}
