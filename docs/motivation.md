# Motivation

Originally, the main purpose for this project was to act as a tool to give insight and direction for [Niantic Wayfarer](https://wayfarer.nianticlabs.com) Wayspot submissions for our community with the intention of creating new points of interest in [Pokémon GO](https://pokemongo.com) like Gyms and PokéStops.

The catalyst was when [Ingress split from Niantic Wayfarer](https://community.wayfarer.nianticlabs.com/t/ingress-last-sync-announcement/93862). Prior to this, we would use [Ingress Intel](https://intel.ingress.com) as it was the best way to visualize Wayspots on a map. When layered with the [Ingress Intel Total Conversion (IITC)](https://iitc.app) tool, we could visualize [Google S2 cells](https://s2geometry.io) which would further help to identify areas of our play space that needed nominations the most.

The split remove our way of properly visualizing Wayspots and S2 cells, so we recreated the Wayspot data from Ingress Intel in [GeoJSON](https://geojson.org), and then manually updated it whenever new point of interests would appear in Pokémon GO. To visualize the S2 cells, we generated them as GeoJSON with [osmcoverer](https://github.com/MzHub/osmcoverer).

To actually view all of the GeoJSON on a map, we used [geojson.io](https://geojson.io), but this had some usability issues on mobile devices which made it cumbersome to work with when making Wayfarer nominations in the field.

That's when this project was started. We wanted a mobile-friendly way to visualize our GeoJSON, so we turned to using [Leaflet](https://leafletjs.com) as it was open source and supported both GeoJSON and mobile devices out-of-the-box.

Over time, the project evolved beyond being just a tool for Wayfinders. We expanded it to better support our community's Pokémon GO meetup attendees by providing additional information such as parking, restrooms, and directions to specific points of interest.

With the [release of the Wayfarer Map](https://community.wayfarer.nianticlabs.com/t/the-wayfarer-map-is-here/111209), we now pull all Wayspot data from there, ensuring 100% accuracy of information on our maps.
