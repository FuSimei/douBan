var $input = $('.bhead .bheadRt input'),
    $span = $('.bhead .bheadRt span'),
    $hidden = $('.hidden'),
    data;

$input.keyup(function() {
    $.ajax({
         	type:'GET',
         	url:'https://api.douban.com/v2/book/search?q=' + $input.prop("value"),
         	dataType:'jsonp',         //jquery中跨域获取数据
         	success: function(data) {
                
                //每次开始前先清空
                $hidden.html("");
                console.log(data);              
              
             // 搜索框里有值时让下拉框显示
                if(data.count !== 0) {
                    $('.hidden').css('display','block');

                    // 插入标签(顺序)
                for(var i = 0; i < 6; i++){
                    var dom = $('<div class="hiddenOne"><img class="hiddenBook" src=""><div><p><span class="names"></span><span class="year"></span></p><p class="author"></p></div></div>');
                    console.log(dom);
                    $('.hidden').append(dom);
                    $('.names').eq(i).html(data.books[i].title);
                    $('.year').eq(i).html(data.books[i].pubdate);
                    $('.author').eq(i).html(data.books[i].author[0]);
                    $('.hiddenBook').eq(i).prop('src',data.books[i].images.large);                    

                    // 点击某一个元素跳转相应页面
                    $('.hiddenOne').click(function(){
                        window.location.href = data.books[i].alt;
                        $input.prop('value', "");
                       })
                }                     
           
                }else{
                    $('.hidden').css('display','none');
                }      
             
                // 点击回车或搜索按钮跳转
                document.onkeydown = function(e) {
                    var ee = e || window.event;
                        key = ee.keyCode;
                        if(key == 13){
                            turn();
                        } 
                }
                $span.click(turn);

                function turn() {
                  window.location.href = 'https://book.douban.com/subject_search?search_text=' + $input.prop("value") +'&cat=1001';
                  $input.prop('value', "");
                }
                
                // 点击除加入的部分的其他地方隐藏样式
                $('body').not('.hidden').click(function() {
                   $('.hidden').css('display','none');
                })                          
            }
        })
})
       
// https://book.douban.com/subject/1361268/
// https://book.douban.com/subject/4874245/

// https://book.douban.com/subject_search?search_text=书&cat=1001
// https://book.douban.com/subject_search?search_text=书&cat=1001

   