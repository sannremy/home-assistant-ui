import { Icon } from '@iconify/react'
import clearNight from '@iconify/icons-wi/night-clear'
import cloudy from '@iconify/icons-wi/cloudy'
import fog from '@iconify/icons-wi/fog'
import hail from '@iconify/icons-wi/hail'
import lightning from '@iconify/icons-wi/lightning'
import thunderstorm from '@iconify/icons-wi/thunderstorm'
import dayCloudy from '@iconify/icons-wi/day-cloudy'
import rain from '@iconify/icons-wi/rain'
import dayRain from '@iconify/icons-wi/day-rain'
import daySnow from '@iconify/icons-wi/day-snow'
import rainMix from '@iconify/icons-wi/rain-mix'
import daySunny from '@iconify/icons-wi/day-sunny'
import windy from '@iconify/icons-wi/windy'
import cloudyWindy from '@iconify/icons-wi/cloudy-windy'
import exceptional from '@iconify/icons-wi/na'

import sunrise from '@iconify/icons-wi/sunrise'
import sunset from '@iconify/icons-wi/sunset'
import horizon from '@iconify/icons-wi/horizon'
import horizonAlt from '@iconify/icons-wi/horizon-alt'

export const weatherIconMap = {
  'clear-night': <Icon icon={clearNight} />,
  'cloudy': <Icon icon={cloudy} />,
  'fog': <Icon icon={fog} />,
  'hail': <Icon icon={hail} />,
  'lightning': <Icon icon={lightning} />,
  'lightning-rainy': <Icon icon={thunderstorm} />,
  'partlycloudy': <Icon icon={dayCloudy} />,
  'pouring': <Icon icon={rain} />,
  'rainy': <Icon icon={dayRain} />,
  'snowy': <Icon icon={daySnow} />,
  'snowy-rainy': <Icon icon={rainMix} />,
  'sunny': <Icon icon={daySunny} />,
  'windy': <Icon icon={windy} />,
  'windy-variant': <Icon icon={cloudyWindy} />,
  'exceptional': <Icon icon={exceptional} />,
}

export const horizonIconMap = {
  'sunrise': <Icon icon={sunrise} />,
  'sunset': <Icon icon={sunset} />,
  'above-horizon': <Icon icon={horizonAlt} />,
  'below-horizon': <Icon icon={horizon} />,
}
