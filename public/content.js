chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getJobDescription') {
    // Function to attempt finding the job description
    const getJobDescription = () => {
      const jobDescriptionElement = 
        document.querySelector(".jobs-box__html-content .jobs-description-content__text") ||
        document.querySelector(".jobs-description__container .jobs-description-content") ||
        document.querySelector("[class*='jobs-description']");

      return jobDescriptionElement ? jobDescriptionElement.innerText : null;
    };

    // Attempt to get the job description immediately
    let jobDescription = getJobDescription();

    if (jobDescription) {
      console.log("Job description found immediately:", jobDescription);
      sendResponse({ jobDescription });
    } else {
      console.log("Job description not found immediately. Setting up observer...");

      // If not found, observe for changes in the DOM
      const observer = new MutationObserver(() => {
        jobDescription = getJobDescription();
        if (jobDescription) {
          console.log("Job description found by observer:", jobDescription);
          observer.disconnect(); // Stop observing once the job description is found
          sendResponse({ jobDescription });
        }
      });

      // Start observing document body for changes
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    // Return true to indicate async response
    return true;
  }
});
