import type { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: InputProps) {
  const mergedClassName = [styles.input, className].filter(Boolean).join(' ')
  return <input className={mergedClassName} {...props} />
}
