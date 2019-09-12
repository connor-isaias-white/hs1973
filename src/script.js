data = $.ajax({
    type: "GET",
    url: "/data",
    async: false
}).responseJSON
text = ""
for (var i = 0; i < data.length; i++) {
    text += "<h2>"+data[i]["title"]+"</h2>"
    text += "<p>by: "+data[i]["author"]+"</p>\n"
    text += "<img src='/"+data[i]["thumbnail"]+"' alt='thumbnail\n' height='150' width='150'><br />"
    text += "Download: <a href='/"+data[i]["fileUploaded"]+"' download> "+data[i]["fileUploaded"]+"</a>"
}
$(".tables").html(text);
