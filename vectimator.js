function get(id) {
	return document.getElementById(id);
}

function echo(s) {
	document.write(s);
}

function show_hide(id) {
	get(id).style.display = get(id).style.display == "block" ? "none" : "block";
}

function show_popup(id) {
	get('popup_layer').innerHTML = get(id).innerHTML;
	get('popup_layer').style.display = "block";
}

function close_popup() {
	get('popup_layer').innerHTML = "";
	get('popup_layer').style.display = "none";
}

var vectimator = {
	menu : null,
	
	init_menu : function(m) {
		this.menu = m;
		echo("<div>\n");
		for (key in this.menu)
			echo('<a class="menu_item" href="javascript:vectimator.show_menu(\'' + key + '\')">' + this.menu[key]['title'] + "</a>&nbsp;|&nbsp;\n");
		echo("</div>\n");
		for (key in this.menu) {
			echo('<div class="sub_menu" id="' + key + "\">\n");
			for (item in this.menu[key]['items']) {
				echo('<a class="sub_menu_item" id="' + key + '_' + this.menu[key]['items'][item][0] + '_link" href="javascript:vectimator.' + this.menu[key]['items'][item][1] + '">' + this.menu[key]['items'][item][0] + "</a>&nbsp;|&nbsp;\n");
			}
			echo ("</div>\n");
		}
	},
	
	show_menu : function(id) {
		for (key in this.menu)
			if (key != id)
				get(key).style.display = "none";
		get(id).style.display = get(id).style.display == "block" ? "none" : "block";
	},
	
	close_menu : function() {
		for (key in this.menu)
			get(key).style.display = "none";
	},
	
	menu_open : function() {
		show_popup('open_svg_popup');
		this.close_menu();
	},
	
	build_children : function(svg) {
		//TODO
	},
	
	build_tree_view : function() {
		var html = "";
		var svg = get("the_svg").contentDocument.activeElement.childNodes;
		for (var i = 0; i < svg.length; ++i) {
			if (svg[i].nodeName != "#text") {
				var node_id = 'node_' + svg[i].nodeName + '_' + svg[i].id;
				var display_name = svg[i].nodeName + (svg[i].id != null ? "#" + svg[i].id : "");
				html += '<a href="javascript:show_hide(\'' + node_id + '\')">+</a> ' + display_name + '<br /><div class="node_child" id="' + node_id + '">children here</div>';
			}
		}
		get("tree_view").innerHTML = html;
	},
	
	open : function(file) {
		get("the_svg").data = get(file).files[0].getAsDataURL();
		//populate the tree view
		setTimeout("vectimator.build_tree_view()", 10);	//This is needed because the svg can't be parsed in the same function that opened it
		close_popup();
	},
	
	save : function() {
		alert("TODO: save an animated SVG");
		this.close_menu();
	},
	
	save_as : function() {
		alert("TODO: save an animated SVG with a new file name");
		this.close_menu();
	},
	
	set_view : function(view) {
		alert("TODO: change the view mode to " + view);
		this.close_menu();
	},
	
	show_docs : function() {
		alert("TODO: show the documentation (in a new tab)");
		this.close_menu();
	},
	
	show_about : function() {
		alert("TODO: show the about (in a new tab)");
		this.close_menu();
	}
};
