import * as offensif from './scripts/viz6-offensif/offensive-metrics'

import * as heatmap from './scripts/viz4-performance/performance.js'

import * as results from './scripts/viz1/result.js'

import * as score from './scripts/viz2/score.js'

heatmap.buildHeatmap()

offensif.buildBarPlots()

results.buildResultStackBar()

// score.buildScore()