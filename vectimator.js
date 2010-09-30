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
	get('popup_layer').style.display = "none";
	get('popup_layer').innerHTML = "";
}

var vectimator = {
	menu : null,
	
	get : function(id) {
		return get("the_svg").contentDocument.getElementById(id);
	},
	
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
	
	open : function(file) {
		get("the_svg").data = get(file).files[0].getAsDataURL();
	},
	
	build_tree_view : function() {
		var html = "";
		svg_elements = new Array();
		var svg = get("the_svg").contentDocument.activeElement.childNodes;
		html += this.build_children(svg);
		get("tree_view").innerHTML = html;
		get("element_id").innerHTML = "";
		get("element_attributes").innerHTML = "";
		close_popup();
	},
	
	build_children : function(svg) {
		var html = "";
		for (var i = 0; i < svg.length; ++i) {
			if (svg[i].nodeName != "#text" && svg[i].id != null) {
				var node_id = 'node_' + svg[i].nodeName + '_' + svg[i].id;
				var node_name = svg[i].nodeName + "#" + svg[i].id;
				var display_name = '<a href="javascript:vectimator.view_attributes(\'' + node_name + '\', \'' + svg[i].id + '\')">' + node_name + '</a>'
				if (svg[i].childNodes.length > 0) {
					html += '<a class="node_expander" href="javascript:show_hide(\'children_' + node_id + '\')" id="' + node_id + '">+</a>' + display_name;
					html += '<br /><div class="node_child" id="children_' + node_id + '">';
					html += this.build_children(svg[i].childNodes);
					html += '</div>';
				}
				else {
					html += display_name + '<br />';
				}
			}
		}
		return html;
	},
	
	view_attributes : function(name, id) {
		get("element_id").innerHTML = name;
		var svg = this.get(id).attributes;
		var html = "";
		for (var i = 0; i < svg.length; ++i) {
			html += '<div class="attribute"><a href="javascript:vectimator.show_new_animation_popup(\'' + name + '\', \'' + id + '\', \'' + svg[i].nodeName + '\', \'' + svg[i].nodeValue + '\')">[+]</a> ' + svg[i].nodeName + '<br />';
			html += '<input type="text" value="' + svg[i].nodeValue + '" onkeyup="vectimator.set_attribute(\'' + id + '\', \'' + i + '\', this.value)" /></div>';
		}
		get("element_attributes").innerHTML = html;
	},
	
	/**
	 * set an attribute in the svg's xml tree
	 */
	set_attribute : function(id, index, value) {
		this.get(id).attributes[index].nodeValue = value;
	},
	
	show_new_animation_popup : function(name, id, attribute, value) {
		show_popup("animation_popup");
		get("animation_popup_name").innerHTML = name;
		get("animation_popup_id").value = id;
		get("animation_popup_attribute").value = attribute;
		get("animation_popup_from").value = value;
		get("animation_popup_to").value = value;
		get("animation_popup_duration").value = "5s";
	},
	
	add_animation_tag : function() {
		var svg = this.get(get("animation_popup_id").value);
		var animate_tag = svg.createElement("animate");		//TODO: FIXME!
		svg.apendChild(animate_tag);
		svg = svg.getElementsByTagName("animate")[0];
		svg.createAttribute("attributeType");
		svg.attributeType = "XML";
		svg.createAttribute("attributeName");
		svg.attributeName = get("animation_popup_attribute").value;
		svg.createAttribute("from");
		svg.from = get("animation_popup_from").value;
		svg.createAttribute("to");
		svg.to = get("animation_popup_to").value;
		svg.createAttribute("duration");
		svg.duration = get("animation_popup_duration").value;
		svg.createAttribute("repeatCount");
		svg.repeatCount = "indefinite";
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
