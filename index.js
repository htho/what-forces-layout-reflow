const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
/**
 * @param {puppeteer.Page} page
 * @returns {Promise<void>}
 */
const consoleLogsMessage = (page, message="", timeout=3000) => new Promise((resolve, reject) => {
    const handle = setTimeout(() => reject(new Error(`consoleLogsMessage timed out after ${timeout}ms. The message "${message}" was never logged!`)), timeout);
    const url = page.url();
    page.on("console", (ev) => {
        const text = ev.text();
        if(text !== message) return;
        clearTimeout(handle);
        resolve();
    });
});

async function runTestInner(relPathToHtml="") {
    try {
        const tracingPath = path.join(__dirname, relPathToHtml) + ".json";
        const screenshotPath = path.join(__dirname, relPathToHtml) + ".png";
        
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
        
        await page.tracing.start({path: tracingPath});
    await page.goto(`file://${__dirname}/${relPathToHtml}`);
    await consoleLogsMessage(page, "end");
    await page.tracing.stop()
    const result = await page.metrics();
        await page.screenshot({path: screenshotPath, type: "png"});
    await browser.close();
    
        return result;
    } catch (error) {
        console.error(`!!! ${relPathToHtml} Exception thrown:`, error);
    }
    return undefined;
}
async function runTest({testFile = "", expected = {RecalcStyleCount: 0, LayoutCount: 0}}) {
    const relPathToHtml = path.join("tests", testFile);
    console.log(relPathToHtml);
    const result = await runTestInner(relPathToHtml);
    if(result === undefined) return;
    if(result.RecalcStyleCount !== expected.RecalcStyleCount) console.error(`!   RecalcStyleCount: ${result.RecalcStyleCount} (expected: ${expected.RecalcStyleCount})`);
    else console.log(`    RecalcStyleCount: ${expected.RecalcStyleCount}`);
    if(result.LayoutCount !== expected.LayoutCount) console.error(`!   LayoutCount: ${result.LayoutCount} (expected: ${expected.LayoutCount})`);
    else console.log(`    LayoutCount: ${expected.LayoutCount}`);
}

(async () => {
    await(runTest("tests/box-metrics/offset-left.html", 3));
    await(runTest("tests/box-metrics/offset-top.html", 0));
})();