// content.js

console.log("✅ Content script loaded on LinkedIn");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getJobDescription') {
    const getJobDescription = () => {
      const jobDescriptionElement = 
        document.querySelector(".jobs-box__html-content .jobs-description-content__text") ||
        document.querySelector(".jobs-description__container .jobs-description-content") ||
        document.querySelector("[class*='jobs-description']");

      return jobDescriptionElement ? jobDescriptionElement.innerText : null;
    };

    let jobDescription = getJobDescription();

    if (jobDescription) {
      console.log("✅ Found job description:", jobDescription);
      sendResponse({ jobDescription });
    } else {
      console.log("⏳ Job description not found yet, setting up observer...");

      const observer = new MutationObserver(() => {
        jobDescription = getJobDescription();
        if (jobDescription) {
          console.log("✅ Found via observer:", jobDescription);
          observer.disconnect();
          sendResponse({ jobDescription });
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return true; // Keeps the message channel open
  }
});
