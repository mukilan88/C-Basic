const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDFForUnit(pdfFileName, topics) {
    console.log(`Starting PDF generation for ${pdfFileName}...`);
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    let combinedHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Fira+Code:wght@400;600&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="${path.join(__dirname, '../styles.css').replace(/\\/g, '/')}">
        <style>
            @page {
                size: A4 portrait;
                margin: 0;
            }
            body {
                margin: 0;
                padding: 0;
                background: #e2e8f0;
            }
            .page-break {
                page-break-after: always;
                break-after: page;
            }
            .notes-nav-bar {
                display: none !important;
            }
            .page {
                margin: 0 auto !important;
                box-shadow: none !important;
                border-radius: 0 !important;
                min-height: 297mm;
                page-break-inside: avoid;
            }
        </style>
    </head>
    <body>
    `;

    for (let i = 0; i < topics.length; i++) {
        const filePath = path.join(__dirname, '..', topics[i]);
        if (!fs.existsSync(filePath)) {
            console.warn(`File not found: ${filePath}`);
            continue;
        }
        let htmlContent = fs.readFileSync(filePath, 'utf8');

        // Extract content inside <body>
        const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        if (bodyMatch) {
            let bodyInner = bodyMatch[1];
            // Remove <script> tags
            bodyInner = bodyInner.replace(/<script[\s\S]*?<\/script>/gi, '');
            combinedHtml += `<div class="page-container">${bodyInner}</div>`;
            if (i < topics.length - 1) {
                combinedHtml += `<div class="page-break"></div>`;
            }
        }
    }

    combinedHtml += `</body></html>`;

    const tempHtmlPath = path.join(__dirname, `temp_${pdfFileName}.html`);
    fs.writeFileSync(tempHtmlPath, combinedHtml, 'utf8');

    await page.goto(`file://${tempHtmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' });

    // Remove nav bar if any dynamically injected element remains
    await page.evaluate(() => {
        const nav = document.querySelector('.notes-nav-bar');
        if (nav) nav.remove();
    });

    await page.pdf({
        path: path.join(__dirname, '..', pdfFileName),
        format: 'A4',
        printBackground: true,
        margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });

    await browser.close();
    console.log(`Successfully generated ${pdfFileName}!`);
}

async function run() {
    const unit1Files = [
        'index.html',
        'unit-1/02-compilation.html',
        'unit-1/03-interactive-script.html',
        'unit-1/04-comments.html',
        'unit-1/05-tokens.html',
        'unit-1/06-datatypes-overview.html',
        'unit-1/07-datatypes-integer.html',
        'unit-1/08-datatypes-size.html',
        'unit-1/09-variables.html',
        'unit-1/10-constants.html',
        'unit-1/11-typecasting.html',
        'unit-1/12-operators.html',
        'unit-1/13-operator-precedence.html',
        'unit-1/14-io-functions.html',
        'unit-1/15-formatted-io.html',
        'unit-1/16-errors-debugging.html'
    ];

    const unit2Files = [
        'unit-2/unit2.html',
        'unit-2/02-Decision-Making-(switch-Statement).html',
        'unit-2/03-Looping-(while-&-for-Loops).html',
        'unit-2/04-Looping-(do-while-&-Nested-Loops).html',
        'unit-2/05-Jump-Statements-(break-&-continue).html',
        'unit-2/06-Function-Basics-(Declaration-Definition-Calling-&-Return-Types).html',
        'unit-2/06-B-The-4-Function-Categories.html',
        'unit-2/07-Parameter-Passing-(Call-by-Value).html',
        'unit-2/07-B-Parameter-Passing-(Call-by-Reference).html',
        'unit-2/08-Recursion.html',
        'unit-2/09-Scope-and-Lifetime-of-Variables.html',
        'unit-2/10-Header-Files.html'
    ];

    const unit3Files = [
        'unit-3/unit3.html',
        'unit-3/02-2D-Array.html',
        'unit-3/03-String.html',
        'unit-3/04-Built-in-String-Functions.html',
        'unit-3/05-pointer.html',
        'unit-3/06-Pointer-Arithmetic.html',
        'unit-3/07-Function-Pointers.html',
        'unit-3/08-Dynamic-Memory-Allocation.html',
        'unit-3/09-Structures.html',
        'unit-3/10-Unions.html',
        'unit-3/11-Array-of-Structures.html',
        'unit-3/12-File-Operations.html',
        'unit-3/13-Text-and-Binary-Files.html',
        'unit-3/14-File-Pointers.html',
        'unit-3/15-Error-Handling.html',
        'unit-3/16-Standard-Libraries.html'
    ];

    await generatePDFForUnit('C-Programming-Notes-Unit1-Complete.pdf', unit1Files);
    await generatePDFForUnit('C-Programming-Notes-Unit2-Complete.pdf', unit2Files);
    await generatePDFForUnit('C-Programming-Notes-Unit3-Complete.pdf', unit3Files);
}

run().catch(console.error);
