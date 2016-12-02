function runPDFPreview(FilePath) {

PDFJS.workerSrc = "pdf.js"; // location of pdf.js file

PDFJS.getDocument(FilePath).then(function (pdf) {
    // once we get document you can then use *pdf* here to pull values.
    var totalPages = pdf.pdfInfo.numPages;

    // This data is used by the pdf preview and load progress bar
    var previewData = { title: FilePath.toString(), progress: "0", total: totalPages };

    // For each page in the pdf, push some information onto the pagesData array. This will be used in the per page preview
    var pagesData = [];
    for (var i = 1; i <= totalPages; i++) {
        pagesData.push( { number: i, canvasid: "the-canvas".concat(i) } );
    }

    // These 3 lines put the handle-bar data into a template and ender the html specified via a template in index.html where the #html-template is used.
    var previewTemplateScript = $("#preview-template").html();
    var previewTemplate = Handlebars.compile(previewTemplateScript);
    $(".handleBarsPreview").append(previewTemplate(previewData));

    // Once the initial prview is rendered, its time to render a box to display each page in the pdf
    // the template renders a box for EACH item in the PagesData array, and a "canvas" within each box to display the pdf.
    var theTemplateScript = $("#page-template").html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $(".handleBars").append(theTemplate(pagesData));

    // once the boxes for the pages ares setup we can fill the canvas within with PDF data.
    // The Canvas is denoted by  id=canvasID. This loop will get each page in the pdf, and render that page in the relevant canvas
    // Once a page is rendered, the progress is set to the current loaded page, and this information is updated in the html.
    for (let i = 1; i <= totalPages; i++) {
        let ID = 'the-canvas'.concat(i);
        pdf.getPage(i).then(function (page) {
             showPage(page, ID);
             previewData.progress = i ;
             $(".handleBarsPreview").html(previewTemplate(previewData)); 
            });
    }
});

// these canvas IDs must exist prior to running this loop. This is why the showPages function runs once the templates are rendered.
// This means that the handlebar boxes must be rendered prior to the content.

function showPage(page, canvasID) {
    // you can now use *page* here
    //var desiredWidth = window.outerWidth/6;
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

}
