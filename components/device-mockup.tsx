"use client"

import Image from "next/image"

interface DeviceMockupProps {
  children?: React.ReactNode
  type?: "tablet" | "phone" | "desktop"
}

export function DeviceMockup({ children, type = "tablet" }: DeviceMockupProps) {
  const deviceClasses = {
    tablet: "w-full max-w-4xl mx-auto",
    phone: "w-full max-w-xs mx-auto",
    desktop: "w-full max-w-6xl mx-auto",
  }

  return (
    <div className={deviceClasses[type]} data-device={type}>
      <div className="relative">
        {/* Device Frame */}
        <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-[2.5rem] p-2 sm:p-3 shadow-2xl">
          {/* Screen Bezel */}
          <div className="bg-slate-800 rounded-[2rem] p-1.5 sm:p-2">
            {/* Screen */}
            <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-inner">
              {/* Notch/Camera */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-10"></div>
              
              {/* Screen Content */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-50 to-white">
                {children || (
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-16 h-16 gradient-primary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">MedTrack Pro</h3>
                      <p className="text-sm text-muted-foreground">Dashboard Preview</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Shadow */}
        <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-[3rem] blur-3xl -z-10 opacity-50"></div>
      </div>
    </div>
  )
}

