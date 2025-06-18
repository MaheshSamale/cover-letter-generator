chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getJobDescription') {

    const getJobDescription = () => {
      // LinkedIn
      const linkedInJD =
        document.querySelector(".jobs-box__html-content .jobs-description-content__text") ||
        document.querySelector(".jobs-description__container .jobs-description-content") ||
        document.querySelector("[class*='jobs-description']");

      if (linkedInJD) {
        return linkedInJD.innerText.trim();
      }

      // Naukri
      const naukriSection = document.querySelector("section.styles_job-desc-container__txpYf");
      if (naukriSection) {
        const sectionClone = naukriSection.cloneNode(true);

        // Remove unwanted elements
        const removeSelectors = [
          ".styles_JDC__footer__ZJnPe",       // Share links
          ".styles_JDC__match-score__VnjLL" ,
          ".styles_key-skill__GIPn_"  // Highlights
        ];
        removeSelectors.forEach(selector => {
          sectionClone.querySelectorAll(selector).forEach(el => el.remove());
        });

        // Replace <br> with newlines
        sectionClone.querySelectorAll("br").forEach(br => {
          br.replaceWith(document.createTextNode("\n"));
        });

        // Prepend newlines to labels/headings
        sectionClone.querySelectorAll("h1,h2,h3,h4,h5,h6,label,.styles_heading__veHpg").forEach(el => {
          el.innerHTML = "\n\n" + el.innerHTML.trim();
        });

        // Format list items with bullets
        sectionClone.querySelectorAll("li").forEach(el => {
          el.innerHTML = "- " + el.innerHTML.trim();
        });

        // Clean text
        let cleanedText = sectionClone.innerText;

        // Replace multiple newlines with just two
        cleanedText = cleanedText.replace(/\n{3,}/g, '\n\n').trim();

        return cleanedText;
      }

      return null;
    };

    let jobDescription = getJobDescription();

    if (jobDescription) {
      console.log("✅ Job description found immediately.");
      sendResponse({ jobDescription });
    } else {
      console.log("⏳ Waiting for job description...");

      const observer = new MutationObserver(() => {
        jobDescription = getJobDescription();
        if (jobDescription) {
          console.log("✅ Job description found via observer.");
          observer.disconnect();
          sendResponse({ jobDescription });
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return true;
  }
 const panel = document.createElement('div');
panel.style.position = 'fixed';
panel.style.top = '0';
panel.style.right = '0';
panel.style.width = '400px';
panel.style.height = '598px';
panel.style.backgroundColor = 'white';
panel.style.zIndex = '9999';
panel.style.borderRadius = '11.5px 0 0 11.5px';
panel.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
panel.innerHTML = '<div id="my-extension-root"></div>';
document.body.appendChild(panel);
// You can now mount your React app here


});
