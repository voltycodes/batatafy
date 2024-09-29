"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import {useDropzone} from 'react-dropzone'
import Dialog from './components/dialog';
import SettingsDialog from './components/settings';
import { off } from 'process';

// const fileTypes = ["JPG", "PNG", "AVIF", "WEBP", "JPEG"];

const ImageUploader = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  const [dialogVisible, setDialogVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);

  const [blur, setBlur] = useState(2);
  const [sepia, setSepia] = useState(0.4);
  const [shake, setShake] = useState(10);
  const [offset, setOffset] = useState(1);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageURL(event.target?.result as string);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  useEffect(() => {
    if (imageURL) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.filter = `blur(${blur}px) sepia(${sepia})`; // Apply sepia filter for yellowish tone
        
        
          for (let i = 0; i < shake; i++) {
            ctx.globalAlpha = 1 / (i + 1); // Reduce opacity for each copy
            ctx.drawImage(img, offset * i, 0); // Draw image with horizontal offset
          }
        
          setPreview(canvas.toDataURL('image/jpeg'));
        }
      };
      img.src = imageURL;
    }
  }, [imageURL, image, blur, sepia, shake, offset]);

  const cleanUp = () => {
    setImage(null);
    setImageURL(null);
    setPreview(null);
  }

  return (
    <main className='h-screen max-h-screen overflow-hidden flex flex-col items-center justify-center relative'>
      <div className='w-full max-w-xl px-8 flex justify-between md:justify-center items-center mb-4'>
        <h1 className='text-4xl font-bold'>batata-fy 🥔</h1>
        <div className='md:absolute top-10 right-10 flex gap-2 md:flex-col'>
          <button className='border-2 p-2 rounded-full' onClick={() => setDialogVisible(!dialogVisible)}>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" /><line x1={13} x2={19} y1={19} y2={13} /><line x1={16} x2={20} y1={16} y2={20} /><line x1={19} x2={21} y1={21} y2={19} /><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" /><line x1={5} x2={9} y1={14} y2={18} /><line x1={7} x2={4} y1={17} y2={20} /><line x1={3} x2={5} y1={19} y2={21} /></svg>
          </button>
          <button className='border-2 p-2 rounded-full' onClick={() => setSettingsVisible(!settingsVisible)}>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx={17} cy={17} r={3} /><circle cx={7} cy={7} r={3} /></svg>
          </button> 
        </div>
      </div>
      
      <Dialog isVisible={dialogVisible} setIsVisible={setDialogVisible} />

      <SettingsDialog
        isVisible={settingsVisible}
        setIsVisible={setSettingsVisible}
        blur={blur}
        setBlur={setBlur}
        sepia={sepia}
        setSepia={setSepia}
        shake={shake}
        setShake={setShake}
        offset={offset}
        setOffset={setOffset}
      />
      
      <div className='max-h-[80%] h-full max-w-[80%] w-full flex items-center justify-center'>
      {
        (preview && imageURL) ? (
          <ReactCompareSlider
            className='max-h-fit max-w-fit h-full w-full rounded-xl'
            itemOne={<ReactCompareSliderImage src={imageURL} alt="Image one" />}
            itemTwo={<ReactCompareSliderImage src={preview} alt="Image two" />}
          />
        ) : (
          <div {...getRootProps()} className='border-2 border-dashed rounded-xl p-8 cursor-pointer w-full max-w-xl'>
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p className='text-center'>Drop the files here ...</p> :
                <p className='text-center'>Drag 'n' drop some files here, or click to select files</p>
            }
          </div>
        )
      }
      </div>
      {preview && (
        <div className='flex items-center justify-center gap-4 mt-4'>
        <a className='py-1 px-3 border-2 rounded-xl hover:bg-white hover:text-black duration-300 ease-in-out' href={preview} download="filtered-image.jpg">
          Download Image
        </a>
        <button className='py-1 px-3 border-2 rounded-xl hover:bg-white hover:text-black duration-300 ease-in-out' onClick={cleanUp}>Upload Another</button>
      </div>
      )}
    </main>
  );
};

export default ImageUploader;