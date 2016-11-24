$(function  () {
    var shoesData = [{name:"Nike", price:199.00 }, {name:"Loafers", price:59.00 }, {name:"Wing Tip", price:259.00 }];
    var theTemplateScript = $("#shoe-template").html();
    var theTemplate = Handlebars.compile (theTemplateScript);
    $(".shoesNav").append (theTemplate(shoesData));
});