PDFJS.workerSrc = "pdf.js"; // location of pdf.js file

PDFJS.getDocument('lm741.pdf').then(function (pdf) {
    // you can now use *pdf* here
    var totalPages = pdf.pdfInfo.numPages;

    var page1Data = { title: "lm741" }; // page.title
    var page1TemplateScript = $("#page1-template").html();
    var page1Template = Handlebars.compile(page1TemplateScript);
    $(".handleBarsPage1").append(page1Template(page1Data));



    // For each page in the pdf, push some information onto the pagesData array
    var pagesData = [];
    for (var i = 1; i <= totalPages; i++) {
        pagesData.push(
            { number: i.toString(), canvasid: "the-canvas".concat(i.toString()) }
        );
    }
    // once all pages are added to the data array, render the html specified via a template in index.html where the #html-template is used.
    var theTemplateScript = $("#page-template").html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $(".handleBars").append(theTemplate(pagesData));

    // once the boxes for the pages ares setup and are denoted by id=canvasID. render the page in each box.
    for (var i = 1; i <= totalPages; i++) {
        let ID = 'the-canvas'.concat(i.toString());
        pdf.getPage(i).then(function (page) { showPage(page, ID) });
    }
});

// these canvas IDs must exist prior to running this loop.
// This means that the handlebar boxes must be rendered prior to the content.

function showPage(page, canvasID) {
    // you can now use *page* here
    // var scale = 1.5;
    // var viewport = page.getViewport(scale);
    var desiredWidth = 240;
    var viewport = page.getViewport(1);
    var scale = desiredWidth / viewport.width;
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
