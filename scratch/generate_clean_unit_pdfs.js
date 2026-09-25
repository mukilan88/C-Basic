const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
const fs = require('fs');

async function compileUnitToPDF(pdfFileName, topicFiles) {
    console.log(`Generating exact notebook PDF for ${pdfFileName}...`);
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const mergedPdf = await PDFDocument.create();

    for (let i = 0; i < topicFiles.length; i++) {
        const relativePath = topicFiles[i];
        const fullPath = path.join(__dirname, '..', relativePath);
        
        if (!fs.existsSync(fullPath)) {
            console.warn(`File missing: ${fullPath}`);
            continue;
        }

        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

        // Navigate directly to HTML page
        await page.goto(`file://${fullPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' });

        // Strip navigation bar for clean print
        await page.evaluate(() => {
            const nav = document.querySelector('.notes-nav-bar');
            if (nav) nav.remove();
            
            // Normalize page styling for printing
            const pageDiv = document.querySelector('.page');
            if (pageDiv) {
                pageDiv.style.margin = '0 auto';
                pageDiv.style.boxShadow = 'none';
                pageDiv.style.borderRadius = '0';
            }
        });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
        });

        await page.close();

        const singlePagePdf = await PDFDocument.load(pdfBuffer);
        const copiedPages = await mergedPdf.copyPages(singlePagePdf, singlePagePdf.getPageIndices());
        copiedPages.forEach(p => mergedPdf.addPage(p));
    }

    await browser.close();

    const finalPdfBytes = await mergedPdf.save();
    const outputPath = path.join(__dirname, '..', pdfFileName);
    fs.writeFileSync(outputPath, finalPdfBytes);
    console.log(`Successfully generated clean PDF: ${pdfFileName} (${(finalPdfBytes.length / 1024).toFixed(1)} KB)!`);
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

    await compileUnitToPDF('C-Programming-Notes-Unit1-Complete.pdf', unit1Files);
    await compileUnitToPDF('C-Programming-Notes-Unit2-Complete.pdf', unit2Files);
    await compileUnitToPDF('C-Programming-Notes-Unit3-Complete.pdf', unit3Files);
}

run().catch(console.error);
