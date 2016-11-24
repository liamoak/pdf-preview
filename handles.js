
$(function  () {
    var pagesData = [
        {name:"Page1", imgsrc:"data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" },
        {name:"Page2", imgsrc:"data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" },
        {name:"Page3", imgsrc:"data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" },
        {name:"Page4", imgsrc:"data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" },
        {name:"Page5", imgsrc:"data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" }, 
        ];
    var theTemplateScript = $("#page-template").html();
    var theTemplate = Handlebars.compile (theTemplateScript);
    $(".handleBars").append (theTemplate(pagesData));
});