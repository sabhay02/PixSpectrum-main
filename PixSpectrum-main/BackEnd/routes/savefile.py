from fastapi import APIRouter,File, UploadFile, Depends
from fastapi.responses import JSONResponse
from uuid import uuid4
from db import db
from utils.validators import verify_apikey
import cloudinary
import cloudinary.uploader
import os

router=APIRouter()

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

@router.post("/savefile")
async def upload_image(user_id:str,file: UploadFile = File(...),user:dict=Depends(verify_apikey)):
    try:
        file_id=str(uuid4())
        contents = await file.read()
        
        # Create unique filename with user_id prefix for better organization
        if '.' in file.filename:
            ext = file.filename.rsplit('.', 1)[-1]
            unique_filename = f"{user_id}/{file_id}.{ext}"
        else:
            unique_filename = f"{user_id}/{file_id}"
        
        # Upload to Cloudinary
        upload_result = cloudinary.uploader.upload(
            contents,
            public_id=unique_filename,
            resource_type="auto"  # Auto-detect if it's an image, video, or raw file
        )
        
        # Get the secure URL from Cloudinary
        access_url = upload_result.get("secure_url") or upload_result.get("url")
        
        # Store metadata in database
        link_data={
            "owner_id":user_id,
            "file_id":file_id,
            "file_name":unique_filename,
            "cloudinary_public_id":upload_result.get("public_id"),
            "link":access_url
        }
        
        user_img_link=db["image_links"].insert_one(link_data)
                
        return JSONResponse(content={"success":"true","access_url":access_url},status_code=200)
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)