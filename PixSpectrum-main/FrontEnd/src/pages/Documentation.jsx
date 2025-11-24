import React from "react";
import EndpointCard from "../components/EndpointCard";

const DocumentationPage = () => {
    const websiteUrl = "http://localhost:8000";
    const finalEndpoints = [
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/auth/signin",
        requestBody: { 
          email: "string", 
          password: "string" 
        },
        parameters: {},
        response: { 
          success: "true/false", 
          message: "Login Successful / Invalid credentials!", 
          user: {
              "_id": "user-id",
              "email": "your-email@gmail.com",
              "api_key": "your-api-key"
            }
          },
        description: "The Sign In endpoint allows registered users to log in with their credentials. Returns user data including API key upon successful authentication."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/auth/signup",
        requestBody: { 
          email: "string", 
          password: "string" 
        },
        parameters: {},
        response: { 
          success: "true/false", 
          message: "SignUp Successful / User already exists!", 
          user: {
            "_id": "user-id",
            "email": "your-email@gmail.com",
            "api_key": "your-api-key"
          }
        },
        description: "The Sign Up endpoint allows new users to create an account by providing their email and password. Returns user data including a unique API key upon successful registration."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/savefile",
        requestBody: { 
          file: "multipart/form-data (image file)", 
          apikey: "your-api-key" 
        },
        parameters: { 
          user_id: "string (query parameter)" 
        },
        response: { 
          success: "true/false", 
          access_url: "https://your-cloudinary-url.com/image.jpg" 
        },
        description: "The Save File endpoint stores the uploaded image file to Cloudinary cloud storage, linking it to the specified user ID. Returns a public URL to access the saved image."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/grayscale",
        requestBody: { 
          file: "multipart/form-data (image file)", 
          apikey: "your-api-key" 
        },
        parameters: {},
        response: { 
          image: "image/jpeg (processed image blob)" 
        },
        description: "The Grayscale endpoint converts a colored image into grayscale, removing all color and leaving shades of gray. This effect can be used to create classic, monochrome images with a timeless feel."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/warmfilter",
        requestBody: { 
          file: "multipart/form-data (image file)", 
          apikey: "your-api-key" 
        },
        parameters: {},
        response: { 
          image: "image/jpeg (processed image blob)" 
        },
        description: "The Warm Filter endpoint applies a warm color effect to the uploaded image, giving it a cozy, reddish hue. This effect is often used to create inviting and vibrant images, ideal for portraits and landscapes."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/coolfilter",
        requestBody: { 
          file: "multipart/form-data (image file)", 
          apikey: "your-api-key" 
        },
        parameters: {},
        response: { 
          image: "image/jpeg (processed image blob)" 
        },
        description: "The Cool Filter endpoint applies a cool color effect to the uploaded image, giving it a serene, bluish hue. This effect is often used to create calming and tranquil images, ideal for landscapes and cool-toned portraits."
      },  
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/pencilsketch",
        requestBody: { 
          file: "multipart/form-data (image file)", 
          apikey: "your-api-key" 
        },
        parameters: {},
        response: { 
          image: "image/jpeg (processed image blob)" 
        },
        description: "The Pencil Sketch endpoint converts an uploaded image into a pencil sketch effect. This filter gives the appearance of a hand-drawn sketch, perfect for creating artistic representations of photos."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/cartoonify",
        requestBody: { 
          file: "multipart/form-data (image file)", 
          apikey: "your-api-key" 
        },
        parameters: {},
        response: { 
          image: "image/jpeg (processed image blob)" 
        },
        description: "The Cartoonify endpoint processes an uploaded image, transforming it into a cartoon-like effect with simplified colors and defined edges."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/contrastenhancement",
        requestBody: { 
          file: "multipart/form-data (image file)", 
          apikey: "your-api-key" 
        },
        parameters: {},
        response: { 
          image: "image/jpeg (processed image blob)" 
        },
        description: "The Contrast Enhancement endpoint improves the contrast of an image, making colors more vivid and details more defined. This is particularly useful for images that look washed out or lack definition."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/grainyeffect",
        requestBody: { 
          file: "multipart/form-data (image file)", 
          apikey: "your-api-key" 
        },
        parameters: {},
        response: { 
          image: "image/jpeg (processed image blob)" 
        },
        description: "The Grainy Effect endpoint adds a grainy or film-like texture to the image, creating a vintage or retro look. This effect is ideal for stylizing photos with an old-school, textured appearance."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/sepia",
        requestBody: { 
          file: "multipart/form-data (image file)", 
          apikey: "your-api-key" 
        },
        parameters: {},
        response: { 
          image: "image/jpeg (processed image blob)" 
        },
        description: "The Sepia endpoint applies a sepia tone effect to the image, giving it an antique, brownish appearance reminiscent of vintage photographs."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/gotham",
        requestBody: { 
          file: "multipart/form-data (image file)", 
          apikey: "your-api-key" 
        },
        parameters: {},
        response: { 
          image: "image/jpeg (processed image blob)" 
        },
        description: "The Gotham endpoint applies a dark, dramatic filter inspired by the Gotham photo filter. It enhances shadows and creates a moody, cinematic look."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/hdreffect",
        requestBody: { 
          file: "multipart/form-data (image file)", 
          apikey: "your-api-key" 
        },
        parameters: {},
        response: { 
          image: "image/jpeg (processed image blob)" 
        },
        description: "The HDR Effect endpoint creates a High Dynamic Range effect, enhancing the image's brightness, contrast, and color saturation to create a more vibrant and detailed appearance."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/invertcolor",
        requestBody: { 
          file: "multipart/form-data (image file)", 
          apikey: "your-api-key" 
        },
        parameters: {},
        response: { 
          image: "image/jpeg (processed image blob)" 
        },
        description: "The Color Invert endpoint inverts all colors in the image, creating a negative-like effect where colors are reversed to their complementary colors."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/compression",
        requestBody: { 
          file: "multipart/form-data (image file)", 
          apikey: "your-api-key" 
        },
        parameters: {},
        response: { 
          image: "image/jpeg (compressed image blob)" 
        },
        description: "The Compression endpoint compresses an uploaded image, reducing its file size while maintaining acceptable image quality. Useful for optimizing images for web use."
      },
      {
        requestType: "GET",
        routeUrl: websiteUrl + "/getallimages",
        requestBody: {},
        parameters: { 
          user_id: "string (query parameter)" 
        },
        response: { 
          success: "true/false", 
          message: [
            {
              "_id": "image-id",
              "link": "image-url",
              "owner_id": "user-id",
              "file_id": "file-id",
              "file_name": "filename.jpg"
            }
          ]
        },
        description: "The Get All Images endpoint retrieves all images saved by a specific user. Returns an array of image metadata including file IDs, URLs, and file names."
      },
      {
        requestType: "DELETE",
        routeUrl: websiteUrl + "/deleteimage",
        requestBody: {},
        parameters: { 
          user_id: "string (query parameter)",
          file_id: "string (query parameter)" 
        },
        response: { 
          success: "true/false", 
          message: "Image Deleted / Image not found or unauthorized" 
        },
        description: "The Delete Image endpoint removes a specific image from both cloud storage and the database. Requires both user_id and file_id to ensure proper authorization."
      },
      {
        requestType: "PUT",
        routeUrl: websiteUrl + "/editpassword",
        requestBody: { 
          apikey: "your-api-key",
          new_password: "string"
        },
        parameters: { 
          user_id: "string (query parameter)" 
        },
        response: { 
          success: "true/false", 
          message: "Password Changed Successfully / Password update failed" 
        },
        description: "The Edit Password endpoint allows authenticated users to update their account password. Requires API key authentication and the new password in the request body."
      }
    ]


  const listOfEndpoints = finalEndpoints;

  return ( 
    <div className="p-8 overflow-y-scroll h-full custom-scrollbar text-left">
      {/* Platform Introduction */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">How to use our API</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Our Image Processing Software as a Service (SaaS) platform offers a comprehensive suite of tools for both developers and end-users 
          to upload, manage, and enhance images with ease. From basic image adjustments to advanced filters, our platform simplifies 
          complex image processing tasks, allowing users to access high-quality, scalable image processing without managing extensive infrastructure.
        </p>
      </section>

      {/* Key Features */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Key Features
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 max-w-3xl">
          <li><strong>Image Upload and Management:</strong> Upload and manage images with ease via a web interface or API.</li>
          <li><strong>Image Processing:</strong> Apply a range of effects and adjustments like contrast enhancement, cartoonification etc.</li>
          <li><strong>Scalability:</strong> The platform scales effortlessly to handle growing demands, ensuring consistent performance.</li>
          <li><strong>Third-Party Integration:</strong> Seamlessly integrate our API with other applications.</li>
          <li><strong>Secure Storage:</strong> Secure, reliable storage solutions for all processed images with GDPR compliance.</li>
        </ul>
      </section>

      {/* Technology Stack */}
      <section className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Technology Stack</h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Our platform leverages leading technologies to ensure reliable and efficient performance. Key technologies include:
      </p>
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 max-w-3xl">
          <li><strong>React:</strong> A powerful JavaScript library for building user interfaces.</li>
          <li><strong>FastAPI:</strong> A modern web framework for backend API development, ensuring high performance.</li>
          <li><strong>OpenCV:</strong> A widely used library for image processing tasks.</li>
          <li><strong>MongoDB:</strong> Our choice for a scalable, document-based database for storing user data.</li>
          <li><strong>Cloudinary:</strong> Cloud-based image storage and management service for reliable, scalable image hosting.</li>
      </ul>
      </section>

      {/* Usage Guide */}
      <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">API Usage Guide</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-4">
          Users can easily upload an image to the platform, select from a variety of processing options, and receive an enhanced 
          version of the image or a link to the stored image. Developers can integrate our API into their applications, enabling 
          automated image processing at scale. Choose between volatile-mode for temporary processing and persistent-mode to retain 
          links to processed images.
          </p>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg max-w-3xl">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Authentication</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
              Most endpoints require API key authentication. To obtain your API key:
            </p>
            <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1 ml-2">
              <li>Create an account using the <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">POST /auth/signup</code> endpoint</li>
              <li>Your API key will be returned in the response upon successful registration</li>
              <li>Include your API key in the request body as <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">apikey</code> for all protected endpoints</li>
            </ol>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-3">
              <strong>Note:</strong> Image processing endpoints (filters, effects) return processed images as binary data (image/jpeg), not JSON. Make sure to handle the response accordingly in your application.
            </p>
          </div>
      </section>

      {/* Transition to Endpoint Descriptions */}
      <section className="mb-8">
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl font-bold">
          Below is a detailed breakdown of each endpoint available through our API. These descriptions will guide you in 
          utilizing each image processing feature our platform provides. From uploading an image to applying filters and managing
          storage options, these endpoints offer everything needed for efficient and flexible image handling.
      </p>
      </section>
  
      {/* Flex container for Endpoint Cards */}
      <div className="flex flex-wrap gap-6 justify-left">
        {listOfEndpoints.map((endpoint, index) => (
          <EndpointCard key={index} endpoint={endpoint} />
        ))}
      </div>
    </div>
  );
  
};

export default DocumentationPage;