import * as React from "react"

export interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const AdminInput = React.forwardRef<HTMLInputElement, AdminInputProps>(
  ({ className = '', type = "text", label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gold-700 dark:text-gold-300 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gold-400">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={`block w-full rounded-lg bg-white dark:bg-gold-950 text-gold-900 dark:text-gold-100 placeholder-gold-400 focus:outline-none focus:ring-2 sm:text-sm transition-colors
              ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2.5 
              ${error 
                ? 'border border-red-500 focus:ring-red-500 focus:border-red-500' 
                : 'border border-gold-300 dark:border-gold-700 focus:ring-gold-500 focus:border-gold-500'
              } 
              ${className}
            `}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)
AdminInput.displayName = "AdminInput"

export { AdminInput }
