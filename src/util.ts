import { BASE_PATH } from './constants'

/**
 * Checks if the browser is running on a mobile device or not.
 * Original code taken from: https://stackoverflow.com/questions/77506413/detecting-if-the-user-is-on-desktop-or-mobile-in-the-browser
 * @returns {Boolean} True if the user is detected to be using a mobile browser, false if not
 */
export const isMobile = () => {
  console.log('User agent:', navigator.userAgent)
  const result =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )

  if (result) {
    // User is accessing the page on a mobile device
    console.log('Mobile device detected')
  } else {
    // User is accessing the page on a desktop device
    console.log('Desktop device detected')
  }

  return result
}

/**
 * Generate path for routing.
 * @param isAbsolute Add "/" character in front of the path to make it absolute
 */
export function genPath(isAbsolute?: boolean): string
/**
 * Generate path for routing.
 * @param path Path to generate route with.
 * @param isAbsolute Add "/" character in front of the path to make it absolute
 */
export function genPath(path?: string, isAbsolute?: boolean): string
export function genPath(
  isAbsoluteOrPath?: boolean | string,
  isAbsolute?: boolean,
): string {
  let prefix = ''

  if (typeof isAbsoluteOrPath === 'boolean') {
    prefix = '/'
    return `${prefix}${BASE_PATH}`
  }

  if (isAbsolute) {
    prefix = '/'
  }

  return `${prefix}${BASE_PATH}/${isAbsoluteOrPath}`
}

export const isPath = (inputPath: string, comparisonPath: string) => {
  if (inputPath === comparisonPath || inputPath === `${comparisonPath}/`) {
    return true
  }
  return false
}
