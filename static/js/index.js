		jQuery(document).ready(function($){
			function get_data_from_backstage(url,data,successHandler){
				$.ajax({
					url: url,
					type: 'get',
					dataType: 'json',
					data: {request: data},
				})
				.done(function(result) {
	    			successHandler(result);
				})
				.fail(function(result) {
					console.log("fail");
				})
				.always(function() {
					console.log("complete");
				});
			}


			//前端不同值对应不同的回调函数
			var request_function_map = {
				licaibao: function licaibao_call_back(result){
					$('#show_page').empty();
					var licaibao_data = result['licaibao_data'];
					var len = licaibao_data.length;
					//先把表格tbody的tr复制好,第一个tr不添加数据，方面div(huobixing)的还原
					for (i=1;i<len;i++){
						var tr = $('#page_generate tbody tr').eq(0).clone(true);
						$('#page_generate tbody').append(tr);
					}
					//把result数据传入
					for (i=0; i<len; i++){
						var name = licaibao_data[i]['name'];
						var id = licaibao_data[i]['id'];
						var profit = licaibao_data[i]['profit'];
						var increase = licaibao_data[i]['increase'];
						$('#page_generate tbody').find('tr').eq(i).find('td:eq(0)').find('p:eq(0)').html(name);
						$('#page_generate tbody').find('tr').eq(i).find('td:eq(0)').find('p:eq(1)').html(id);
						$('#page_generate tbody').find('tr').eq(i).find('td:eq(1)').html(profit);
						$('#page_generate tbody').find('tr').eq(i).find('td:eq(2)').html(increase);
					}
					$('#page_generate thead th:eq(0)').html("名称");
					$('#page_generate thead th:eq(1)').html("万份收益");
					$('#page_generate thead th:eq(2)').html("七日年化");
					var html = $("#page_generate").html();
					$('#show_page').append(html);
					//移除多余的tr，否则下次调用的时候tr会增多。
					$("#page_generate tbody tr:not(:first)").remove();
				},

				huobixing: function huobixing_call_back(result){
					$('#show_page').empty();
					var huobixing_data = result['huobixing_data'];
					var len = huobixing_data.length;
					//先把表格tbody的tr复制好,第一个tr不添加数据，方面div(huobixing)的还原
					for (i=1;i<len;i++){
						var tr = $('#page_generate tbody tr').eq(0).clone(true);
						$('#page_generate tbody').append(tr);
					}
					//把result数据传入
					for (i=0; i<len; i++){
						var name = huobixing_data[i]['name'];
						var id = huobixing_data[i]['id'];
						var profit = huobixing_data[i]['profit'];
						var increase = huobixing_data[i]['increase'];
						$('#page_generate tbody').find('tr').eq(i).find('td:eq(0)').find('p:eq(0)').html(name);
						$('#page_generate tbody').find('tr').eq(i).find('td:eq(0)').find('p:eq(1)').html(id);
						$('#page_generate tbody').find('tr').eq(i).find('td:eq(1)').html(profit);
						$('#page_generate tbody').find('tr').eq(i).find('td:eq(2)').html(increase);
					}
					$('#page_generate thead th:eq(0)').html("名称");
					$('#page_generate thead th:eq(1)').html("万份收益");
					$('#page_generate thead th:eq(2)').html("七日年化");
					var html = $("#page_generate").html();
					$('#show_page').append(html);
					//移除多余的tr，否则下次调用的时候tr会增多。
					$("#page_generate tbody tr:not(:first)").remove();
				},

				gupiaoxing: function gupiaoxing_call_back(result){
					alert(3);
					$('#show_page').empty();
				},
				hunhexing: function hunhexing_call_back(result){
					alert(4);
					$('#show_page').empty();
					$('#show_page').html(result);
				},
				zhaiquanxing: function zhaiquanxing_call_back(result){
					alert(5);
					$('#show_page').empty();
					$('#show_page').html(result);
				},
				licaixing: function licaixing_call_back(result){
					alert(6);
					$('#show_page').empty();
					$('#show_page').html(result);
				},
				baobenxing: function baobenxing_call_back(result){
					alert(7);
					$('#show_page').empty();
					$('#show_page').html(result);
				},
			}


			//前端不同值对应不同handler处理
			var request_url_map = {
				licaibao: "licaibao",
				huobixing: "huobixing",
				gupiaoxing: "gupiaoxing",
				hunhexing: "hunhexing",
				zhaiquanxing: "zhaiquanxing",
				licaixing: "licaixing",
				baobenxing: "baobenxing",
			}


			//页面初始化为理财宝数据
			get_data_from_backstage('licaibao','licaibao',request_function_map['licaibao'])
			//前端向后台传递查询的值，请求的url和相应的回调函数。
			$('#page_navagation li a').click(function(event) {
				$('#page_navagation li').removeClass('active');
				$(this).parent().addClass('active');
				var val = $(this).attr("value");
				var url = request_url_map[val];
				success_handler = request_function_map[val];
				get_data_from_backstage(url,val,success_handler);
			});
		});//document_ready结束