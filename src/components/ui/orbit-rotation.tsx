import React from "react"

import { cn } from "../../lib/utils"

export interface OrbitIcon {
  Icon: React.ComponentType<{ className?: string }>
  name?: string
}

interface OrbitRotationProps {
  icons?: OrbitIcon[]
  orbitCount?: number
  orbitGap?: number
  centerIcon?: OrbitIcon
  className?: string
  size?: "sm" | "md" | "lg"
}

export function OrbitRotation({
  icons = [],
  orbitCount = 3,
  orbitGap = 6,
  centerIcon,
  className,
  size = "md",
  ...props
}: OrbitRotationProps) {
  const iconsPerOrbit = Math.ceil((icons.length || 1) / orbitCount)

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  const iconSizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  }

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      {...props}
    >
      <div className="relative flex items-center justify-center">
        {/* Center Icon */}
        {centerIcon ? (
          <div
            className={cn(
              "bg-zinc-950/90 border-white/10 flex items-center justify-center rounded-full border shadow-xl backdrop-blur-sm",
              sizeClasses[size]
            )}
          >
            <centerIcon.Icon className={cn(iconSizeClasses[size])} />
          </div>
        ) : null}

        {/* Generate Orbits */}
        {[...Array(orbitCount)].map((_, orbitIdx) => {
          const orbitSize = `min(${8 + orbitGap * (orbitIdx + 1)}rem, ${56 + orbitIdx * 10}vw)`
          const angleStep = (2 * Math.PI) / iconsPerOrbit
          const animationDuration = `${12 + orbitIdx * 6}s`

          return (
            <div
              key={orbitIdx}
              className="border-white/25 absolute rounded-full border-2 border-dotted"
              style={{
                width: orbitSize,
                height: orbitSize,
                animation: `orbit-spin ${animationDuration} linear infinite`,
              }}
            >
              {icons
                .slice(
                  orbitIdx * iconsPerOrbit,
                  orbitIdx * iconsPerOrbit + iconsPerOrbit
                )
                .map((iconConfig, iconIdx) => {
                  const angle = iconIdx * angleStep
                  const x = 50 + 50 * Math.cos(angle)
                  const y = 50 + 50 * Math.sin(angle)

                  return (
                    <div
                      key={iconIdx}
                      title={iconConfig.name}
                      className="bg-zinc-950/80 border-white/10 absolute rounded-full border p-1 shadow-lg backdrop-blur-sm"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <iconConfig.Icon className={cn(iconSizeClasses[size])} />
                    </div>
                  )
                })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrbitRotation
