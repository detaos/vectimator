function get(id) {
	return document.getElementById(id);
}

function echo(s) {
	document.write(s);
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
				echo('<a class="sub_menu_item" href="javascript:vectimator.' + this.menu[key]['items'][item][1] + '">' + this.menu[key]['items'][item][0] + "</a>&nbsp;|&nbsp;\n");
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
	
	open : function() {
		get("the_svg").data = "test_svgs/0x01.svg";
		this.close_menu();
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
		alert("TODO: show the documentation (in a new tab)");
		this.close_menu();
	}
};
