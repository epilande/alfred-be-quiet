#!/usr/bin/env osascript -l JavaScript
ObjC.import("stdlib");

function pause(app) {
  if (["Google Chrome", "Brave Browser"].includes(app)) {
    let urlRegex = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;
    let browser = Application(app);
    browser.includeStandardAdditions = true;
    let windowCount = browser.windows.length;
    let tabsUrl = browser.windows.tabs.url();

    for (let w = 0; w < windowCount; w++) {
      let window = browser.windows[w]();
      if (window) {
        for (let t = 0; t < tabsUrl[w].length; t++) {
          let tab = window.tabs[t]();
          let url = tabsUrl[w][t];

          if (urlRegex.test(url)) {
            tab.url = `
              javascript:(function () {
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
            `;
          }
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
