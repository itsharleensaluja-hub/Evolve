export default function SectionHeading({
  label,
  title,
  description,
  align = 'center',
  className = '',
}) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className={`max-w-2xl mx-auto ${alignClass} mb-14 md:mb-18 ${className}`}>
      {label && (
        <span className="inline-block font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-teal/70 mb-4">
          {label}
        </span>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] text-noir mb-5">
        {title}
      </h2>
      {description && (
        <p className="text-base md:text-lg leading-relaxed text-noir/60 max-w-xl mx-auto">
          {description}
        </p>
      )}
    </div>
  )
}
