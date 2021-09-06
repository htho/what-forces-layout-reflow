import puppeteer from "puppeteer";

const consoleLogsMessage = (page: puppeteer.Page, message="", timeout=3000): Promise<void> => new Promise<void>((resolve, reject) => {
    const handle = setTimeout(() => reject(new Error(`consoleLogsMessage timed out after ${timeout}ms. The message "${message}" was never logged!`)), timeout);
    page.on("console", (ev) => {
        const text = ev.text();
        if(text !== message) return;
        clearTimeout(handle);
        resolve();
    });
});

export async function analyzeWithPuppeteer(absPathToHtml="") {
    const tracingPath = absPathToHtml + ".json";
    const screenshotPath = absPathToHtml + ".png";
    
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    
    await page.tracing.start({path: tracingPath});
    await page.goto(`file://${absPathToHtml}`);
    await consoleLogsMessage(page, "end");
    await page.tracing.stop()
    const result = await page.metrics();
    await page.screenshot({path: screenshotPath, type: "png"});
    await browser.close();

    return result;
}