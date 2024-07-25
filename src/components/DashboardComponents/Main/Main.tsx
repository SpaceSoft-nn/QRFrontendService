import React from 'react'

export const Main: React.FC = () => {
    return (
        <section className="main-section grid md:grid-cols-2 gap-[10px] h-full">
            <div className="widget min-h-[200px] ">
                Main.tsx
            </div>
            <div className="widget">
                Main.tsx
            </div>
            <div className="grid max-md:grid-cols-2 gap-[10px]">
                <div className="widget">
                    Main.tsx
                </div>
                <div className="widget">
                    Main.tsx
                </div>
            </div>
            <div className="widget">
                Main.tsx
            </div>
        </section>
    )
}