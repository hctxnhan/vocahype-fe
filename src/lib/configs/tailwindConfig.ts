import TailwindColors from 'tailwindcss/colors'

// import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfig from '~/tailwind.config.ts'

// const fullConfig = resolveConfig(tailwindConfig)

export type ColorNames = keyof typeof TailwindColors

export const colors: typeof TailwindColors = {
  ...TailwindColors,
}
