PDFJS.workerSrc = "pdf.js";

PDFJS.getDocument('lm741.pdf').then(function (pdf) {
    // you can now use *pdf* here
    console.log(pdf.pdfInfo.numPages); // thats the number of pages
    pdf.getPage(1).then(function (page) {
        // you can now use *page* here
       // var scale = 1.5;
       // var viewport = page.getViewport(scale);
       var desiredWidth = 240;
       var viewport = page.getViewport(1);
       var scale = desiredWidth / viewport.width;
       var viewport = page.getViewport(scale);

        var canvas = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
    });
});
