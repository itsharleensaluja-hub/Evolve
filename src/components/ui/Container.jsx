export default function Container({ children, className = '', as: Tag = 'div' }) {
  return (
    <Tag className={`w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </Tag>
  )
}
