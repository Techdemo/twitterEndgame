var socket = io();
socket.on("score", function(txt){
   console.log(txt)

   let list = document.getElementById("tweetList")
   let child_nodes = list.childNodes;
   if (child_nodes.length > 3){
      list.removeChild(list.childNodes[0]);
   }
      const markup = `
      <li class="fadeIn">${txt}</li>
          `
      document.getElementById("tweetList").insertAdjacentHTML('afterbegin', markup)

})

socket.on("score2", function(im){
   console.log(im)
})



// all of the d3 set up
const svg = d3.select('svg')
// create margins and dimensions
const margin = {top: 20, right: 20, bottom: 100, left: 100 }
const graphWidth = 600 - margin.left - margin.right
const graphHeight = 600 - margin.top - margin.bottom

const graph = svg.append('g')
   .attr('width', graphWidth)
   .attr('height', graphHeight)
   .attr('transform', `translate(${margin.left},${margin.top})`)

   const xAxisGroup = graph.append('g')
      .attr('transform', `translate(0, ${graphHeight})`);

   const yAxisGroup = graph.append('g')

   //scales
const y = d3.scaleLinear()
   .range([graphHeight, 0])

const x = d3.scaleBand()
   .range([0, 500])
   .paddingInner(0.2)
   .paddingOuter(0.2)

   // create the axis
const xAxis = d3.axisBottom(x)
const yAxis = d3.axisLeft(y)
   .ticks(3)
   .tickFormat(d => d + ' popularity')

   //update x axis text
xAxisGroup.selectAll('text')
   .attr('transform', 'rotate(-40)')
   .attr('text-anchor', 'end')
   .attr('fill', 'orange')

const rects = graph.selectAll('rect')
   .on("mouseover", handleMouseOver)
   .on("mouseout", handleMouseOut)


///////////////////////////////////////
   //update functie
   const update = (data) => {
      //updating scale domains
      y.domain([0, d3.max(data, d => d.score)])
      x.domain(data.map(item => item.name))

      // join updated data to elements
      const rects = graph.selectAll('rect')
         .data(data)

      //remove exit selection
      rects.exit().remove()

      // update current shapes in dom
      rects.attr('width', x.bandwidth)
         .attr('height', d => graphHeight - y(d.score))
         .attr('fill', 'orange')
         .attr('x', d => x(d.name))
         .attr('y', d => y(d.score))

       // append the enter selection to the dom
      rects.enter()
         .append('rect')
         .attr('width', x.bandwidth)
         .attr('height', d => graphHeight - y(d.score))
         .attr('fill', 'orange')
         .attr('x', d => x(d.name))
         .attr('y', d => y(d.score))
         .on("mouseover", handleMouseOver)
         .on("mouseout", handleMouseOut)

      //call axis
         xAxisGroup.call(xAxis)
         yAxisGroup.call(yAxis)
   }


let data = [];
//get data from firestore
   db.collection('heroes').onSnapshot(res => {

      res.docChanges().forEach(change => {
         // added changed or modified

         // add id from doc onf irebase
         const doc = {...change.doc.data(), id: change.doc.id}

            switch (change.type){
               case 'added':
                  data.push(doc);
                  break;
               case 'modified':
                  const index = data.findIndex(item => item.id == doc.id)
                  data[index] = doc;
                  break
               case 'removed':
                  data = data.filter(item => item.id !== doc.id);
                  break
               default:
                  break;
            }
      });
     update(data)
   })



   function handleMouseOver(){
      console.log("yeah")
      d3.select(this).attr('fill', 'blue');
      socket.emit('hover', this)

      socket.on('hover', data => {
         d3.select(this).attr('fill', 'blue');
      })
   }


   function handleMouseOut(d, i){
      d3.select(this).attr('fill', 'orange')

      socket.emit('unhover', data)

      socket.on('unhover', data => {

      })
   }

