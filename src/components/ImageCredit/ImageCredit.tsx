import { imageCredits } from '../../data/imageCredits'

interface ImageCreditProps {
  file: keyof typeof imageCredits
}

export function ImageCredit({ file }: ImageCreditProps) {
  const credit = imageCredits[file]
  if (!credit) return null
  return <span className="visually-hidden">Fotografía: {credit}</span>
}