import type { ReactNode } from "react"

const Card = ({ title, children }: { title?: string; children: ReactNode }) => {
  return (
    <div
      className="
        relative rounded-2xl p-[1px] 
        bg-gradient-to-br from-pink-500/40 via-purple-500/40 to-blue-500/40 
        dark:from-pink-400/30 dark:via-purple-400/30 dark:to-blue-400/30
        transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl
      "
    >
      <div
        className="
          rounded-2xl bg-white dark:bg-gray-900 shadow-lg p-6 
          backdrop-blur-sm
        "
      >
        {title && (
          <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 dark:from-pink-400 dark:to-purple-400">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  )
}

export default Card
