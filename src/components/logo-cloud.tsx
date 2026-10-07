import { clsx } from 'clsx'

export function LogoCloud({
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'flex justify-between max-sm:mx-auto max-sm:max-w-md max-sm:flex-wrap max-sm:justify-evenly max-sm:gap-x-4 max-sm:gap-y-4',
      )}
    >
      {/* oxlint-disable-next-line nextjs/no-img-element -- Static export has no image optimizer; local assets retain their CSS sizing. */}
      <img
        alt="SavvyCal"
        src="/logo-cloud/savvycal.svg"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
      {/* oxlint-disable-next-line nextjs/no-img-element -- Static export has no image optimizer; local assets retain their CSS sizing. */}
      <img
        alt="Laravel"
        src="/logo-cloud/laravel.svg"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
      {/* oxlint-disable-next-line nextjs/no-img-element -- Static export has no image optimizer; local assets retain their CSS sizing. */}
      <img
        alt="Tuple"
        src="/logo-cloud/tuple.svg"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
      {/* oxlint-disable-next-line nextjs/no-img-element -- Static export has no image optimizer; local assets retain their CSS sizing. */}
      <img
        alt="Transistor"
        src="/logo-cloud/transistor.svg"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
      {/* oxlint-disable-next-line nextjs/no-img-element -- Static export has no image optimizer; local assets retain their CSS sizing. */}
      <img
        alt="Statamic"
        src="/logo-cloud/statamic.svg"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
    </div>
  )
}
