import { ReactElement } from 'react'
import ReactDOMServer from 'react-dom/server'

export function generateID(len: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var result = ''
  for (var i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function getIconPath(icon: ReactElement) {
  const iconString = ReactDOMServer.renderToString(icon)
  const parser = new DOMParser()
  const svgDoc = parser.parseFromString(iconString, 'image/svg+xml')
  const iconPath = svgDoc.querySelector('path')?.getAttribute('d') as string

  return iconPath
}
