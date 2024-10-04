const fs = require('fs');
const pdf = require('pdf-parse');

async function extractTextFromPDF(filepath) {
    const databuffer = fs.readFileSync(filepath);
    const data = await pdf(databuffer);
    return data.text;
}

async function extractText(file) {
    if (file.mimetype.split("/")[1] === 'pdf') {
        const text = await extractTextFromPDF(file.path);
        return text;
    } else return null;
}

function jaccardSimilarity(string1, string2) {
    const set1 = new Set(string1.split(' '));
    const set2 = new Set(string2.split(' '));
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);

    return {
        score: (intersection.size / union.size) * 100,
        similar_sections: [...intersection]
    };
}

export const detectPlagiarism = async (req, res) => {
    try {
        const { fileToCheck, fileToCompare } = req.files;
        if (!fileToCheck) {
            res.send({ error: true, error_message: "Attach file to check." });
        }
        if (!fileToCompare) {
            res.send({ error: true, error_message: "Attach file to compare." });
        }
        const checktext = await extractText(fileToCheck[0]);
        const comparetext = await extractText(fileToCompare[0]);

        if (checktext  === null || comparetext === null) {
            res.send({ error: true, error_message: "something went wrong" });
        }

        const { similar_sections, score } = jaccardSimilarity(checktext, comparetext);
        res.send({ similarity_percent: score, similar_sections });
    } catch (error) {
        res.send({ error: true, error_message: "Something went wrong!" });
    }
}