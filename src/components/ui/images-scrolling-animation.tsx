"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { ReactLenis } from "lenis/react"
import { useRef } from "react"

const projects = [
  {
    title: "Private Lesson 1",
    src: "https://images.unsplash.com/photo-1626224580175-340ad0e3a766?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Private Lesson 2",
    src: "https://images.unsplash.com/photo-1626224580113-167812239454?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Private Lesson 3",
    src: "https://images.unsplash.com/photo-1626224580211-580630790938?q=80&w=2070&auto=format&fit=crop",
  },
]

interface StickyCardProps {
  i: number
  title: string
  src: string
  progress: any
  range: [number, number]
  targetScale: number
}

const StickyCard_001 = ({
  i,
  title,
  src,
  progress,
  range,
  targetScale,
}: any) => {
  const container = useRef<HTMLDivElement>(null)

  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className="sticky top-0 flex items-center justify-center h-screen">
      <motion.div
        style={{
          scale,
          top: `calc(10vh + ${i * 25}px)`,
        }}
        className="rounded-3xl relative flex origin-top flex-col overflow-hidden shadow-2xl
                   h-[300px] w-[280px] 
                   sm:h-[350px] sm:w-[360px] 
                   md:h-[400px] md:w-[420px] 
                   lg:h-[450px] lg:w-[500px]"
      >
        <img src={src || "/placeholder.svg"} alt={title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
          <p className="text-xs uppercase tracking-widest opacity-70 mb-1">Session 0{i + 1}</p>
          <h3 className="text-xl font-serif tracking-wide">{title}</h3>
        </div>
      </motion.div>
    </div>
  )
}

const ImagesScrollingAnimation = () => {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <div ref={container} className="relative w-full">
      {projects.map((project, i) => {
        const targetScale = Math.max(0.6, 1 - (projects.length - i - 1) * 0.05)
        return (
          <StickyCard_001
            key={`p_${i}`}
            i={i}
            title={project.title}
            src={project.src}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        )
      })}
    </div>
  )
}

export { ImagesScrollingAnimation, StickyCard_001 }
