# htho/what-forces-layout-reflow

Let's automatically test [paulirish/what-forces-layout.md](https://gist.github.com/paulirish/5d52fb081b3570c81e3a).

## State
If the build fails this either means something is wrong or some tests don't yield the expected results.
[![Build Status](https://dev.azure.com/htho/what-forces-layout-reflow/_apis/build/status/htho.what-forces-layout-reflow?branchName=main)](https://dev.azure.com/htho/what-forces-layout-reflow/_build/latest?definitionId=1&branchName=main)

This is a work-in-progress feel free to add more tests.

## Idea
The Idea is to setup a testcase for each of the actions described (preferably a self-contained .html file).
Puppeteer [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) opens runs the tests and reports the amount of style recalculations.
Furthermore performance-timelines are stored as JSON-Files - therefore they can be parsed and analyzed (Chrome Debugger).
