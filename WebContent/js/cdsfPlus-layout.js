var colorPalette = d3.scale.ordinal().domain(
		[ "root", "dp1", "dec1", "out1", "dp2", "dec2", "out2", "dp3", "dec3",
				"out3", "dp4", "dec4", "out4" ]).range([
// cat20b light (blue, green, brown, pink)
"#636363",

"#5254a3", "#6b6ecf", "#9c9ede",

"#8ca252", "#b5cf6b", "#cedb9c",

"#bd9e39", "#e7ba52", "#e7cb94",

"#a55194", "#ce6dbd", "#de9ed6" ]);

var colorPalette2 = d3.scale.ordinal().domain(
		[ "root", "dp1", "dec1", "out1", "dp2", "dec2", "out2", "dp3", "dec3",
				"out3", "dp4", "dec4", "out4" ]).range([
// cat20b light (blue, green, brown, red)
"#636363",

"#5254a3", "#6b6ecf", "#9c9ede",

"#8ca252", "#b5cf6b", "#cedb9c",

"#bd9e39", "#e7ba52", "#e7cb94",

"#ad494a", "#d6616b", "#e7969c" ]);

var colorPalette3 = d3.scale.ordinal().domain(
		[ "root", "dp1", "dec1", "out1", "dp2", "dec2", "out2", "dp3", "dec3",
				"out3", "dp4", "dec4", "out4" ]).range([
// cat20c dark (blue, green, brown, red)
"#636363",

"#3182bd", "#6baed6", "#9ecae1",

"#e6550d", "#fd8d3c", "#fdae6b",

"31a354", "#74c476", "#a1d99b",

"#756bb1", "#9e9ac8", "#bcbddc" ]);

var colorPalette3 = d3.scale.ordinal().domain(
		[ "root", "dp1", "dec1", "out1", "dp2", "dec2", "out2", "dp3", "dec3",
				"out3", "dp4", "dec4", "out4" ]).range([
// cat20c light (blue, green, brown, red)
"#636363",

"#6baed6", "#9ecae1", "#c6dbef",

"#fd8d3c", "#fdae6b", "#fdd0a2",

"74c476", "#a1d99b", "#c7e9c0",

"#9e9ac8", "#bcbddc", "#dadaeb" ]);

var getColor = function(d) {
	return colorPalette(d);
}
var resizeId;

var marginConvention = (function marginConvention(padding, height) {

	var margin = {
		top : 10,
		right : 10,
		bottom : 10,
		left : 10
	};

	var oWidth = parseInt($('#visContent').width());
	var oHeight = height || 900;

	var iWidth = oWidth - margin.left - margin.right;
	var iHeight = oHeight - margin.top - margin.bottom;
	var panelWidth = iWidth - padding.left - padding.right;
	var panelHeight = iHeight - padding.top - padding.bottom;

	var marginConvention = {
		"panelWidth" : panelWidth,
		"panelHeight" : panelHeight,
		"oWidth" : oWidth,
		"oHeight" : oHeight,
		"iWidth" : iWidth,
		"iHeight" : iHeight,
		"marginTop" : margin.top,
		"marginRight" : margin.right,
		"marginBottom" : margin.bottom,
		"marginLeft" : margin.left
	}
	return marginConvention;
});

// var decRelGraph, outRelGraph, hierRelGraph;

$(document).ready(function() {
	setSidebar();
	setSidebarButtons();

	// todo move to own file

	$('#buttonGroupRelations .btn.active input').each(function(index) {
		$(this).prop("checked", true);
	});
	$('#buttonGroupRelations .btn').on('change', function() {
		if ($(this).prop("checked") == true) {
			$(this).prop("checked", false);
		} else {
			$(this).prop("checked", true);
		}
		var data = [];
		$('#buttonGroupRelations .btn input').each(function(index) {
			if ($(this).prop("checked") == true) {
				data.push(this.value);
			}
		});
		decisionGraph.setLinks(data);

	});
});

function setSidebar() {
	$('[data-toggle="offcanvas"]').on(
			'click',
			function() {
				$('.row-offcanvas').toggleClass('active');
				$('#toggleButton > span').toggleClass(
						"glyphicon glyphicon-chevron-left");
				$('#toggleButton > span').toggleClass(
						"glyphicon glyphicon-chevron-right");
			});
}

function setSidebarButtons() {
	var btnList_DecRel = $('#btnList_DecRel');
	var btnList_OutRel = $('#btnList_OutRel');
	var toolbar = $('#toolbarDecisions');
	var btnList_treeLayout = $('#btnList_treeLayout');

	btnList_treeLayout.on('click', function(event) {
		btnList_treeLayout.addClass("active");
		btnList_DecRel.removeClass("active");
		btnList_OutRel.removeClass("active");
		treeGraph.initialize();
		$(window).on('resize.treeResize', function() {
			clearTimeout(resizeId);
			resizeId = setTimeout(treeGraph.resizeLayout(), 800);
		});
	});

	btnList_DecRel.on('click', function(event) {
		btnList_DecRel.addClass("active");
		btnList_OutRel.removeClass("active");
		btnList_treeLayout.removeClass("active");
		toolbar.removeClass("hidden");
		$(window).off('resize.treeResize');
		// eventuell neues objekt und nicht gleich instanzieren
		var data = [];
//		$('#buttonGroupRelations .btn input').each(function(index) {
//			if ($(this).prop("checked") == true) {
//				data.push(this.value);
//			}
//		});
//		decisionGraph.initialize(data);
		decisionGraph.initialize();
	});

	btnList_OutRel.on('click', function(event) {
		btnList_OutRel.addClass("active");
		btnList_DecRel.removeClass("active");
		btnList_treeLayout.removeClass("active");
		toolbar.addClass("hidden");
		// eventuell neues objekt und nicht gleich instanzieren lassen
		outcomeGraph.initialize();
	});
}