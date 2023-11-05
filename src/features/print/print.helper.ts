export function printApp() {
  const noPrintable = document.getElementsByClassName('noprint')
  const lastDisplays = []
  for (const el of noPrintable) {
    const ele = el as HTMLElement
    lastDisplays.push(ele.style.display)
    ele.style.display = 'none'
  }
  window.print()
  let i = 0
  for (const el of noPrintable) {
    const ele = el as HTMLElement
    ele.style.display = lastDisplays[i]
    i++
  }
}
