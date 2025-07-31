const Mustache = require("mustache");
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");

function generateAndSaveHTML(template, data, htmlFileName) {
  try {
    console.log("Generating HTML");
    const html = Mustache.render(template, data);
    const outputFile = path.join(
      __dirname,
      "../Email-Templates/HTML-Output",
      `${htmlFileName}.html`
    );
    fs.writeFileSync(outputFile, html);
    console.log(`HTML generated successfully at: ${outputFile}`);
  } catch (error) {
    console.error("Error generating HTML:", error);
  }
}

function setupWatcher(onChangeCallback) {
  console.log("Setting up file watcher with chokidar...");
  const watcher = chokidar.watch(["./*.js"], {
    ignored: /(node_modules|\.git)/,
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 300,
      pollInterval: 100,
    },
  });

  watcher
    .on("change", (path) => {
      console.log(`File ${path} has changed, regenerating HTML...`);
      onChangeCallback();
    })
    .on("error", (error) => console.error(`Watcher error: ${error}`))
    .on("ready", () =>
      console.log("Initial scan complete. Ready for changes...")
    );

  return watcher;
}

module.exports = {
  generateAndSaveHTML,
  setupWatcher,
};
