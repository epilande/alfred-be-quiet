#!/usr/bin/env osascript -l JavaScript

function run() {
  let apps = [];

  if (Application("Google Chrome").running()) {
    apps.push("Google Chrome");
  }
  if (Application("Brave Browser").running()) {
    apps.push("Brave Browser");
  }
  if (Application("Spotify").running()) {
    apps.push("Spotify");
  }
  if (Application("Music").running()) {
    apps.push("Music");
  }

  let items = apps.reduce((acc, app) => {
    acc.push({
      title: `Be Quiet - ${app}`,
      subtitle: `Pause audio/video playing in ${app}`,
      arg: app,
    });
    return acc;
  }, []);

  const allItem = {
    title: "Be Quiet - All",
    subtitle: `Pause all (${apps.join(", ")})`,
    arg: apps,
  };

  return JSON.stringify({ items: [allItem, ...items] });
}
