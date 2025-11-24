from fastapi import APIRouter,HTTPException
from fastapi.responses import JSONResponse
from db import db
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

@router.delete('/deleteimage')
async def deleteImages(file_id:str,user_id:str):
    try:
        img_data=db["image_links"].find_one({"file_id":file_id,"owner_id":user_id})
        if not img_data:
            return JSONResponse(
                content={"success": "false", "message": "Image not found or unauthorized"},
                status_code=404
            )
        
        # Get Cloudinary public_id from database
        public_id = img_data.get("cloudinary_public_id") or img_data.get("file_name")
        
        if public_id:
            try:
                # Delete from Cloudinary
                cloudinary.uploader.destroy(public_id, resource_type="auto")
            except Exception as cloudinary_error:
                # Log error but continue with database deletion
                print(f"Cloudinary deletion error: {cloudinary_error}")
    
        # Delete record from database
        result=db["image_links"].delete_one({"file_id":file_id,"owner_id":user_id})
                    
        if result.deleted_count == 1:
            return JSONResponse(content={"success": "true", "message": "Image Deleted"}, status_code=200)
        else:
            return JSONResponse(content={"success": "false", "message": "Image not found or unauthorized"}, status_code=404)
        
        
    except Exception as e:
        return JSONResponse(content={"error": "Internal Server Error {}".format(str(e))}, status_code=500)
    