'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useGSAP } from '@gsap/react'

// Same registration as Scale's root provider (2d7ykwtxp_8ed.js, module 474053).
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP, MotionPathPlugin)

export { gsap, ScrollTrigger, SplitText, useGSAP }
