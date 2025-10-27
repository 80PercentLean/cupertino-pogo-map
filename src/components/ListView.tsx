import { Button } from '@/components/ui/button'
import { PATH_ROOT } from '@/constants'
import { gymsJson } from '@/geojson/data'
import { MapPinned } from 'lucide-react'
import { useContext } from 'react'
import { NavLink } from 'react-router'

import GenericContentView from './GenericContentView'
import { MapContext } from './MapContext'

/**
 * List view that displays all Campsite POIs as a list.
 */
export default function ListView() {
  const { map } = useContext(MapContext)

  return (
    <GenericContentView>
      <div className="flex flex-1 flex-col gap-4 py-4">
        {gymsJson.features.map((gym) => (
          <div key={gym.id} className="bg-card flex rounded-lg">
            <div className="flex flex-1 justify-between">
              <div className="p-6">
                <div className="font-semibold">{gym.properties.name}</div>
                <div className="text-muted-foreground">Gym</div>
              </div>
              <NavLink to={PATH_ROOT}>
                <Button
                  variant="outline"
                  className="flex h-full flex-col rounded-l-none rounded-r-lg"
                  onClick={() => {
                    const [lng, lat] = gym.geometry.coordinates
                    map?.panTo([lat, lng])
                    // map?.eachLayer((l) => {
                    //   console.log('eachLayer test', l.options)
                    // })
                  }}
                >
                  <MapPinned className="!size-6" /> View on Map
                </Button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </GenericContentView>
  )
}
