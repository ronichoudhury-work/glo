//The Button
var mlgo_index = 0
var mlgo_steps = [
  {f:initialize_force_directed, label:"Initialize", disabled:false},
  {f:hide_links, label:"Hide Links", disabled:true},
  {f:transition_x, label:"Transition X by Betweenness Centrality", disabled:true},
  {f:draw_x_axis, label:"Draw X Axis", disabled:true},
  {f:transition_y, label:"Transition Y by Degree", disabled:true},
  {f:draw_y_axis, label:"Draw Y Axis", disabled:true},
  {f:show_links, label:"Show Links", disabled:true},
  {f:substrate_on_y, label:"Substrate by Category", disabled:true},
  {f:scatter_on_x, label:"Scatter on X", disabled:true},
  {f:show_selected_links, label:"Show Select Links", disabled:true},
  {f:hide_x_axis, label:"Hide X Axis", disabled:true},
  {f:hide_y_axis, label:"Hide Y Axis", disabled:true},
  {f:force_directed, label:"Force-Directed", disabled:true},
  {f:size_nodes_by_degree, label:"Size Nodes by Degree", disabled:true},
  {f:size_nodes_by_constant, label:"Size Nodes by Constant", disabled:true},
  // {f:finished, label:"Finished"}
  ]

var mlgo_buttons = d3.select("#buttons").selectAll(".step")
    .data(mlgo_steps)
  .enter().append("button")
    .text(function(d){return d.label; })
    .on("click",function(d,i){
      d.f()
      d.disabled = true
      update_buttons()
    })

update_buttons()

function update_buttons(){
  d3.select("#buttons").selectAll(".step")
    .attr("disabled",function(d){return (d.disabled==true)?"true":null;})
}