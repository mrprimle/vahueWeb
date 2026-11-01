// Scale modules 668130 (intro) and 198863 (flywheel). Frame times are seconds:frames at the bin's fps.
import type { FrameEdges } from './ActiveFrame'

export const INTRO_EDGES: FrameEdges = {
  '0,0': { activeStepIndex: 0, timelineStartPercent: 0, timelineEndPercent: 18, fromIndex: 0, toIndex: 0, fromMs: '00:00', toMs: '03:03' },
  '0,1': { activeStepIndex: 1, timelineStartPercent: 18, timelineEndPercent: 38, fromIndex: 0, toIndex: 1, fromMs: '05:01', toMs: '06:03', autoNext: true, scrollable: true },
  '1,2': { fromIndex: 1, toIndex: 2, fromMs: '06:03', toMs: '07:18', loop: true },
  '2,3': { activeStepIndex: 2, timelineStartPercent: 38, timelineEndPercent: 59, fromIndex: 2, toIndex: 3, fromMs: '07:18', toMs: '08:20', autoNext: true, scrollable: true },
  '3,4': { fromIndex: 3, toIndex: 4, fromMs: '08:20', toMs: '10:05', loop: true },
  '4,5': { activeStepIndex: 3, timelineStartPercent: 59, timelineEndPercent: 83.22, fromIndex: 4, toIndex: 5, fromMs: '10:05', toMs: '11:07', autoNext: true, scrollable: true },
  '5,6': { fromIndex: 5, toIndex: 6, fromMs: '11:07', toMs: '12:17', loop: true },
  '6,7': { activeStepIndex: 4, timelineStartPercent: 79, timelineEndPercent: 100, fromIndex: 6, toIndex: 7, fromMs: '12:17', toMs: '14:03', autoNext: true, scrollable: true },
  '7,8': { fromIndex: 7, toIndex: 8, fromMs: '14:03', toMs: '15:03', loop: true },
}

export const FLYWHEEL_EDGES: FrameEdges = {
  '0,0': { activeStepIndex: 0, fromIndex: 0, toIndex: 0, fromMs: '00:00', toMs: '02:02' },
  '0,1': { activeStepIndex: 1, fromIndex: 0, toIndex: 1, fromMs: '02:02', toMs: '04:09', autoNext: true },
  '1,2': { fromIndex: 1, toIndex: 2, fromMs: '04:09', toMs: '06:21', loop: true },
  '2,3': { activeStepIndex: 2, fromIndex: 2, toIndex: 3, fromMs: '06:21', toMs: '08:09', autoNext: true, awaitComplete: true },
  '3,4': { fromIndex: 3, toIndex: 4, fromMs: '08:09', toMs: '10:15', autoNext: true },
  '4,5': { fromIndex: 4, toIndex: 5, fromMs: '10:15', toMs: '13:12', autoNext: true },
  '5,6': { fromIndex: 5, toIndex: 6, fromMs: '13:12', toMs: '16:12', loopBackConditional: '3,4' },
  '6,7': { activeStepIndex: 3, fromIndex: 6, toIndex: 7, fromMs: '16:12', toMs: '18:13', autoNext: true, awaitComplete: true, useActualPreviousEdge: true },
  '7,8': { fromIndex: 7, toIndex: 8, fromMs: '18:13', toMs: '20:12', loop: true },
  '8,9': { activeStepIndex: 4, fromIndex: 8, toIndex: 9, fromMs: '20:12', toMs: '30:12', autoNext: true, awaitComplete: true },
  '9,10': { fromIndex: 9, toIndex: 10, fromMs: '30:12', toMs: '40:21', loop: true },
}
