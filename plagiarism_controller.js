const puppeteer = require('puppeteer');

async function extractTextFromPDF(pdfPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`file:///${pdfPath}`);
    const text = await page.evaluate(() => document.body.textContent);
    await browser.close();
    return text;
}

async function extractText(file) {
    if(file.mimetype.split("/")[1] === 'pdf') {
        const text = await extractTextFromPDF(file.path);
        console.log("text extracted: ", text);

    } else {
        console.log("docuemnt npt pdf")
    }
}

export const detectPlagiarism = async (req, res) => {
    const { fileToCheck, fileToCompare } = req.files;
    const checktext = extractText(fileToCheck[0]);
    const comparetext = extractText(fileToCompare[0]);

    res.send("testing response");
}