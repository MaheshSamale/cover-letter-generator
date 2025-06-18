# 🚀 HireWrite – AI-Powered Resume & Cover Letter Assistant

An intelligent Chrome/Edge browser extension that **analyzes your resume, evaluates job fit, and generates personalized cover letters** — all in one seamless workflow.

Designed for job seekers who want faster, smarter, and more targeted applications — right from their browser.

---

## 📌 How It Works

1️⃣ **Auto-Scrape Job Descriptions**  
→ Extract job descriptions directly from **LinkedIn** and **Naukri** with a single click.

2️⃣ **Drag-and-Drop Resume Upload**  
→ Simply drop your resume into the extension — no formatting required.

3️⃣ **Get Resume Match Score**  
→ Instantly analyze how well your resume aligns with the job description, including a **“Fit / Not Fit”** decision.

4️⃣ **Receive Resume Improvement Suggestions**  
→ Get actionable AI-powered feedback on how to improve your resume for better results.

5️⃣ **Generate a Tailored Cover Letter**  
→ Automatically generate a personalized, role-specific cover letter using your resume and the scraped job description.

6️⃣ **Copy & Apply**  
→ Copy your results and apply to jobs — quickly, confidently, and without switching tabs.

---

## ✨ Features

✅ One-click **job scraping** from LinkedIn & Naukri  
✅ **Resume match scoring** and AI-powered feedback  
✅ **Cover letter generation** tailored to each role  
✅ **Drag-and-drop resume upload**  
✅ Seamless experience inside your browser  
✅ Supports **Chrome and Edge**

---

## 🔮 Future Work

🚀 Add **tone customization** (formal, persuasive, casual, etc.)  
🚀 Add **multi-language support** for international users  
🚀 Save and track applications directly within the extension  
🚀 Cover letter **template gallery** for different industries  
🚀 Improved **resume parsing** and keyword detection

---


## **📸 Demo Screenshots**  

### **1️⃣ Extension UI**   
<img width="1440" alt="Screenshot 2025-03-01 at 3 01 31 PM" src="https://github.com/user-attachments/assets/df236cd6-c889-4d78-a252-ff32daffb6dd" />

### **2️⃣ Cover Letter Generation in Action**  
<img width="1440" alt="Screenshot 2025-03-01 at 3 01 55 PM" src="https://github.com/user-attachments/assets/ebb2983e-8b56-4dbc-8f2d-b6fa982afc0d" />
  

---

## **📥 Installation & Setup**  

Follow these steps to **install and run the Chrome extension locally** on your computer.  

---

### **1️⃣ Clone the Repository**  

First, download the project files to your local machine using **Git**:  

#### **Using Git (Recommended)**  
Open a terminal or command prompt and run:  

```bash
git clone https://github.com/MaheshSamale/cover-letter-generator.git
cd cover-letter-generator
```

This will **download** the latest code from GitHub and move into the project directory.  

#### **Alternative: Download ZIP (If you don’t have Git)**  
1. Go to the **[GitHub Repo](https://github.com/MaheshSamale/cover-letter-generator)**.  
2. Click the **“Code”** button → **Download ZIP**.  
3. Extract the ZIP file on your computer.  
4. Open a terminal and navigate to the extracted folder:  

   ```bash
   cd path/to/extracted-folder
   ```

---

### **2️⃣ Replace Your Google Gemini API Key**  

Since the extension uses **Google Gemini API**, you need to add your own API key.  

#### **Steps to Get a Google Gemini API Key**  
1. Go to the **[Google Gemini API Console](https://ai.google.dev/)**.  
2. Sign in with your **Google account**.  
3. Click on **“Get API Key”** and copy the key.  

#### **Update the API Key in Code**  
1. Open the **`src/Form.js`** file in a text editor (**VS Code**, **Sublime Text**, or **Notepad++**).  
2. Find the line where the API key is defined:  

   ```javascript
   const API_KEY = "your-google-gemini-api-key";
   ```

3. Replace `"your-google-gemini-api-key"` with **your actual API key**.  
4. **Save** the file.  

---

### **3️⃣ Install Dependencies**  

Ensure that you have **Node.js** installed. If not, download it from:  
➡️ **[Node.js Official Website](https://nodejs.org/)**  

To check if Node.js is installed, run:  

```bash
node -v
npm -v
```

If both commands return version numbers, you’re good to go!  

Now, install the required dependencies:  

```bash
npm install
```

This will download and install all necessary **packages and libraries** required for the extension to work.  

---

### **4️⃣ Build the Chrome Extension**  

Once dependencies are installed, run the following command to build the project:  

```bash
npm run build
```

This will create a **build** folder containing the final extension files.  

---

### **5️⃣ Load the Extension in Chrome**  

Now, let’s add the extension to Google Chrome:  

1️⃣ **Open Google Chrome**.  
2️⃣ In the address bar, go to:  
   ```text
   chrome://extensions/
   ```  
3️⃣ **Enable Developer Mode** (toggle switch at the top right).  
4️⃣ Click on **“Load Unpacked”**.  
5️⃣ Select the **`build`** folder inside your project.  
6️⃣ The extension will now be loaded and ready to use! 🎉  

---

### **6️⃣ Test the Extension**  

- Click on the **extension icon** in the Chrome toolbar.  
- Try **generating a cover letter** using a **LinkedIn job description**.  
- If any errors appear, check the **console logs**:  
  - Press **F12** → Go to the **Console** tab.  

---

### **✅ Done! Your Extension is Ready to Use! 🚀**  

You can now start generating **AI-powered cover letters effortlessly**.  

### **⭐ Star this repo if you find it useful!** 🚀
