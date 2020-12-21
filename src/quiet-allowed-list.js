#!/usr/bin/env osascript -l JavaScript
ObjC.import("stdlib");

let ALLOWED_URLS = [
  "youtube",
  "soundcloud",
  "reddit",
  ...$.getenv("urls").split(/,\s?/).filter(Boolean),
];

function pause(app) {
  if (["Google Chrome", "Brave Browser"].includes(app)) {
    let browser = Application(app);
    browser.includeStandardAdditions = true;
    let windowCount = browser.windows.length;
    let tabsUrl = browser.windows.tabs.url();

    for (let w = 0; w < windowCount; w++) {
      for (let t = 0; t < tabsUrl[w].length; t++) {
        let tab = browser.windows[w].tabs[t];
        let url = tabsUrl[w][t];

        if (ALLOWED_URLS.some((site) => url.includes(site))) {
          tab.execute({
            javascript: `
              (function () {
                let videoElements = document.getElementsByTagName("video");
                let audioElements = document.getElementsByTagName("audio");
                let soundcloudPause = document.querySelector('[title="Pause current"]');
              
                if (videoElements.length > 0) {
                  for (const element of videoElements) {
                    element.pause();
                  }
                }
                if (audioElements.length > 0) {
                  for (const element of audioElements) {
                    element.pause();
                  }
                }
                if (soundcloudPause) {
                  soundcloudPause.click();
                }
              })();
            `,
          });
        }
      }
    }
  }

  if (app === "Spotify") {
    let spotify = Application("Spotify");
    spotify.pause();
  }

  if (app === "Music") {
    let music = Application("Music");
    music.pause();
  }
}

function run(args) {
  let apps = args;

  for (const app of apps) {
    pause(app);
  }
}
