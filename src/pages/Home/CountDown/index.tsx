import { useContext, useEffect } from 'react'
import { CountdownContainer, Sepatator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CycleContext } from '../../../context/CyclesContext'

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CycleContext)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = window.setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          clearInterval(interval)
          setSecondsPassed(totalSeconds)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secoundsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const secounds = String(secoundsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${secounds}`
    }
  }, [minutes, secounds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Sepatator>:</Sepatator>
      <span>{secounds[0]}</span>
      <span>{secounds[1]}</span>
    </CountdownContainer>
  )
}
