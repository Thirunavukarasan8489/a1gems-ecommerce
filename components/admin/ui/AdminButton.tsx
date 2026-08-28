import * as React from "react"

export interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  isLoading?: boolean
}

const AdminButton = React.forwardRef<HTMLButtonElement, AdminButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]"
    
    const variants = {
      primary: "bg-gold-900 text-gold-100 hover:bg-gold-800 shadow-xs border border-gold-950 font-semibold",
      secondary: "bg-gold-200 text-gold-900 hover:bg-gold-300 dark:bg-gold-800 dark:text-gold-100 dark:hover:bg-gold-700 border border-gold-300 dark:border-gold-700",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-xs",
      ghost: "hover:bg-gold-200 hover:text-gold-900 dark:hover:bg-gold-800 dark:hover:text-gold-100 text-gold-700 dark:text-gold-300",
      outline: "border border-gold-300 bg-transparent text-gold-900 hover:bg-gold-100 dark:border-gold-700 dark:text-gold-100 dark:hover:bg-gold-800",
    }
    
    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-8 text-base",
      icon: "h-10 w-10",
    }

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    return (
      <button
        className={classes}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    )
  }
)
AdminButton.displayName = "AdminButton"

export { AdminButton }
