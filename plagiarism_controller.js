const fs = require('fs');
const pdf = require('pdf-parse');
const WordExtractor = require("word-extractor");

async function extractTextFromPDF(filepath) {
    const databuffer = fs.readFileSync(filepath);
    const data = await pdf(databuffer);
    return data.text;
}

async function extractTextFromWord(filepath) {
    const extractor = new WordExtractor();
    const extracted = extractor.extract(filepath);
    let text = extracted.then(function (doc) {
        return doc.getBody();
    });
    return text;
}

async function extractText(file) {
    if (file.mimetype.split("/")[1] === 'pdf') {
        const text = await extractTextFromPDF(file.path);
        return text;
    } else {
        const text = extractTextFromWord(file.path)
        return text;
    }
}

function jaccardSimilarity(string1, string2) {
    const set1 = new Set(string1.split(' '));
    const set2 = new Set(string2.split(' '));
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);

    return (intersection.size / union.size) * 100;
}

export const detectPlagiarism = async (req, res) => {
    try {

        const { fileToCheck, fileToCompare } = req.files;
        if (!fileToCheck) {
            res.status(500).json({ error: true, error_message: "Attach file to check." });
        }
        if (!fileToCompare) {
            res.status(500).json({ error: true, error_message: "Attach file to compare." });
        }
        const checktext = await extractText(fileToCheck[0]);
        const comparetext = await extractText(fileToCompare[0]);

        const similarity = jaccardSimilarity(checktext, comparetext);
        res.send({ similarity_percent: similarity });
    } catch (error) {
        res.status(500).json({ error: true, error_message: "Something went wrong!" });
    }
}