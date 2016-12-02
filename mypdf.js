PDFJS.workerSrc = "pdf.js"; // location of pdf.js file

PDFJS.getDocument('lm741.pdf').then(function (pdf) {
    // you can now use *pdf* here
    var totalPages = pdf.pdfInfo.numPages;

    var previewData = { title: "lm741", progress: "0", total: totalPages }; // page.title
    var previewTemplateScript = $("#preview-template").html();
    var previewTemplate = Handlebars.compile(previewTemplateScript);


    $(".handleBarsPreview").append(previewTemplate(previewData));



    // For each page in the pdf, push some information onto the pagesData array
    var pagesData = [];
    for (var i = 1; i <= totalPages; i++) {
        pagesData.push(
            { number: i, canvasid: "the-canvas".concat(i) }
        );
    }
    // once all pages are added to the data array, render the html specified via a template in index.html where the #html-template is used.
    var theTemplateScript = $("#page-template").html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $(".handleBars").append(theTemplate(pagesData));

    // once the boxes for the pages ares setup and are denoted by id=canvasID. render the page in each box.
    for (let i = 1; i <= totalPages; i++) {
        let ID = 'the-canvas'.concat(i);
        pdf.getPage(i).then(function (page) {
             showPage(page, ID);
             previewData.progress = i ;
             $(".handleBarsPreview").html(previewTemplate(previewData)); 
            });
    }
});

// these canvas IDs must exist prior to running this loop.
// This means that the handlebar boxes must be rendered prior to the content.

function showPage(page, canvasID) {
    // you can now use *page* here
    var desiredWidth = 240;
    var scale = desiredWidth / page.getViewport(1).width; //determine an appropriate scale based on desired width and doc default width
    var viewport = page.getViewport(scale);

    var canvas = document.getElementById(canvasID);
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    var renderContext = {
        canvasContext: context,
        viewport: viewport
    };
    page.render(renderContext);
}
