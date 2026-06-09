import os
import google.generativeai as genai

def predict_health(glucose: float, haemoglobin: float, cholesterol: float) -> str:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return "Prediction unavailable: Gemini API key not configured."
    
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-flash-latest')
    
    prompt = f"""
    As an AI assistant, briefly predict possible health conditions or risks based on the following blood test results. 
    Provide a concise 1-2 sentence remark.
    
    Glucose: {glucose} mg/dL
    Haemoglobin: {haemoglobin} g/dL
    Cholesterol: {cholesterol} mg/dL
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Prediction failed: {str(e)}"
