import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get and validate BACKEND_URL
let BACKEND_URL = import.meta.env.VITE_APP_FOO || 'http://localhost:8000/';

// Ensure BACKEND_URL is a valid string and ends with /
if (!BACKEND_URL || typeof BACKEND_URL !== 'string') {
  console.warn('VITE_APP_FOO is not set or invalid. Using default: http://localhost:8000/');
  BACKEND_URL = 'http://localhost:8000/';
}

// Trim and ensure it ends with a slash
BACKEND_URL = BACKEND_URL.trim();
if (!BACKEND_URL.endsWith('/')) {
  BACKEND_URL += '/';
}

// Validate URL format
try {
  new URL(BACKEND_URL);
} catch (e) {
  console.error('Invalid BACKEND_URL format:', BACKEND_URL);
  BACKEND_URL = 'http://localhost:8000/';
}

console.log('Backend URL configured:', BACKEND_URL);

// Helper function to extract error message from error objects
const getErrorMessage = (error) => {
  if (typeof error === 'string') {
    return error;
  }
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }
  return 'An unexpected error occurred';
};

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    if (!BACKEND_URL) {
      return thunkAPI.rejectWithValue('Backend URL is not configured. Please check your .env file.');
    }
    const response = await axios.post(`${BACKEND_URL}auth/signin`, credentials);
    console.log(response.data);
    if(response.data.success === 'false') {
      return thunkAPI.rejectWithValue(response.data.message || 'Login failed');
    }

    return response.data;
    
  } catch (error) {
    console.log(error);
    const errorMessage = getErrorMessage(error);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});


export const signup = createAsyncThunk('auth/signup', async (credentials, thunkAPI) => {
  try {
    if (!BACKEND_URL) {
      return thunkAPI.rejectWithValue('Backend URL is not configured. Please check your .env file.');
    }
    const response = await axios.post(`${BACKEND_URL}auth/signup`, credentials);
    console.log(response.data);
    if (response.data.success === 'false') {
      return thunkAPI.rejectWithValue(response.data.message || 'Signup failed');
    }
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = getErrorMessage(error);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const grainyEffect = createAsyncThunk(
    'file/uploadAndProcessGrainyEffect',
    async ({file,apiKey}, thunkAPI) => {
      if (!BACKEND_URL) {
        return thunkAPI.rejectWithValue('Backend URL is not configured. Please check your .env file.');
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
      
  
      try {
        const response = await fetch(`${BACKEND_URL}grainyeffect`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
          return blob;
       
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
      }
    }
  );

  export const warmFilter = createAsyncThunk(
    'file/uploadAndProcessPencilSketch',
    async ({file,apiKey}, thunkAPI) => {
      if (!BACKEND_URL) {
        return thunkAPI.rejectWithValue('Backend URL is not configured. Please check your .env file.');
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
      try {
        const response = await fetch(`${BACKEND_URL}warmfilter`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
        return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
      }
    }
  );

  
  export const coolFilter = createAsyncThunk(
    'file/uploadAndProcessPencilSketch',
    async ({file,apiKey}, thunkAPI) => {
      if (!BACKEND_URL) {
        return thunkAPI.rejectWithValue('Backend URL is not configured. Please check your .env file.');
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
  
      console.log(formData)
      try {
        
        const response = await fetch(`${BACKEND_URL}coolfilter`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
        return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
      }
    }
  );

  export const pencilSketch = createAsyncThunk(
    'file/uploadAndProcessPencilSketch',
    async ({file,apiKey}, thunkAPI) => {
      if (!BACKEND_URL) {
        return thunkAPI.rejectWithValue('Backend URL is not configured. Please check your .env file.');
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
  
      try {
        const response = await fetch(`${BACKEND_URL}pencilsketch`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
          return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
      }
    }
  );


  export const cartoonify = createAsyncThunk(
    'file/uploadAndProcessCartoonify',
    async ({file,apiKey}, thunkAPI) => {
      if (!BACKEND_URL) {
        return thunkAPI.rejectWithValue('Backend URL is not configured. Please check your .env file.');
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
  
      try {
        const response = await fetch(`${BACKEND_URL}cartoonify`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
        return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
      }
    }
  );

 export const contrastEnhancement = createAsyncThunk(
    'file/uploadAndProcessContrastEnhancement',
    async ({file,apiKey}, thunkAPI) => {
      if (!BACKEND_URL) {
        return thunkAPI.rejectWithValue('Backend URL is not configured. Please check your .env file.');
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
  
      try {
        const response = await fetch(`${BACKEND_URL}contrastenhancement`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
          return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
      }
    }
  );

export const grayScale = createAsyncThunk(
    'file/uploadAndProcessGrayScale',
    async ({file,apiKey}, thunkAPI) => {
      if (!BACKEND_URL) {
        return thunkAPI.rejectWithValue('Backend URL is not configured. Please check your .env file.');
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
  
      try {
        const response = await fetch(`${BACKEND_URL}grayscale`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
          return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
      }
    }
  );

export const hdrEffect = createAsyncThunk(
    'file/uploadAndProcessHDREffect',
    async ({file,apiKey}, thunkAPI) => {
      if (!BACKEND_URL) {
        return thunkAPI.rejectWithValue('Backend URL is not configured. Please check your .env file.');
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
  
      try {
        const response = await fetch(`${BACKEND_URL}hdreffect`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
          return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
      }
    }
  );

  export const compress = createAsyncThunk(
    'file/uploadAndProcessCompress',
    async ({file,apiKey}, thunkAPI) => {
      if (!BACKEND_URL) {
        return thunkAPI.rejectWithValue('Backend URL is not configured. Please check your .env file.');
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
  
      try {
        const response = await fetch(`${BACKEND_URL}compression`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
          return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
      }
    }
  );
  
  
  export const gothamEffect = createAsyncThunk(
    'file/uploadAndProcessGothamEffect',
    async ({ file, apiKey }, thunkAPI) => {
      if (!BACKEND_URL) {
        return thunkAPI.rejectWithValue('Backend URL is not configured. Please check your .env file.');
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
  
      
      try {
        const response = await fetch(`${BACKEND_URL}gotham`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
          return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
      }
    }
  );

  export const sepiaEffect = createAsyncThunk(
    'file/uploadAndProcessSepiaEffect',
    async ({file,apiKey}, thunkAPI) => {
      if (!BACKEND_URL) {
        return thunkAPI.rejectWithValue('Backend URL is not configured. Please check your .env file.');
      }
      console.log(file , apiKey )
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
  
      try {
        const response = await fetch(`${BACKEND_URL}sepia`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
          return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
      }
    }
  );

  export const saveImage = createAsyncThunk(
    'file/saveImage',
    async ({ userId, file, apiKey }, thunkAPI) => {
      console.log(userId, file, apiKey);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
      formData.append('user_id', userId);
  
      try {
        if (!BACKEND_URL) {
          return thunkAPI.rejectWithValue('Backend URL is not configured. Please check your .env file.');
        }
        const response = await axios.post(`${BACKEND_URL}savefile?user_id=${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response);
  
        if (response.status === 200) {
          return response.data.access_url;
        } else {
          return thunkAPI.rejectWithValue('Failed to save the file');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
      }
    }
  );

  export const getImages = createAsyncThunk(
    'file/getImages',
    async ({userId,apiKey}, thunkAPI) => {
      try {
        if (!BACKEND_URL) {
          return thunkAPI.rejectWithValue('Backend URL is not configured. Please check your .env file.');
        }
        const response = await axios.get(`${BACKEND_URL}getallimages?user_id=${userId}`);
        console.log(response);
  
        if (response.data.message.length !== 0) {
          return response.data.message;
        } else {
          return thunkAPI.rejectWithValue('Failed to get images');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
      }
    }
  );

  export const deleteImage = createAsyncThunk(
    'file/deleteImage',
    async ({ userId, file_id }, thunkAPI) => {
      try {
        if (!BACKEND_URL) {
          return thunkAPI.rejectWithValue('Backend URL is not configured. Please check your .env file.');
        }
        const response = await axios.delete(`${BACKEND_URL}deleteimage?user_id=${userId}&file_id=${file_id}`);
        console.log(response);
  
        if (response.status === 200) {
          return file_id;
        } else {
          return thunkAPI.rejectWithValue('Failed to delete the file');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
      }
    }
  );

  export const editpassword = createAsyncThunk(
    'user/editPassword',
    async ({ userId, password, apiKey }, thunkAPI) => {
      const formData = new FormData();
      formData.append('apikey', apiKey);
      formData.append('new_password', password);
      try {
        if (!BACKEND_URL) {
          return thunkAPI.rejectWithValue('Backend URL is not configured. Please check your .env file.');
        }
        const response = await axios.put(
          `${BACKEND_URL}editpassword?user_id=${userId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        
        );
        console.log(response);
  
        if (response.data.success === "true") {
          return response.data;
        } else {
          return thunkAPI.rejectWithValue('Failed to update the password');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
      }
    }
  );
  