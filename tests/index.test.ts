import { analyzeWithPuppeteer } from "../tools/puppeteerInteraction";

const data: {file: string, expectedResult: {RecalcStyleCount: number, LayoutCount: number}}[] = [
    {file: "/box-metrics/offset-left.html", expectedResult: {RecalcStyleCount: 3, LayoutCount: 3}},
    {file: "/box-metrics/offset-top.html", expectedResult: {RecalcStyleCount: 3, LayoutCount: 3}},
    {file: "/dom-manipulation/insert-visible-element.html", expectedResult: {RecalcStyleCount: 2, LayoutCount: 2}},
    {file: "/dom-manipulation/insert-display-none-element.html", expectedResult: {RecalcStyleCount: 2, LayoutCount: 1}},
    {file: "/dom-manipulation/insert-visibility-hidden-element.html", expectedResult: {RecalcStyleCount: 2, LayoutCount: 2}},
]
test.each(data)("$file", async ({file, expectedResult}) => {
    await expect(analyzeWithPuppeteer(__dirname + file)).resolves.toMatchObject(expectedResult);
});