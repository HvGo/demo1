export type NavLinks = {
  label: string
  href: string
  submenu?: NavLinks[]
  action?: 'openGoldenQuestions' | 'openCuratedSearch'
}
