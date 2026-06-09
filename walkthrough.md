# Health Prediction App Walkthrough

I have successfully completed the implementation of the Health Prediction Application. Below is a walkthrough of the features and how to run it locally.

## What was built

1. **FastAPI Backend (`backend/`)**:
   - Built a robust RESTful API with endpoints to Create, Read, Update, and Delete patient records.
   - Used **SQLite** with **SQLAlchemy ORM** for persistent, zero-setup storage.
   - Added validation using **Pydantic** ensuring proper email formats, numeric blood values, and preventing future dates for DOB.
   - Integrated **Google Gemini API** (`ai_service.py`) to analyze blood parameters (Glucose, Haemoglobin, Cholesterol) and return a concise medical risk remark.

2. **React Frontend (`frontend/`)**:
   - Built a modern Single Page Application using **Vite + React**.
   - Implemented a completely custom, responsive **Vanilla CSS** design featuring dark mode, glassmorphism UI elements, and micro-animations to ensure a premium user experience.
   - Created client-side validation logic to match the backend.
   - Built an intuitive grid layout for viewing patients, including clear displays of the AI-generated health prediction remarks.

## How to Run Locally

### 1. Start the Backend
Open a terminal in the `backend` folder and run the following commands:
```bash
cd backend

# Ensure dependencies are installed (they should be already)
pip install -r requirements.txt

# Start the FastAPI server
python -m uvicorn main:app --reload --port 8000
```
*Note: Ensure you have added your Gemini API key to the `.env` file (`GEMINI_API_KEY=your_key_here`) for the AI predictions to work.*

### 2. Start the Frontend
Open a new terminal in the `frontend` folder and run:
```bash
cd frontend

# Start the Vite development server
npm run dev
```
Open the provided local URL (usually `http://localhost:5173`) in your browser to interact with the application.

> [!TIP]
> Try adding a patient with high Glucose (>120 mg/dL) or high Cholesterol (>200 mg/dL) to see how the Gemini AI models its prediction remarks!

---

## Final Delivery Steps for the Assesment

As requested in your initial prompt, you need to deliver a GitHub repository and a Demo video.

### 1. Upload to GitHub
1. Initialize a git repository in the root workspace folder.
2. Ensure you have a `.gitignore` file that ignores `node_modules/`, `__pycache__/`, `*.db`, and `.env` so you do not commit any API keys.
3. Commit and push the code to your public GitHub repository.

### 2. Record the Demo Video
Use OBS Studio or Zoom to record your screen:
1. Start the backend and frontend servers.
2. Demonstrate creating a new patient, reading the records (showing the AI remark), updating a patient, and deleting a record.
3. While recording, briefly explain:
   - **Why this stack?** (FastAPI for speed/auto-docs, React+Vite for modern UI, SQLite for easy portability).
   - **Challenges?** (e.g., structuring prompts for Gemini to ensure short, non-medical-advice remarks).

Let me know if you need any modifications to the code or help setting up the GitHub repository!
