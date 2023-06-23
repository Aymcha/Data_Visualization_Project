
import * as viz from './scripts/viz1/viz.js'
var width = 600
var height = 400

// Création de l'élément SVG
var svg = d3.select('#chart-container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Chargement des données depuis le fichier CSV
d3.csv('./Résultats.csv')
  .then(function (data) {
    viz.createGraph(svg, data)
  })
