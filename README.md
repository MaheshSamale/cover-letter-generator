**Setup Your AI-Powered Chrome Extension Locally**

Follow these steps to install and run the Chrome extension on your local machine:  


### **Step 1: Clone or Download the Project**  
If you haven’t already, clone the repository or download the source code to your local system.  

```bash
git clone https://github.com/MaheshSamale/cover-letter-generator.git
cd cover-letter-generator
```


If you downloaded the ZIP file, extract it and navigate to the extracted folder.

---

### **Step 2: Replace the Google Gemini API Key**  
Your extension uses Google Gemini for AI-powered features.  

1. Open the project folder in any code editor (VS Code, Sublime Text, etc.).
2. Locate the `From.js` file inside the `components` folder.
3. Find the placeholder for the Google Gemini API key.
4. Replace it with your actual API key.  
   Example:

   ```javascript
   const API_KEY = "your-google-gemini-api-key";
   ```

5. Save the file.

---

### **Step 3: Install Dependencies**  
Ensure you have **Node.js** installed. If not, download and install it from [Node.js Official Website](https://nodejs.org/).  

Then, open a terminal inside your project folder and run:  

```bash
npm install
```
This will install all required dependencies.

---

### **Step 4: Build the Extension**  
Run the following command to create the production build:  

```bash
npm run build
```

This will generate a `build` folder containing the final files for your Chrome extension.

---

### **Step 5: Load the Extension in Chrome**  
Now, let’s add the extension to Chrome:  

1. Open **Google Chrome**.
2. Go to `chrome://extensions/` in the address bar.
3. Enable **Developer Mode** (toggle switch at the top right).
4. Click **Load Unpacked**.
5. Select the **build** folder generated in Step 4.
6. The extension will now be loaded and ready to use.

---

### **Step 6: Test the Extension**  
- Click on the extension icon in the Chrome toolbar.  
- Try generating a cover letter using a LinkedIn job description.  
- If any errors appear, check the console by pressing **F12** → **Console** tab.  

---

### **You're All Set! 🎉**  
Your AI-powered Chrome extension is now running locally. Let me know if you need any help! 🚀
