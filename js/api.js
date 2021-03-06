function print(x) {
	console.log(x);
}
function TODO(x) {
	print("TODO: "+x)
}
function SHOULDDO(x){
	TODO(x)
}

/*
	For each function, the final parameter is an optional options
	parameter. It should be an object{} with any
	combination of the three options:
		* group_by:	discrete attribute name as string
		* all_gens:	boolean value, true to apply to all
								generations in current canvas
		* all_canvases:	boolean value, true to apply
										true to apply to all gens in all
										parititions

	For some functions, there are additional optional values
		* by: a sorting function used for index-based positioning
		* parts: number of partitions
		* invert: invert the sorting function
*/


/*************************
	******AGGREGATION*******
/*************************

// 2	aggregate edges by {discrete} and {discrete} using {method}
// 29	aggregate edges by {discrete} using {method}
/*
	Aggregates edges by attributes using method.
	* attr can be either a string for the attribute or a list
			of attributes.
*/
GLO.GLO.prototype.aggregate_edges_by = function(attr,method,opts){
	this.correct_edge_gens(opts).forEach(function(gen){
		gen.aggregate(attr,method)
	})
	return this
}

//84	deaggregate edges
/*
	Deaggregates the active generation and selects the generation
	previously aggregated to create the aggregation.
	If active generation is not aggregated, then nop
*/
GLO.GLO.prototype.deaggregate_edges = function(opts){
	this.correct_edge_gens(opts).forEach(function(gen){
		gen.deaggregate()
	})
	return this
}



// 52	aggregate nodes by {discrete} and {discrete} using {method}
// 113	aggregate nodes by {discrete} using {method}
/*
	Aggregates nodes by attribute(s) using method.
	* attr can be either a string for the attribute or a list
			of strings for attributes.
*/
GLO.GLO.prototype.aggregate_nodes_by = function(attr,method,opts){
	this.correct_node_gens(opts).forEach(function(gen){
		gen.aggregate(attr,method)
	})
	return this
}

//107	deaggregate nodes
/*
	Deaggregates the active generation and selects the generation
	previously aggregated to create the aggregation.
	If active generation is not aggregated, then nop
*/
GLO.GLO.prototype.deaggregate_nodes = function(opts){
	this.correct_node_gens(opts).forEach(function(gen){
		gen.deaggregate()
	})
	return this
}










/*************************
	******POSITIONING*******
/*************************



// 28	align edges {dir}
/*
	Aligns edges to a specificed direction.
	Shorthand for position_edges_by(constant)
*/
GLO.GLO.prototype.align_edges = function(dir,opts){
	TODO("align_edges")
	return this
}

//433	align nodes {dir}
/*
	Aligns nodes to a specified direction.
	Shorthand for position_nodes_by(constant)
*/
GLO.GLO.prototype.align_nodes = function(dir,opts){
	this.correct_node_gens(opts).forEach(function(gen){
		gen.align(dir,opts)
	})
	return this
}


//168	position edges by {attr},{attr}
/*
	Valid:
		source,target (assume x or y based on pos in args)
		source.x,target.y (e.g.)
		mean,mean -> mean(x),mean(y)
		mean(x),mean(y)
		mean(y),mean(x)

	Ideally enable mean(x)
*/
GLO.GLO.prototype.position_edges_by = function(xattr,yattr,opts){
	TODO("position_edges_by")
	return this
}

//728	position nodes on {axis} by {attr}

/*
	val is either a string attrID or a numerical constant
	theta constants are expressed in degrees, not radians
*/
GLO.GLO.prototype.position_nodes_on = function(axis,val,opts){
	if(opts && opts.invert){
		SHOULDDO("Invert flag for position (done for distribute)")
	}

	this.correct_node_gens(opts).forEach(function(gen){
		gen.position_on(axis,val,opts)
	})
	return this
}

//145	position nodes on {axis} by {constant}
GLO.GLO.prototype.position_nodes_by_constant_on = function(axis,opts){
	this.correct_node_gens(opts).forEach(function(gen){
		gen.position_by_preset_constant(axis,opts)
	})
	return this
}

//29	position nodes {dir} on {axis} (by {attr})
/*
	Utilizes by from opts
*/
GLO.GLO.prototype.position_nodes_evenly_stacked = function(direction,opts){
	SHOULDDO("position_nodes_evenly_stacked --- group_by")

	if(opts && opts.within){
		this.correct_node_gens(opts).forEach(function(gen){
			gen.stack_within(direction,opts.within,opts)
		})
		return this
	}

	this.correct_node_gens(opts).forEach(function(gen){
		gen.stack(direction,opts)
	})
	return this
}


//29	evenly distribute edges on {axis} (by {attr})
/*
	opts includes by option
*/
GLO.GLO.prototype.evenly_distribute_edges_on = function(axis,opts){
	TODO("evenly_distribute_edges_on")
	return this
}

//641	evenly distribute nodes on {axis} (by {attr})
/*
	opts includes by option
*/
GLO.GLO.prototype.evenly_distribute_nodes_on = function(axis,opts){
	if(opts && opts.within){
		this.correct_node_gens(opts).forEach(function(gen){
			if(opts && opts.by){
				gen.distribute_on_within(axis,opts.within,opts.by,opts)
			}else{
				gen.distribute_on_within(axis,opts.within,null,opts)
			}
		})
		return this
	}

	this.correct_node_gens(opts).forEach(function(gen){
		if(opts && opts.by){
			gen.distribute(axis,opts.by,opts)
		}else{
			gen.distribute(axis,null,opts)
		}
	})
	

	return this

}



//123	apply force-directed algorithm to nodes
/*
	
*/
GLO.GLO.prototype.apply_force_directed_algorithm_to_nodes = function(opts){
	var self = this
	this.correct_node_gens(opts).forEach(function(gen){
		gen.apply_force_directed(self.edges())
	})
	return this
}






/*************************
	******CLONING*******
/*************************



//107	clone edges
/*
	Clones the active generation of edges and selects the new
	generation as the active generation
*/
GLO.GLO.prototype.clone_edges = function(opts){
	this.correct_edge_gens(opts).forEach(function(gen){
		gen.clone()
	})
	return this
}

//234	clone nodes
/*
	Clones the active generation of nodes and selects the new
	generation as the active generation
*/
GLO.GLO.prototype.clone_nodes = function(opts){
	this.correct_node_gens(opts).forEach(function(gen){
		gen.clone()
	})
	return this
}



//36	select edge generation {num}
/*
	
*/
GLO.GLO.prototype.select_edge_generation = function(gen,opts){
	if(typeof opts !== "undefined"){
		opts.all_canvases = false
	}else{
		opts = {all_canvases: false}
	}
	var edge_gen = this.active_canvas().edge_generations.get(gen)
	this.active_canvas().active_edge_generation(edge_gen)
	return this
}

//88	select node generation {num}
/*
	
*/
GLO.GLO.prototype.select_node_generation = function(gen,opts){
	if(typeof opts !== "undefined"){
		opts.all_canvases = false
	}else{
		opts = {all_canvases: false}
	}
	var node_gen = this.active_canvas().node_generations.get(gen)
	this.active_canvas().active_node_generation(node_gen)
	return this
}



//78	set source generation {num}
/*
	
*/
GLO.GLO.prototype.set_source_generation = function(gen,opts){
	if(typeof opts !== "undefined"){
		opts.all_canvases = false
	}else{
		opts = {all_canvases: false}
	}
	var gen_inst = this.active_canvas().node_generations.get(gen)
	this.correct_edge_gens(opts).forEach(function(gen){
		gen.source_generation(gen_inst)
	})
	return this
}

//217	set target generation {num}
/*
	
*/
GLO.GLO.prototype.set_target_generation = function(gen,opts){
	if(typeof opts !== "undefined"){
		opts.all_canvases = false
	}else{
		opts = {all_canvases: false}
	}
	var gen_inst = this.active_canvas().node_generations.get(gen)
	this.correct_edge_gens(opts).forEach(function(gen){
		gen.target_generation(gen_inst)
	})
	return this
}





//41	remove edge generation {num}
/*
	Removes the provided edge generation
	Cannot remove the only generation. If so, nop.
	If gen is active generation, selects a different generation
*/
GLO.GLO.prototype.remove_edge_generation = function(gen,opts){
	TODO("remove_edge_generation")
	return this
}

//39	remove node generation {num}
/*
	Removes the provided node generation
	Cannot remove the only generation. If so, nop.
	If gen is active generation, selects a different generation
*/
GLO.GLO.prototype.remove_node_generation = function(gen,opts){
	TODO("remove_node_generation")
	return this
}



//156	remove all cloned edges
/*
	Removes all edges except a single generation and sets that
	generation as active.
*/
GLO.GLO.prototype.remove_all_cloned_edges = function(opts){
	TODO("remove_all_cloned_edges")
	return this
}

//219	remove all cloned nodes
/*
	Removes all nodes except a single generation and sets that
	generation as active.
*/
GLO.GLO.prototype.remove_all_cloned_nodes = function(opts){
	TODO("remove_all_cloned_nodes")
	return this
}














/*************************
	*****GLYPHS******
/*************************





//29	draw convex hulls
/*
	group_by value in opts, otherwise convex hull for
	all nodes
*/
GLO.GLO.prototype.show_convex_hulls = function(opts){
	TODO("show_convex_hulls")
	return this
}

//28	remove convex hulls
/*
	
*/
GLO.GLO.prototype.hide_convex_hulls = function(opts){
	TODO("hide_convex_hulls")
	return this
}



//152	show all edges
/*
	
*/
GLO.GLO.prototype.show_all_edges = function(opts){
	this.correct_edge_gens(opts).forEach(function(gen){
		gen.show_mode("show_all_edges",opts)
	})
	return this
}

//27	show edges as faded
/*
	
*/
GLO.GLO.prototype.show_edges_as_faded = function(opts){
	this.correct_edge_gens(opts).forEach(function(gen){
		gen.show_mode("show_faded_edges",opts)
	})
	return this
}

//28	show edges as solid
/*
	
*/
GLO.GLO.prototype.show_edges_as_solid = function(opts){
	TODO("show_edges_as_solid")
	return this
}

//28	show faded and incident edges
/*
	All edges as shown as faded, except for incident edges
	to mousedover node shown as solid
*/
GLO.GLO.prototype.show_faded_and_incident_edges = function(opts){
	this.correct_edge_gens(opts).forEach(function(gen){
		gen.show_mode("show_faded_and_incident_edges",opts)
	})
	return this
}

//79	show incident edges
/*
	All edges hidden, except for incident edges
	to mousedover node shown as solid
*/
GLO.GLO.prototype.show_incident_edges = function(opts){
	this.correct_edge_gens(opts).forEach(function(gen){
		gen.show_mode("show_incident_edges",opts)
	})
	return this
}


//79	hide edges
/*
	
*/
GLO.GLO.prototype.hide_edges = function(opts){
	this.correct_edge_gens(opts).forEach(function(gen){
		gen.show_mode("hide_edges",opts)
	})
	return this
}

//28	display edges as bars
/*
	
*/
GLO.GLO.prototype.display_edges_as_bars = function(opts){
	TODO("display_edges_as_bars")
	return this
}

//213	display edges as curved lines
/*
	
*/
GLO.GLO.prototype.display_edges_as_curved_lines = function(opts){
	this.correct_edge_gens(opts).forEach(function(gen){
		gen.edge_format("curved_lines",opts)
	})
	return this
}

//28	display edges as in-out-links
/*
	
*/
GLO.GLO.prototype.show_edges_as_in_out_links = function(opts){
	TODO("show_edges_as_in_out_links. Falling back to show incident edges")
	this.show_incident_edges(opts)
	return this
}


//148	display edges as squares
/*
	
*/
GLO.GLO.prototype.display_edges_as_squares = function(opts){
	this.correct_edge_gens(opts).forEach(function(gen){
		gen.edge_format("squares",opts)
	})
	return this
}

//165	display edges as straight lines
/*
	
*/
GLO.GLO.prototype.display_edges_as_straight_lines = function(opts){
	this.correct_edge_gens(opts).forEach(function(gen){
		gen.edge_format("straight_lines", opts)
	})
	return this
}

//28	display edges as y->x right-angles
/*
	dirarr is a 2d array of directions (left,right,top,bottom)
	the angle is drawn from either the min or the max of x
	to either the min or the max of y based upon
*/
GLO.GLO.prototype.display_edges_as_right_angles = function(opts){
	TODO("display_edges_as_right_angles")
	return this
}

//28	display edges as {attr} labels
/*
	
*/
GLO.GLO.prototype.display_edges_as_labels = function(attr,opts){
	TODO("display_edges_as_labels")
	return this
}



//89	display nodes as bars
/*
	
*/
GLO.GLO.prototype.display_nodes_as_bars = function(opts){
	TODO("display_nodes_as_bars")
	return this
}

//208	display nodes as circles
/*
	
*/
GLO.GLO.prototype.display_nodes_as_circles = function(opts){
	TODO("display_nodes_as_circles")
	return this
}

//237	display nodes as {attr} labels
/*
	
*/
GLO.GLO.prototype.display_nodes_as_labels = function(attr,opts){
	TODO("display_nodes_as_labels")
	return this
}



//202	size edges by {attr}
//29	size edges by {attr} and {attr}
//199	size edges by {constant}
/*
	attr can be either an attrID, 2-element array of attrIDs,
	3-element array of attrIDs, or a number.
	2-element is source-end-->target-end.
	3-element is source-end, middle, target-end.
	number is a constant

	If non-line-based edge display (e.g. label, square, bar), only
	first attrID is used.
*/
GLO.GLO.prototype.size_edges_by = function(attr,opts){
	SHOULDDO("size edges by multiple attrs")
	SHOULDDO("size square edges")
	this.correct_edge_gens(opts).forEach(function(gen){
		gen.size_by(attr)
	})
	return this
}


GLO.GLO.prototype.size_edges_by_constant = function(attr,opts){
	this.correct_edge_gens(opts).forEach(function(gen){
		gen.size_by_preset_constant()
	})
	return this
}


//242	size nodes by {attr}
/*
	attr is a string attrID
*/
GLO.GLO.prototype.size_nodes_by = function(attr,opts){
	this.correct_node_gens(opts).forEach(function(gen){
		gen.size_by(attr)
	})
	return this
}

//162	size nodes by {constant}
GLO.GLO.prototype.size_nodes_by_constant = function(opts){
	this.correct_node_gens(opts).forEach(function(gen){
		gen.size_by_preset_constant()
	})
	return this
}





//162	rotate nodes {num} degrees
/*
	Rotates nodes clockwise deg degrees
*/
GLO.GLO.prototype.rotate_nodes = function(deg,opts){
	TODO("rotate_nodes")
	return this
}



//28	set edge waypoint edge generation {num}
/*
	
*/
GLO.GLO.prototype.set_edge_waypoint_edge_generation = function(gen,opts){
	TODO("set_edge_waypoint_edge_generation")
	return this
}



//28	remove all edge waypoints
/*
	
*/
GLO.GLO.prototype.remove_all_edge_waypoints = function(opts){
	TODO("remove_all_edge_waypoints")
	return this
}


















/*************************
	******COLORING ELEMENTS*
/*************************


//249	color edges by {attr}
//28	color edges by {attr}->{attr}
/*
	Colors edges by an appropriate color choice for attr:
		discrete
		continuous
		divergent
	attr can also be a 2-item array where the first item is the
	source-end color and the second item is the target-end color
*/
GLO.GLO.prototype.color_edges_by = function(attr,opts){
	SHOULDDO("color_edges_by Multiple Attributes")
	this.correct_edge_gens(opts).forEach(function(gen){
		gen.color_by(attr)
	})
	return this
}


GLO.GLO.prototype.color_edges_by_two = function(attr,opts){
	TODO("color edges by two")
}


//196	color edges by {constant}
/*
	Colors edges by a constant
	constant should be an HTML-recognizable color string
*/
GLO.GLO.prototype.color_edges_by_constant = function(opts){
	this.correct_edge_gens(opts).forEach(function(gen){
		gen.color_by_preset_constant()
	})
	return this
}

//144	color nodes by {attr}
/*
	Colors nodes by an appropriate color choice for attr:
		discrete
		continuous
		divergent
*/
GLO.GLO.prototype.color_nodes_by = function(attr,opts){
	this.correct_node_gens(opts).forEach(function(gen){
		gen.color_by(attr)
	})
	return this
}

//149	color nodes by {constant}
/*
	Colors nodes by a constant
	constant should be an HTML-recognizable color string
*/
GLO.GLO.prototype.color_nodes_by_constant = function(opts){
	this.correct_node_gens(opts).forEach(function(gen){
		gen.color_by_preset_constant()
	})
	return this
}


//29	color convex hulls by {attr}
/*

*/
GLO.GLO.prototype.color_convex_hulls_by = function(attr,opts){
	TODO("color_convex_hulls_by")
	return this
}


/*
	Colors hulls by a constant
	constant should be an HTML-recognizable color string
*/
GLO.GLO.prototype.color_convex_hulls_by_constant = function(constant,opts){
	TODO("color_convex_hulls_by_constant")
	return this
}
















/*************************
		***PARTITIONS**
/*************************


//198	partition canvas on {axis} (by {num})
/*
	Partitions the current display along the given axis
	all gens in the current display are cloned into the new display.
	Default is a 2-way split; the by option can be used to specify a
	larger number (parts). Splits are always even.
*/
GLO.GLO.prototype.partition_on = function(axis,opts){
	var scaler
	if(typeof opts != "undefined" && typeof opts.parts != "undefined"){
		scaler = opts.parts * 1.0
	}else{
		scaler = 2.0
	}

	this.correct_canvases(opts).forEach(function(canvas){
		canvas.partition(axis,scaler)
	})
	return this
}




//58	filter partition canvas on {axis} by {discrete}
/*
	opts includes by option
	if not included, then equiv. to partition(2)
*/
GLO.GLO.prototype.filter_partition_on = function(axis,opts){
	TODO("filter_partition_on")
	return this
}


//175	select canvas {num}
/*
	Selects the provided canvas
	Selects the most recent active generations of that canvas
*/
GLO.GLO.prototype.select_canvas = function(canvas,opts){
	this.active_canvas(canvas)
	return this
}

//3	select column {num}
/*
	Selects the active generations of all canvases in col
*/
GLO.GLO.prototype.select_column = function(col,opts){
	TODO("select_column")
	return this
}


//117	select row {num}
/*
	Selects the active generations of all canvases in row
*/
GLO.GLO.prototype.select_row = function(row,opts){
	TODO("select_row")
	return this
}




//55	remove canvas {num}
/*
	TODO: Figure this out
*/
GLO.GLO.prototype.remove_canvas = function(canvas,opts){
	TODO("remove_canvas")
	return this
}


//115	remove all partitions
/*
	Removes all partitions. Generations in removed partitions
	are cloned into the remaining partition
*/
GLO.GLO.prototype.remove_all_partitions = function(opts){
	TODO("remove_all_partitions")
	return this
}



//56	show meta {axis} axis
/*
	
*/
GLO.GLO.prototype.show_meta_axis = function(axis,opts){
	TODO("show_meta_axis")
	return this
}



//56	hide meta {axis} axis
/*
	meta axis used for filter_partitions
*/
GLO.GLO.prototype.hide_meta_axis = function(axis,opts){
	TODO("hide_meta_axis")
	return this
}





















/*************************
	***DISPLAY PROPERTIES**
/*************************


//224	show {axis} axis
/*
	
*/
GLO.GLO.prototype.show_axis = function(axis,opts){
	this.correct_canvases(opts).forEach(function(canvas){
		if(axis=="x"){
			canvas.show_x_axis(true)
		}else if(axis=="y"){
			canvas.show_y_axis(true)
		}else{
			throw "Invalid axis for showing. Only x and y permitted."
		}
	})
	return this
}


//213	hide {axis} axis
/*
	
*/
GLO.GLO.prototype.hide_axis = function(axis,opts){
	this.correct_canvases(opts).forEach(function(canvas){
		if(axis=="x"){
			canvas.show_x_axis(false)
		}else if(axis=="y"){
			canvas.show_y_axis(false)
		}else{
			throw "Invalid axis for showing. Only x and y permitted."
		}
	})
	return this
}








/*************************
		***INTERACTION**
/*************************


/*
	Highlights neighbors
*/
GLO.GLO.prototype.highlight_neighbors = function(opts){
	this.correct_node_gens(opts).forEach(function(gen){
		gen.highlight_neighbors(true)
	})
	return this
}


//28	highlight in-out neighbors
/*
	Highlights in- and out- neighbors differently
*/
GLO.GLO.prototype.highlight_in_out_neighbors = function(opts){
	TODO("highlight_in_out_neighbors")
	return this
}



//28	stop highlight in-out neighbors
/*
	
*/
GLO.GLO.prototype.stop_highlighting = function(opts){
	this.correct_node_gens(opts).forEach(function(gen){
		gen.highlight_neighbors(false)
	})
	return this
}


