# AI-Powered-Plant-Disease-Detection-Web-App-

# Plant Disease Detection Web Application

This is a web-based application built with React and powered by a fine-tuned GPT model to identify and explain plant diseases from leaf images. The project was developed as part of a hackathon focused on leveraging AI for sustainable agriculture.

## Overview

The application allows users to upload an image of a plant leaf and receive an AI-generated prediction about potential plant diseases. Alongside the prediction, the system provides descriptive information about the disease, symptoms, and possible treatments.

## Features

- Fine-tuned GPT model for disease classification and contextual explanations
- React-based frontend for image upload and result visualization
- Backend API for handling image processing and GPT inference
- Scalable and modular design for future expansion or deployment

## Technology Stack

**Frontend**
- React.js

**Backend**
- Python (FastAPI or Flask)

**Machine Learning**
- GPT (fine-tuned on labeled plant disease datasets)
- Optional pre-processing using TensorFlow/Keras for feature extraction

**Tools**
- OpenAI API or Hugging Face Transformers
- Axios (API calls), FileReader (image handling)



### Prerequisites

- Node.js and npm
- Python 3.8+
- OpenAI or Hugging Face API credentials

### Frontend and Backend Setup

```bash
cd frontend
npm install
npm start

cd backend
pip install -r requirements.txt
python main.py
