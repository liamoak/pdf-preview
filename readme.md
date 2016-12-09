Bootstrap template project with jquery, bootstrap, Handlebars and PDF.js

serve up on a http server.


This Index.html is based out of a bootstrap template.


A run button has been added to trigger the loading of the pdf.


If the browser is unsupported, a "browser unsupported message" is rendered instead of the pdf.
If the browser is unsupported, pdf.js is not loaded into the page as a script.

If the browser is supported pdfjs is loaded, and runPDFPreview is called.


All pdf-js content is contained within the pdf-preview div.
Within this div are two divisions, one for the doc preview showing doc name and page count, the other shows the page previews.

There are two handlebar templates, one for the doc preview, and one for the pages preview.


First the doc preview is rendered, then handlebars makes boxes for each page in the pdf.

Once the boxes are rendered and contain canvases, pdfjs loads the pages one by and fills each canvas.

the ShowPage function determines the layout and scale of the pdf pages. You can change this scale to have greater or less resolution in the previews.
The width is currently controlled by this scale, as well as the width in the main.css.



Dependencies


There are a few dependencies provided by the bootstrap template,  within the assets folder. I believe these add support for windows8 IE.

The rest of the assets are available via cdn.


For pdfjs, i have not yet found a way to include that file from an external source. There maybe some minification that can be done to reduce the size of this file.
I am still looking to find a solution to this, to allow an external reference for this file.

The plan is to package mypdfjs file into a proper jquery plugin, which I will complete at a later date. This pdf-preview is functional, but still can be greatly improved.

