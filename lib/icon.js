import {
  Moon,
  CloudDrizzle,
  CloudLightning,
  Cloud,
  CloudRain,
  CloudLightRain,
  CloudSnow,
  Sun,
  Wind,
} from '@styled-icons/boxicons-regular'

export const weatherIconMap = {
  'clear-night': <Moon />,
  'cloudy': <Cloud />,
  'fog': <CloudDrizzle />,
  'hail': <CloudSnow />,
  'lightning': <CloudLightning />,
  'lightning-rainy': <CloudLightning />,
  'partlycloudy': <Cloud />,
  'pouring': <CloudRain />,
  'rainy': <CloudLightRain />,
  'snowy': <CloudSnow />,
  'snowy-rainy': <CloudSnow />,
  'sunny': <Sun />,
  'windy': <Wind />,
  'windy-variant': <Wind />,
  'exceptional': <CloudLightning />,
}
