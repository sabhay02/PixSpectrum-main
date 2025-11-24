import os
from pymongo import MongoClient
from dotenv import load_dotenv
import certifi

load_dotenv()

mongo_url = os.getenv("MONGODB_URI")
if not mongo_url:
    raise ValueError("MONGODB_URI environment variable not set")

# Configure MongoDB client with SSL certificate handling
# This fixes the SSL certificate verification error on macOS
# First, try with certifi certificate bundle
try:
    client = MongoClient(
        mongo_url,
        tlsCAFile=certifi.where()
    )
    # Test the connection
    client.admin.command('ping')
    print("MongoDB connection established")
except Exception as e:
    error_msg = str(e)
    # If SSL certificate error, try without certificate verification (development only)
    if "SSL" in error_msg or "CERTIFICATE" in error_msg:
        print("Warning: SSL certificate verification failed. Attempting connection without verification (development mode)...")
        try:
            client = MongoClient(
                mongo_url,
                tlsAllowInvalidCertificates=True
            )
            client.admin.command('ping')
            print("MongoDB connection established (SSL verification disabled for development)")
        except Exception as e2:
            raise Exception(
                f"MongoDB connection failed: {e2}\n"
                "\nTo fix SSL certificate issues:\n"
                "1. Run: python3 -m pip install --upgrade certifi\n"
                "2. Or install certificates: /Applications/Python\\ 3.13/Install\\ Certificates.command\n"
                "3. Check your MongoDB connection string includes proper authentication"
            )
    else:
        raise Exception(f"MongoDB connection failed: {e}")

db = client["ImageApp"]

user_collection=db.users

image_link_collection=db.user_image_link