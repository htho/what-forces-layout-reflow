# htho/what-forces-layout-reflow

Let's automatically test [paulirish/what-forces-layout.md](https://gist.github.com/paulirish/5d52fb081b3570c81e3a).

The Idea is to setup a testcase for each of the actions described (maybe a self-contained .html file).

Puppeteer [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) claims to be able to capture a performance timeline.
performance-timelines are stored JSON-Files - therefore they can be parsed and analyzed in order to find out if the layout was invalidated.
