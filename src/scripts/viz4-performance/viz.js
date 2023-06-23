/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function updateGroupXScale(scale, data, width) {
  // TODO : Set the domain and range of the groups' x scale
  const xDomain = data.map((act) => act.Act);
  scale.domain(xDomain).range([0, width]);
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function updateYScale(scale, data, height) {
  // TODO : Set the domain and range of the graph's y scale
  const counts = data.flatMap((d) => d.Players.map((p) => p.Count));
  const maxLineCount = d3.extent(counts)[1];
  scale.domain([maxLineCount, 0]).range([0, height]);
}

/**
 * Creates the groups for the grouped bar chart and appends them to the graph.
 * Each group corresponds to an act.
 *
 * @param {object[]} data The data to be used
 * @param {*} x The graph's x scale
 */
export function createGroups(data, x) {
  // TODO : Create the groups
  d3.select('#graph-g').selectAll('g.bar-group').remove();

  d3.select('#graph-g')
    .selectAll('g.bar-group')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', (d) => 'translate(' + x(d.Act) + ',' + 0 + ')')
    .attr('class', 'bar-group')
    .datum((d) => d);
}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
 * @param {string[]} players The names of the players, each corresponding to a bar in each group
 * @param {number} height The height of the graph
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
export function drawBars(y, xSubgroup, players, height, color, tip) {
  // TODO : Draw the bars
  d3.selectAll('g.bar-group').each(function (d) {
    var barWidth = xSubgroup.range()[1] / players.length;
    var groupData = d3.select(this).datum();
    players.forEach((player, i) => {
      const playerObj = groupData.Players.find((x) => x.Player === player);

      if (playerObj) {
        const barHeight = (playerObj.Count / y.domain()[0]) * y.range()[1];

        const bar = d3
          .select(this)
          .append('rect')
          .attr('x', barWidth * i)
          .attr('y', height - barHeight)
          .attr('width', barWidth)
          .attr('height', barHeight)
          .attr('fill', color(i))
          .on('mouseover', function (d) {
            tip.show(playerObj, this);
          })
          .on('mouseout', tip.hide);

        bar.data([{ Act: groupData.Act, Player: playerObj }]);
      }
    });
  });
}