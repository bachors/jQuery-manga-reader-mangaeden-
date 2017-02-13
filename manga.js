/******************************************************
* #### jQuery manga reader (mangaeden) v01 ####
* Coded by Ican Bachors 2014.
* http://ibacor.com/labs/jquery-manga-reader-mangaeden/
* Updates will be posted to this site.
******************************************************/
	
if ($(window).width() >= 768) {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $('.ibacor_manga_list').css('position', 'fixed');
            $('.ibacor_capter').css('position', 'fixed')
        } else {
            $('.ibacor_manga_list').css('position', 'static');
            $('.ibacor_capter').css('position', 'static')
        }
    })
}

ibacor_manga_list(0);

function ibacor_manga_list(e) {
	var x = 'list/0/?p=' + e;
	$.ajax({
		url: 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('SELECT content FROM data.headers WHERE url="http://www.mangaeden.com/api/' + x + '" and ua="Googlebot/2.1 (http://www.googlebot.com/bot.html)"') + '&format=json&env=store://datatables.org/alltableswithkeys'
	}).done(function(z) {
		var b = z.query.results.resources.content.json;
		var c = '',
            total = parseInt(b.total / 500);
        c += '<div class="ibacor-manga-top">';
        c += '<span style="float:left"><span class="bcr_back"><input type="submit" class="btn ibacor_tombol" value="<<"></span> ';
        c += e + '/' + total;
        c += ' <span class="bcr_next"><input type="submit" class="btn ibacor_tombol" value=">>"></span></span>';
        c += '<span style="float:right">Jump <select>';
        for (var i = 0; i <= total; i++) {
            c += '<option value="' + i + '" class="bachorscp">' + i + '</option>'
        }
        c += '</select></span>';
        c += '</div>';
        c += '<div class="ibacor-manga-bottom">';
        $.each(b.manga, function(i, a) {
            c += '<div class="bcr_manga_inpo" data-vvv="' + b.manga[i].i + '">' + b.manga[i].t + '<br><span class="ibacor-manga-vw">' + b.manga[i].h + ' Views</span></div>'
        });
        c += '</div><div style="padding-right:20px"><span style="float:right;"><a href="https://github.com/bachors/jQuery-manga-reader-mangaeden-" target="_BLANK" style="color:#444" title="?">?</a></span></div>';
        $('.ibacor_manga_list').html(c);
        if (e > 0) {
            $('.bcr_back').click(function() {
                ibacor_manga_list(e - 1);
                return false
            })
        }
        if (e < total) {
            $('.bcr_next').click(function() {
                ibacor_manga_list(e + 1);
                return false
            })
        }
        $('.bachorscp').click(function() {
            var a = $(this).val();
            ibacor_manga_list(a);
            return false
        });
        $(".bcr_manga_inpo").each(function() {
            $(this).click(function() {
                var a = $(this).attr("data-vvv");
                $('div').removeClass('bcr_manga_inpo-active');
                $(this).addClass('bcr_manga_inpo-active');
                $('.ibacor_manga_det').html('');
                ibacor_manga_inpo(a);
                return false
            });
        });
	});	
}

function ibacor_manga_inpo(e) {
    var x = 'manga/' + e + '/';
	$.ajax({
		url: 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('SELECT content FROM data.headers WHERE url="http://www.mangaeden.com/api/' + x + '" and ua="Googlebot/2.1 (http://www.googlebot.com/bot.html)"') + '&format=json&env=store://datatables.org/alltableswithkeys'
	}).done(function(z) {
		var b = z.query.results.resources.content.json;
		var ex = b.chapters.length - 1;
		ibacor_manga_det(b.chapters[ex].json[3], 0);
        var c = '';
        c += '<div style="background:#fff;padding:20px;"><center><h1>' + b.title + '</h1></center><hr><strong>Category: </strong>';
        $.each(b.categories, function(i, a) {
            c += '<span class="ibacor_kategori">' + b.categories[i] + '</span>'
        });
        c += '<div style="margin-top:20px;"><strong>Description: </strong>' + b.description + '</div>';
        c += '<table><tr><th>Chapter</th><th>Uploaded</th></tr>';
        $.each(b.chapters, function(i, a) {
                var date = new Date(b.chapters[i].json[1] * 1000),
                    time = date.toGMTString();
            c += '<tr><td><button class="bcr_manga_det btn ibacor_chapter" data-ccc="' + b.chapters[i].json[3] + '">Chapter ' + (parseInt(b.chapters[i].json[0])+1) + '</button></td><td>' + time + '</td></tr>'
        });
        c += '</table></div>';
        $('.ibacor_manga_inpo').html(c);
        $(".bcr_manga_det").each(function() {
            $(this).click(function() {
                var a = $(this).attr("data-ccc");
                ibacor_manga_det(a, 0);
                return false
            });
        });
    });
}

function ibacor_manga_det(d, e) {
    var x = 'chapter/' + d + '/';
	$.ajax({
		url: 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('SELECT content FROM data.headers WHERE url="http://www.mangaeden.com/api/' + x + '" and ua="Googlebot/2.1 (http://www.googlebot.com/bot.html)"') + '&format=json&env=store://datatables.org/alltableswithkeys'
	}).done(function(z) {
		var a = z.query.results.resources.content.json;
        var b = '',
            leng = a.images.length;
        b += '<div class="ibacor_capter">';
        b += '<span class="bcr_capter_back"><input type="submit" class="btn ibacor_tombol" value="<<"></span> ';
        b += '<span>' + e + '/' + (leng - 1) + '</span> ';
        b += '<span class="bcr_capter_next"><input type="submit" class="btn ibacor_tombol" value=">>"></span>';
        b += '</div>';
        b += '<img src="http://cdn.mangaeden.com/mangasimg/' + a.images[e].json[1] + '" alt="" title="jquery plugin mangaeden api by @bachors">';
        $('.ibacor_manga_det').html(b);
        if (e < leng) {
            $('.bcr_capter_next').click(function() {
                ibacor_manga_det(d, e + 1);
                return false
            })
        }
        if (e > 0) {
            $('.bcr_capter_back').click(function() {
                ibacor_manga_det(d, e - 1);
                return false
            });
        }
    });
}
