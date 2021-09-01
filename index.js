const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
/**
 * @param {puppeteer.Page} page
 * @returns {Promise<void>}
 */
const consoleLogsMessage = (page, message="", timeout=1000) => new Promise((resolve, reject) => {
    const handle = setTimeout(() => reject(new Error(`consoleLogsMessage timed out after ${timeout}ms. The message "${message}" was never logged!`)), timeout);
    const url = page.url();
    page.on("console", (ev) => {
        const text = ev.text();
        // console.log(url, text);
        if(text !== message) return;
        clearTimeout(handle);
        resolve();
    });
});

async function runTestInner(relPathToHtml="tests/box-metrics/offset-left.html", expectedRecalcStyleCount=0) {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    const metricsPath = path.join(__dirname, "tests", "box-metrics", "offset-left.metrics.json");
    fs.rmSync(metricsPath, {force: true});
    // console.log(`Storing metrics at ${metricsPath}`);
    await page.tracing.start({path: metricsPath});
    await page.goto(`file://${__dirname}/${relPathToHtml}`);
    await consoleLogsMessage(page, "end");
    await page.tracing.stop()
    const result = await page.metrics();
    await browser.close();
    if(result.RecalcStyleCount !== expectedRecalcStyleCount) console.error(`!!! ${relPathToHtml} did not have the expected amount of style recalculations. Expected: ${expectedRecalcStyleCount}. Actual: ${result.RecalcStyleCount}.`);
    else console.log(`${relPathToHtml} had the expected amount of style recalculations. Expected&Actual: ${expectedRecalcStyleCount}.`);
}
async function runTest(relPathToHtml="tests/box-metrics/offset-left.html", expectedRecalcStyleCount=0) {
    try {
        await runTestInner(relPathToHtml, expectedRecalcStyleCount);
    } catch (error) {
        console.error(`!!! ${relPathToHtml} Exception thrown:`, error);
    }
}

(async () => {
    await(runTest("tests/box-metrics/offset-left.html", 3));
    await(runTest("tests/box-metrics/offset-top.html", 0));
})();