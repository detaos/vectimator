function get(id) {
	return document.getElementById(id);
}

function echo(s) {
	document.write(s);
}

function show_popup(id) {
	get('popup_layer').innerHTML = get(id).innerHTML;
	get('popup_layer').style.display = "block";
}

function close_popup() {
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
		//FOR TESTING
		get("the_svg").data = "test_svgs/0x01.svg";
		//LIVE CODE
		//show_popup('open_svg_popup');
		this.close_menu();
	},
	
	open : function(svg) {
		get("the_svg").data = get(svg).files[0].getAsDataURL();
		//TODO populate the tree view
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
