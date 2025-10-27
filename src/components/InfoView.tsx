import GenericContentView from './GenericContentView'

export default function InfoView() {
  return (
    <GenericContentView>
      <ul className="list-disc">
        <li>Built using Leaflet</li>
        <li> © OpenStreetMap contributors</li>
      </ul>
    </GenericContentView>
  )
}
