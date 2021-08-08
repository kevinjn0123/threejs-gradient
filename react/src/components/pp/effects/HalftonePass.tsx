import { BloomEffect, BlendFunction } from 'postprocessing'
import { HalftonePass as HalftonePassEffect } from '../lib/HalftonePass'
import { wrapEffect } from '../util'

export const HalftonePass = wrapEffect(HalftonePassEffect, BlendFunction.SCREEN)
