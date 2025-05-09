import { useEffect } from 'react';

const GoogleTranslate = ({ selectedLanguage }) => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    const googleTranslateElementInit = () => {
        // Ensure that the translation div exists before initializing
        const translateElement = document.querySelector('#google_translate_element');
        if (translateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en', // Specify the language for your page
              includedLanguages: 'en,es,fr,de,it', // List of languages to support
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            'google_translate_element'
          );
        } else {
          console.error('Translation element not found.');
        }
      };
      

    if (!window.google?.translate) {
      addGoogleTranslateScript();
    } else {
      googleTranslateElementInit();
    }
  }, [selectedLanguage]);  // Re-run whenever the selectedLanguage changes

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
