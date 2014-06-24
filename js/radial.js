var evenly_position_nodes_radially_by_property = function (prop) {
    node_data().sort(function(a,b){
    var val = a[prop]-b[prop]
    if (val==0){
      return a.id-b.id
    }
    return val
  }).forEach(function(d,i){
    d.theta_i = i
  })

  thetascale = d3.scale.ordinal()
    .domain(node_data().map(function(d,i){return i;}))
    .rangeBands([3*Math.PI/2,7*Math.PI/2])

  node_generations[modes.active_generation]
    .each(function(d,i){
      d.theta_list[modes.active_generation] = thetascale(d.theta_i)
    })
    .transition().duration(transition_duration)
      .attr("cx",function(d,i){
        d.x_list[modes.active_generation] = d.radius_list[modes.active_generation]*Math.cos(d.theta_list[modes.active_generation])+width/2
        return d.x_list[modes.active_generation]
      })
      .attr("cy",function(d,i){
        d.y_list[modes.active_generation] = d.radius_list[modes.active_generation]*Math.sin(d.theta_list[modes.active_generation])+height/2
        return d.y_list[modes.active_generation]
      })

  update_axes()
  update_rolled_up()
  update_links()
}

var evenly_position_nodes_radially = function () {
    evenly_position_nodes_radially_by_property('id')
}





var position_radius_by_constant = function(){
  node_generations[modes.active_generation]
    .each(function(d,i){
      d.radius_list[modes.active_generation] = Math.min(width,height)*.45
    })
    .transition().duration(transition_duration)
      .attr("cx",function(d,i){
        d.x_list[modes.active_generation] = d.radius_list[modes.active_generation]*Math.cos(d.theta_list[modes.active_generation])+width/2
        return d.x_list[modes.active_generation]
      })
      .attr("cy",function(d,i){
        d.y_list[modes.active_generation] = d.radius_list[modes.active_generation]*Math.sin(d.theta_list[modes.active_generation])+height/2
        return d.y_list[modes.active_generation]
      })

  update_axes()
  update_rolled_up()
  update_links()
}




var position_radius_by_property = function(prop) {
  if(is_number(node_data()[0][prop])){
    set_radius_scale_by_quantitative_property(prop)
  }else{
    set_radius_scale_by_nominal_property(prop)
  }


  node_generations[modes.active_generation]
    .each(function(d,i){
      d.radius_list[modes.active_generation] = radius_scale(d[prop])
    })
    .transition().duration(transition_duration)
      .attr("cx",function(d,i){
        d.x_list[modes.active_generation] = d.radius_list[modes.active_generation]*Math.cos(d.theta_list[modes.active_generation])+width/2
        return d.x_list[modes.active_generation]
      })
      .attr("cy",function(d,i){
        d.y_list[modes.active_generation] = d.radius_list[modes.active_generation]*Math.sin(d.theta_list[modes.active_generation])+height/2
        return d.y_list[modes.active_generation]
      })

  update_axes()
  update_rolled_up()
  update_links()
}

var set_radius_scale_by_quantitative_property = function(prop){
  radius_scale = d3.scale.linear()
      .range([20,.49*Math.min(width,height)])
      .domain([0,d3.max(node_data().map(function(d){return d[prop]; }))])
      .nice()
}

var set_radius_scale_by_nominal_property = function(prop){
  substrate_on_radius(prop)
}

var radius_substrate = function(prop){
  radius_substrates = d3.nest()
      .key(function(d){return d[prop]})
      .entries(node_data())
  return radius_substrates
}

var substrate_on_radius = function(prop){
  radius_substrate(prop)

  radius_scale = d3.scale.ordinal()
    .domain(radius_substrates.map(function(d){return d.key; }))
    .range([20,.49*Math.min(width,height)])
      
  // node_generations[modes.active_generation].transition().duration(transition_duration)
  //   .attr("cy",function(d){
  //     d.y_list[modes.active_generation] = yscale(d[prop])
  //     return d.y_list[modes.active_generation]
  //   })
  
  // update_axes()
  // update_rolled_up()
  // update_links()
}


