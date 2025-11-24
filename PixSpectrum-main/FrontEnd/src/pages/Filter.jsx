import React, { useCallback, useEffect } from 'react'
import { useDropzone } from "react-dropzone";
import { onUpload } from './fileUploader';
import { useToast } from '@/hooks/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { handleFilterDispatch } from '@/lib/filterUtils';
import { cartoonify, compress, contrastEnhancement, coolFilter, gothamEffect, grainyEffect, grayScale, hdrEffect, pencilSketch, saveImage, sepiaEffect, warmFilter } from '@/redux/AsyncThunk';
import { getapiKey, getId } from '@/redux/userSlice';
import { ImagePlus, Loader2, Camera, Palette, Sparkles, Sun, Droplets, Moon, Zap, Contrast, Eye, Download, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getImageBlob, setImageBlob } from '@/redux/imageSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Filter = () => {
  const imageblob = useSelector(getImageBlob);
  const [file, setFile] = React.useState("");
  const [sentFile, setSentFile] = React.useState("");
  const [filteredImage, setFilteredImage] = React.useState("");
  const [selectedFilter, setSelectedFilter] = React.useState("");
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [newfile, setNewFile] = React.useState(""); 
  const [isLoading, setIsLoading] = React.useState(false);
  const [compressImageSize , setCompressImageSize] = React.useState("");
  const [fileSize , setFileSize] = React.useState("");
    const {toast} = useToast();
  const dispatch = useDispatch();
  const apiKey = useSelector(getapiKey)


  

  const applyFilter = async (filterType) => {
    if (!file) {
      toast({title : "Please upload an image to apply filter" , type : "error"});
      return;
    }
    
    // If clicking on "Original", reset the filtered image
    if (filterType === 'original') {
      setSelectedFilter('original');
      setFilteredImage('');
      return;
    }

    setSelectedFilter(filterType);
    setIsLoading(true);

    try {
      let result;
      switch (filterType) {
        case 'grainy':
          result = await handleFilterDispatch(dispatch, toast, grainyEffect, sentFile, apiKey);
          break;
        case 'warm':
          result = await handleFilterDispatch(dispatch, toast, warmFilter, sentFile, apiKey);
          break;
        case 'cool':
          result = await handleFilterDispatch(dispatch, toast, coolFilter, sentFile, apiKey); 
          break;
        case 'pencil':
          result = await handleFilterDispatch(dispatch, toast, pencilSketch, sentFile, apiKey);
          break;
        case 'cartoon':
          result = await handleFilterDispatch(dispatch, toast, cartoonify, sentFile, apiKey);
          break;
        case 'contrast':
          result = await handleFilterDispatch(dispatch, toast, contrastEnhancement, sentFile, apiKey);
          break;
        case 'grey':
          result = await handleFilterDispatch(dispatch, toast, grayScale, sentFile, apiKey);
          break;
        case 'sepia':
          result = await handleFilterDispatch(dispatch, toast, sepiaEffect, sentFile, apiKey);
          break;
        case 'gotham':
          result = await handleFilterDispatch(dispatch, toast, gothamEffect, sentFile, apiKey);
          break;
        case 'hdreffect':
          result = await handleFilterDispatch(dispatch, toast, hdrEffect, sentFile, apiKey);
          break;
        case 'compress':
          result = await handleFilterDispatch(dispatch, toast, compress, sentFile, apiKey);
          break;
        default:
          toast({ title: 'Error', description: 'Invalid filter selected', type: 'error' });
          return;
      }
      console.log(result);
      const filteredImageFile = URL.createObjectURL(result);
      
      setCompressImageSize(result.size);
  
      setFilteredImage(filteredImageFile);
    } catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false); 
    }
  }

  // Filter options with icons
  const filterOptions = [
    { id: 'original', name: 'Original', icon: Camera, bgColor: 'bg-white', borderColor: 'border-gray-300', iconColor: 'text-gray-900', hoverBg: 'bg-gray-50' },
    { id: 'grey', name: 'Grayscale', icon: Palette, bgColor: 'bg-gray-100', borderColor: 'border-gray-300', iconColor: 'text-gray-700', hoverBg: 'bg-gray-200' },
    { id: 'sepia', name: 'Sepia', icon: Sun, bgColor: 'bg-amber-50', borderColor: 'border-amber-300', iconColor: 'text-amber-800', hoverBg: 'bg-amber-100' },
    { id: 'warm', name: 'Warm Filter', icon: Sun, bgColor: 'bg-orange-50', borderColor: 'border-orange-300', iconColor: 'text-orange-700', hoverBg: 'bg-orange-100' },
    { id: 'cool', name: 'Cool Filter', icon: Droplets, bgColor: 'bg-blue-50', borderColor: 'border-blue-300', iconColor: 'text-blue-700', hoverBg: 'bg-blue-100' },
    { id: 'contrast', name: 'Contrast', icon: Contrast, bgColor: 'bg-gray-100', borderColor: 'border-gray-300', iconColor: 'text-gray-700', hoverBg: 'bg-gray-200' },
    { id: 'grainy', name: 'Grainy Effect', icon: Sparkles, bgColor: 'bg-gray-100', borderColor: 'border-gray-300', iconColor: 'text-gray-700', hoverBg: 'bg-gray-200' },
    { id: 'pencil', name: 'Pencil Sketch', icon: Eye, bgColor: 'bg-gray-100', borderColor: 'border-gray-300', iconColor: 'text-gray-700', hoverBg: 'bg-gray-200' },
    { id: 'cartoon', name: 'Cartoon Effect', icon: Sparkles, bgColor: 'bg-purple-50', borderColor: 'border-purple-300', iconColor: 'text-purple-700', hoverBg: 'bg-purple-100' },
    { id: 'gotham', name: 'Gotham', icon: Moon, bgColor: 'bg-gray-100', borderColor: 'border-gray-300', iconColor: 'text-gray-700', hoverBg: 'bg-gray-200' },
    { id: 'hdreffect', name: 'HDR Effect', icon: Zap, bgColor: 'bg-gray-100', borderColor: 'border-gray-300', iconColor: 'text-gray-700', hoverBg: 'bg-gray-200' },
    { id: 'compress', name: 'Compress', icon: Download, bgColor: 'bg-gray-100', borderColor: 'border-gray-300', iconColor: 'text-gray-700', hoverBg: 'bg-gray-200' },
  ];
  const userId = useSelector(getId);

  const saveFile = async () => {
    if (!filteredImage) {
      toast({ title: 'No image to save', type: 'error' });
      return;
    }
    const response = await fetch(filteredImage);
    const blob = await response.blob();
    const file = new File([blob], "filteredImage.png", { type: "image/png" });
    console.log(file);
  

     await dispatch(saveImage({ file  , apiKey , userId})).unwrap().then((data) => {
        console.log(data);
        toast({ title: 'Image saved successfully', type: 'success' });
      }).catch((err) => {
        console.log(err);
        toast({ title: 'Failed to save image', type: 'error' });
      }
    )
  }
   


  console.log(sentFile)
  



  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div className="px-6 py-6 overflow-y-auto h-full custom-scrollbar">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-serif font-bold tracking-tight text-gray-900">Upload and Edit Your Image</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Drop your image here or click to browse
          </p>
        </div>

        {/* Side-by-side Layout with Processing Indicator */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
          {/* Left Column: Upload and Filters */}
          <div className="flex flex-col space-y-6">
            {/* Upload Area */}
            <Card className="border-2 border-dashed border-gray-300 bg-white shadow-md flex-1 flex flex-col">
              <CardContent className="p-4 flex-1 flex flex-col">
                <div
                  {...getRootProps()}
                  className="relative w-full cursor-pointer rounded-lg hover:bg-gray-50/50 transition-colors overflow-hidden flex-1 flex items-center justify-center"
                >
                  <input {...getInputProps()} onChange={async (data) => {
                    const t = await onUpload(data);
                    setFile(t);
                    setSentFile(data.target.files[0]);
                    setFileSize(data.target.files[0].size);
                  }} />
                  {file ? (
                    <div className="flex items-center justify-center w-full h-full min-h-[400px] p-3">
                      <img
                        src={file}
                        alt="Preview"
                        className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-sm"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] space-y-4 py-8">
                      <div className="rounded-full bg-purple-100 p-5">
                        <ImagePlus className="h-10 w-10" style={{ color: '#9959F5' }} />
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-sm font-medium text-gray-900">
                          <span style={{ color: '#9959F5' }}>Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          SVG, PNG, JPG or GIF
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Filter Selection - Circular Buttons */}
            {file && (
              <Card className="bg-white shadow-md">
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select a Filter</h3>
                  <div className="flex flex-wrap gap-4 justify-start">
                    {filterOptions.map((filter) => {
                      const Icon = filter.icon;
                      const isSelected = selectedFilter === filter.id;
                      return (
                        <button
                          key={filter.id}
                          onClick={() => applyFilter(filter.id)}
                          disabled={isLoading}
                          className="flex flex-col items-center gap-2 min-w-[70px] group transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
                              isSelected
                                ? `${filter.bgColor} border-4 shadow-lg ring-2 ring-offset-2`
                                : `${filter.bgColor} ${filter.borderColor} border-2 group-hover:shadow-md group-hover:scale-105`
                            }`}
                            style={{
                              boxShadow: isSelected ? '0 4px 12px rgba(153, 89, 245, 0.3)' : undefined,
                              borderColor: isSelected ? '#9959F5' : undefined,
                              '--tw-ring-color': isSelected ? '#9959F5' : undefined,
                            }}
                          >
                            <Icon className={`h-6 w-6 ${filter.iconColor} transition-transform group-hover:scale-110`} />
                          </div>
                          <span className={`text-xs font-medium text-center transition-colors ${
                            isSelected ? 'text-gray-900 font-semibold' : 'text-gray-600 group-hover:text-gray-900'
                          }`}>
                            {filter.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Middle: Processing Indicator */}
          <div className="hidden lg:flex items-center justify-center px-2">
            <div className="flex flex-col items-center justify-center space-y-2">
              {!file && (
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
              )}
              {file && !isLoading && !filteredImage && (
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center animate-pulse">
                  <ArrowRight className="h-6 w-6" style={{ color: '#9959F5' }} />
                </div>
              )}
              {isLoading && (
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin" style={{ color: '#9959F5' }} />
                </div>
              )}
              {filteredImage && !isLoading && (
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              )}
              <div className="text-xs font-medium text-gray-600 text-center max-w-[60px]">
                {!file && 'Upload'}
                {file && !isLoading && !filteredImage && 'Ready'}
                {isLoading && 'Processing'}
                {filteredImage && !isLoading && 'Complete'}
              </div>
            </div>
          </div>

          {/* Right Column: Filtered Image Preview */}
          <div className="flex flex-col">
            {isLoading && (
              <Card className="bg-white shadow-md flex-1 flex flex-col">
                <CardContent className="p-8 flex-1 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin" style={{ color: '#9959F5' }} />
                    <div className="text-center">
                      <p className="text-base font-semibold text-gray-900">Processing Image</p>
                      <p className="text-sm text-gray-600 mt-1">Applying filter...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {filteredImage && !isLoading && (
              <Card className="bg-white shadow-md flex-1 flex flex-col">
                <CardContent className="p-5 space-y-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Filtered Image Preview</h3>
                    <Button 
                      onClick={saveFile}
                      className="text-white transition-colors text-sm"
                      style={{ backgroundColor: '#9959F5' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#7c3aed'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#9959F5'}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Save Image
                    </Button>
                  </div>
                  <div className="flex items-center justify-center w-full flex-1 min-h-[400px] p-3 bg-gray-50 rounded-lg">
                    <img
                      src={filteredImage}
                      alt="Filtered preview"
                      className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-sm"
                    />
                  </div>
                  {selectedFilter === "compress" && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-xs text-green-800">
                        <span className="font-semibold">Image Compressed:</span> {(compressImageSize/1024).toFixed(2)} KB 
                        <span className="text-green-600"> (from {(fileSize/1024).toFixed(2)} KB)</span>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {!filteredImage && !isLoading && file && (
              <Card className="bg-white shadow-md flex-1 flex flex-col">
                <CardContent className="p-8 flex-1 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="rounded-full bg-gray-100 p-6">
                      <ImagePlus className="h-10 w-10 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Select a filter to see preview</p>
                      <p className="text-xs text-gray-500 mt-1">Choose from the filters on the left</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!file && !isLoading && (
              <Card className="bg-white shadow-md flex-1 flex flex-col">
                <CardContent className="p-8 flex-1 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="rounded-full bg-gray-100 p-6">
                      <ImagePlus className="h-10 w-10 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Upload an image to get started</p>
                      <p className="text-xs text-gray-500 mt-1">Your filtered image will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter
