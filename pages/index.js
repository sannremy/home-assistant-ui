import React from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import { formatDateTime, formatTemperature } from '../lib/text'
import Weather from '../components/weather'
import DateTime from '../components/date-time'
import SwitchPlug from '../components/switch-plug'
import Thermostat from '../components/thermostat'
import Travel from '../components/travel'
import { weatherIconMap } from '../lib/icon'
import { Droplet, Navigation, Bulb, Bed, Plug } from '@styled-icons/boxicons-regular'
import FloorMap from '../components/floor-map'
import WeatherForecast from '../components/weather-forecast'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      climate,
      sensor,
      switchPlug,
      weather,
    } = this.props

    // Gust angle
    let gustAngle = null
    if (sensor.anemometer && sensor.anemometer.hasOwnProperty('gust_angle')) {
      const angleExtracted = sensor.anemometer.gust_angle.match(/\d+/)
      if (angleExtracted.length) {
        gustAngle = parseInt(angleExtracted[0], 10)
      }
    }

    const title = `Home`

    return (
      <div className="h-full text-indigo-900">
        <Head>
          <title>{title}</title>
          <meta name="title" content={title} />

          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="h-full px-4 py-4">
          <div className="flex items-stretch h-full -mx-2">
            <div className="w-3/12 px-2">
              <div>
                <div>
                  <DateTime date={new Date()} />
                </div>

                <div className="mt-4">
                  <Weather
                    {...weather}
                    sensor={sensor.meteofrance}
                  />
                </div>
              </div>
            </div>
            <div className="w-6/12 px-2">
              <div className="mb-4">
                <WeatherForecast
                  forecast={weather.forecast}
                />
              </div>
              <div className="mb-4">
                <ul className="flex">
                  <li className="flex items-center bg-gray-200 rounded px-2 py-1 mr-4">
                    <Droplet className="w-4 h-4 mr-1" />
                    <span>12&deg;</span>
                  </li>
                  <li className="flex items-center bg-gray-200 rounded px-2 py-1 mr-4">
                    <Droplet className="w-4 h-4 mr-1" />
                    <span>3 mm</span>
                  </li>
                  <li className="flex items-center bg-gray-200 rounded px-2 py-1 mr-4">
                    <Droplet className="w-4 h-4 mr-1" />
                    <span>4 km/h</span>
                  </li>
                  <li className="flex items-center bg-gray-200 rounded px-2 py-1">
                    <Droplet className="w-4 h-4 mr-1" />
                    <span>0,35 m</span>
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <div className="mb-2">
                  <h1 className="text-2xl text-indigo-800">Lights</h1>
                </div>
                <div className="flex">
                  <div className="rounded-lg bg-white p-6 w-1/3 mr-6">
                    <div className="w-12"><Bulb /></div>
                    <div className="mt-6 font-semibold">Room<br />Light 1</div>
                    <div className="mt-4 font-light">On</div>
                  </div>
                  <div className="rounded-lg bg-white p-6 w-1/3 mr-6">
                    <div className="w-12"><Bulb /></div>
                    <div className="mt-6 font-semibold">Room<br />Light 1</div>
                    <div className="mt-4 font-light">On</div>
                  </div>
                  <div className="rounded-lg bg-white p-6 w-1/3">
                    <div className="w-12"><Bulb /></div>
                    <div className="mt-6 font-semibold">Room<br />Light 1</div>
                    <div className="mt-4 font-light">On</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-2">
                  <h1 className="text-2xl text-indigo-800">Plugs</h1>
                </div>
                <div className="flex">
                  <div className="rounded-lg bg-yellow-400 p-6 w-1/3 mr-6">
                    <div className="w-12"><Plug /></div>
                    <div className="mt-6 font-semibold">Room<br />Light 1</div>
                    <div className="mt-4 font-light">On</div>
                  </div>
                  <div className="rounded-lg bg-white p-6 w-1/3 mr-6">
                    <div className="w-12"><Plug /></div>
                    <div className="mt-6 font-semibold">Room<br />Light 1</div>
                    <div className="mt-4 font-light">On</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/12 px-2">
              <div>
                <ul>
                  {['livingRoom', 'attic', 'masterBedroom', 'bedroom1'].map(area => (
                    <li key={area} className="mb-4 text-right">
                      <span className="font-semibold">{area}</span>
                      <ul className="flex items-center justify-end font-light mt-1">
                        {sensor[area] && sensor[area].hasOwnProperty('temperature') && (
                          <li className="mr-2">
                            {formatTemperature(sensor[area].temperature)}
                          </li>
                        )}
                        {sensor[area] && sensor[area].hasOwnProperty('co2') && (
                          <li className="mr-2">
                            {sensor[area].co2} ppm
                          </li>
                        )}
                        {sensor[area] && sensor[area].hasOwnProperty('humidity') && (
                          <li className="flex items-center">
                            <Droplet className="w-4 h-4 mr-2" />
                            <span>{sensor[area].humidity} %</span>
                          </li>
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
      // <div className="h-full text-gray-800">
      //   <Head>
      //     <title>{title}</title>
      //     <meta name="title" content={title} />

      //     <link rel="icon" href="/favicon.ico" />
      //   </Head>

      //   <main className="h-full">
      //     <div className="flex items-stretch h-full">
      //       {/* Home */}
      //       <div className="relative w-7/12 px-4 py-4">
      //         <div className="w-auto h-auto absolute" style={{
      //           top: '50%',
      //           left: '50%',
      //         }}>
      //           <div className="flex items-center justify-center bg-gray-100 w-full h-full text-xs rounded py-1 px-2 shadow">
      //             <ul>
      //               <li className="font-semibold">Attic</li>
      //               <li>
      //                 {sensor.attic && sensor.attic.hasOwnProperty('temperature') && (
      //                   <span>{sensor.attic.temperature}&deg;C</span>
      //                 )}
      //               </li>
      //               <li>
      //                 {sensor.attic && sensor.attic.hasOwnProperty('co2') && (
      //                   <span>{sensor.attic.co2} ppm</span>
      //                 )}
      //               </li>
      //             </ul>
      //           </div>
      //         </div>
      //         <div className="w-auto h-auto absolute" style={{
      //           top: '50%',
      //           left: '20%',
      //         }}>
      //           <div className="flex items-center justify-center bg-gray-100 w-full h-full text-xs rounded py-1 px-2 shadow">
      //             <ul>
      //               <li className="font-semibold">Living room</li>
      //               <li>
      //                 {sensor.livingRoom && sensor.livingRoom.hasOwnProperty('temperature') && (
      //                   <span>{sensor.livingRoom.temperature}&deg;C</span>
      //                 )}
      //               </li>
      //               <li>
      //                 {sensor.livingRoom && sensor.livingRoom.hasOwnProperty('co2') && (
      //                   <span>{sensor.livingRoom.co2} ppm</span>
      //                 )}
      //               </li>
      //             </ul>
      //           </div>
      //         </div>

      //         <div className="relative">
      //           <ul className="flex items-center">
      //             <li className="block mr-4 rounded bg-gray-200 px-2 py-2">
      //               {sensor.outdoor
      //               && sensor.outdoor.hasOwnProperty('temperature')
      //               && weather.hasOwnProperty('condition')
      //               && (
      //                 <span className="flex items-center">
      //                   <span className="w-5 mr-2 flex items-center">
      //                     {weatherIconMap[weather.condition]}
      //                   </span>
      //                   <span>
      //                     {formatTemperature(sensor.outdoor.temperature)}
      //                   </span>
      //                   {sensor.rainGauge
      //                   && sensor.rainGauge.hasOwnProperty('rain')
      //                   && sensor.rainGauge.rain > 0
      //                   && (
      //                     <span className="ml-1">
      //                       ({sensor.rainGauge.rain} mm)
      //                     </span>
      //                   )}
      //                 </span>
      //               )}
      //             </li>
      //             <li className="mr-4 rounded bg-gray-200 px-2 py-2">
      //               {sensor.outdoor && sensor.outdoor.hasOwnProperty('humidity') && (
      //                 <span className="flex items-center">
      //                   <span className="w-5 mr-2 flex items-center">
      //                     <Droplet />
      //                   </span>
      //                   <span>
      //                     {sensor.outdoor.humidity} %
      //                   </span>
      //                 </span>
      //               )}
      //             </li>
      //             <li className="mr-4 rounded bg-gray-200 px-2 py-2">
      //               {sensor.anemometer && sensor.anemometer.hasOwnProperty('gust_strength') && (
      //                 <span className="flex items-center">
      //                   {gustAngle !== null &&
      //                     <span className="w-5 mr-2 flex items-center">
      //                       <Navigation style={{
      //                         transform: `rotate(${gustAngle}deg)`
      //                       }} />
      //                     </span>
      //                   }
      //                   <span>
      //                     {sensor.anemometer.gust_strength} km/h
      //                   </span>
      //                 </span>
      //               )}
      //             </li>
      //           </ul>
      //         </div>
      //         <div className="relative mt-4 text-right">
      //           <Thermostat {...climate} />
      //         </div>
      //       </div>

      //       {/* Panels */}
      //       <div className="w-5/12 px-4 py-4">
      //         {/* Date and Time */}
      //         <div className="-mx-2 mb-4">
      //           <div className="px-2 text-right">
      //             <DateTime date={new Date()} />
      //           </div>
      //         </div>

      //         {/* Weather forecast */}
      //         <div className="-mx-2 mb-4">
      //           <Weather {...weather} />
      //         </div>

      //         {/* Travel */}
      //         <div className="-mx-2 mb-4">
      //           <div className="px-2">
      //             <Travel />
      //           </div>
      //         </div>


      //         {/* Lights */}
      //         <div className="flex -mx-2 mb-4">
      //           <div className="w-1/3 px-2">
      //             <div className="flex items-center bg-white py-2 px-4 rounded shadow text-center cursor-pointer">
      //               <Bulb className="w-5 mr-2" />
      //               <div>
      //                 Salon 1
      //               </div>
      //             </div>
      //           </div>

      //           <div className="w-1/3 px-2">
      //             <div className="flex items-center bg-white py-2 px-4 rounded shadow text-center cursor-pointer">
      //               <Bulb className="w-5 mr-2" />
      //               <div>
      //                 Salon 2
      //               </div>
      //             </div>
      //           </div>

      //           <div className="w-1/3 px-2">
      //             <div className="flex items-center bg-white py-2 px-4 rounded shadow text-center cursor-pointer">
      //               <Bulb className="w-5 mr-2" />
      //               <div>
      //                 Chambre
      //               </div>
      //             </div>
      //           </div>
      //         </div>

      //         {/* Switches */}
      //         <div className="flex -mx-2 mb-4">
      //           {Object.entries(switchPlug).map(([key, item], index) => (
      //             <div key={index} className="w-1/2 px-2">
      //               <SwitchPlug {...item} />
      //             </div>
      //           ))}
      //         </div>
      //       </div>
      //     </div>
      //   </main>
      // </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    climate: state.Climate,
    sensor: state.Sensor,
    switchPlug: state.SwitchPlug,
    weather: state.Weather,
  }
}

export default connect(mapStateToProps)(Home)
