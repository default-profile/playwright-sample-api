import express from 'express';
import { devices, firefox } from 'playwright';

const app = express();
const port = process.env.PORT || 5000;

const browser = await firefox.launch();
const context = await browser.newContext(devices['Desktop Firefox']);

app.get('/', (req, res) => res.send('Server is up & running..'));

app.get('/test', async (req, res) => {
    const page = await context.newPage();
    await page.goto('https://example.com');
    const title = await page.title();
    await page.close();
    res.send(title);
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
