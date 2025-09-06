import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg'

const footerLinks = [
  {
    title: "GitHub",
    href:"https://github.com/LeoCunhaLabz"
  },
  {
    title: "LinkedIn",
    href:"https://www.linkedin.com/in/leonardovcunha/"
  }
]

export const Footer = () => {
  return (
    <footer className='relative z-0 overflow-x-clip'>
      <div className='absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-20'></div>
      <div className="container">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className='text-white/40'>&copy; 2025. All rights reserved</div>
          <nav className='flex flex-col items-center gap-8 md:flex-row'>
            {footerLinks.map((link) => (
              <a
                href={link.href}
                key={link.title}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 rounded"
              >
                <span className='font-semibold'>{link.title}</span>
                <ArrowUpRightIcon className="size-4"/>
              </a>
            ))}
          </nav>
        </div>

      </div>
    </footer>
  )
};
