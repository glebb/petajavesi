
function fetchData() {
    $.getJSON('./uutiset.json', function(data) {
        var items = [];
        $.each(data['items'], function(key, item) {
            items.push('<li><a href="' + item['link'] + '">' + item['title'] + '</a></li>');
        });
        printData(items);
    });
    $.getJSON('./uutiset2.json', function(data) {
        var items = [];

        $.each(data['items'], function(key, item) {
            items.push('<li><a href="' + item['link'] + '">' + item['title'] + '</a></li>');
        });
        printData(items);
    });

    $("#tiedotteet")
        .append("<ul></ul>");
    $.ajax({
        type: "GET",
        url: "./tiedotteet.rss",
        dataType: "xml",
        success: function(xml) {
            $(xml)
                .find('item')
                .each(function() {
                var title = $(this)
                    .find('title')
                    .text();
                var link = $(this)
                    .find('link')
                    .text();
                $("<li></li>")
                    .html('<a href="' + link + '">' + title + '</a>')
                    .appendTo("#tiedotteet ul");
            });
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    });

};

function printData(items) {
    $('<ul/>', {
        'class': 'uutiset',
        html: items.join('')
    }).appendTo('div#uutiset');
}
